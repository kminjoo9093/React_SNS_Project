import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

export async function uploadImages({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file); //이미지 업로드

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path); //반환하는 이미지 url

  return publicUrl;
}

export async function deleteImagesInPath(path: string) {
  //list: 특정 경로 이하의 모든 파일 목록 불러옴
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(path);

  if (!files || files.length === 0) return;

  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(files.map((file) => `${path}/${file.name}`)); //삭제할 이미지 파일 정확한 경로 입력해주기

  if (removeError) throw removeError;
}
