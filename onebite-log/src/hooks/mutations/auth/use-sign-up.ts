import { signUp } from "@/api/auth";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignUp(callbacks?:UseMuationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if(callbacks?.onError) callbacks?.onError(error);
    }
  })

}