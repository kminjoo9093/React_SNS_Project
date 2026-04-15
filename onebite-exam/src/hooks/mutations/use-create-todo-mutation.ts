import { createTodo } from "@/api/create-todo";
import { useMutation } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    //이벤트 핸들러
    //요청 시작
    onMutate: () => {},
    //요청 종료
    onSettled: () => {},
    //요청 성공
    onSuccess: () => {
      window.location.reload();
    },
    //요청 실패
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
