import supabase from "@/lib/supabase";
import { uploadImages } from "./images";
import type { PostEntity } from "@/types";

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({ content })
    .select() //insert후 받아오기
    .single(); //하나만

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성 요청
  const post = await createPost(content);
  if (images.length === 0) return post;

  try {
    // 2. 이미지 업로드 요청
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp"; //확장자가 없을 경우 webp로 설정
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImages({
          file: image,
          filePath,
        });
      }),
    );

    // 3. 포스트 테이블 업데이트 요청 (이미지 URL)
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    await deletePost(post.id); // 2-3번 실패 시 1번에서 임시로 만들어 둔 post 삭제
    throw error;
  }
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
