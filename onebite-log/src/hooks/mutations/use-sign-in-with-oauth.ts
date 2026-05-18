import { signInWithOAuth } from "@/api/auth";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth(callbacks?:UseMuationCallback){
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if(callbacks?.onError) callbacks.onError(error);
    }
  })
}