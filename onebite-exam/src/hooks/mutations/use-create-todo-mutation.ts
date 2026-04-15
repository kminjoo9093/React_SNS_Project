import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    //이벤트 핸들러
    //요청 시작
    onMutate: () => {},
    //요청 종료
    onSettled: () => {},
    //요청 성공
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      })
      // window.location.reload(); 깔끔한 방법은 아님(모든 데이터를 새로 불러오기 때문)
    },
    //요청 실패
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
