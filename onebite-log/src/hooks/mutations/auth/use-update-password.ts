import { updatePassword } from "@/api/auth";
import type { UseMuationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword(callbacks?: UseMuationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if(callbacks?.onError) callbacks.onError(error);
    }
  });
}
