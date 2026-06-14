import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMuationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: UseMuationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

// 캐시 조작 방법들
// 1. 캐시 아예 초기화 -> 선택 : 포스트 추가는 상단에서 함 + 새로 추가된 포스트도 상단에 보여지게 됨 -> 새롭게 불러오는 게 자연스러움
// 2. 캐시 데이터에 완성된 포스트만 추가
// 3. 낙관적 업데이터 방식(onMutate)
