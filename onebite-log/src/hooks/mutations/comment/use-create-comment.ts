import { createComment } from "@/api/comment";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateComment(callbacks?: UseMuationCallback){
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if(callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if(callbacks?.onError) callbacks.onError(error);
    }
  })
}