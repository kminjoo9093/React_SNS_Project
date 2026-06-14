import { deleteImagesInPath } from "@/api/images";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMuationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMuationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      //이미지 삭제 기능
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

// 포스트 캐시 리셋해서 아예 피드를 처음부터 다시 불러오게 하는 이유
// -> 무한스크롤 때문에 (페이지 당 정해진 아이템 개수가 있고,
// 페이지 사이즈만큼 아이템 개수가 충족되지 않으면 마지막 페이지로 간주해 다음 페이지를 불러오지 않도록 해두었기 때문에)
