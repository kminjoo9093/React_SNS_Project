import { signInWithPassword } from "@/api/auth";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(
  callbacks?: UseMuationCallback,
  // {
  //여기 error 파라미터 넘겨주는 이유: 에러 객체 사용할 수 있는 확장성 고려
  // onError: (error:Error) => void;
  // }
) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
