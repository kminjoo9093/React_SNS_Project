import { updateComment } from "@/api/comment";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateComment(callbacks?: UseMuationCallback){
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if(callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if(callbacks?.onError) callbacks.onError(error);
    }
  })
}