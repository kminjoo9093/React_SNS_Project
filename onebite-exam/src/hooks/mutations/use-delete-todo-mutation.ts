import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deleteTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deleteTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list, (prevTodoIds) => {
          if(!prevTodoIds) return [];
          return prevTodoIds.filter((id)=> id !== deleteTodo.id);
        }
      )
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if(!prevTodos) return [];
      //   return prevTodos.filter((prevTodo)=>prevTodo.id !== deleteTodo.id);
      // })
    },

    // 캐시 데이터 수정 방식
    // 1. 캐시 무효화 -> invalidateQueries : 직관적, 간단 but 전체를 다시 불러와야 함으로 성능 별로
    // 2. 수정 요청의 응답값 활용 -> onSuccess : 데이터 리패칭 과정 필요없음, 요청 완료까지 시간이 걸린다면 onSuccess이벤트 핸들러도 그만큼 늦게 호출됨(지금 상황에서는 크게 문제 x)
    // 3. 낙관적 업데이트 -> onMutate : 클릭 직후 바로 화면 업데이트 but 요청 실패 시 데이터 원상복구 시켜야 함(삭제한 데이터가 다시 부활하는 듯한 느낌->부적절)
    //=> 2번이 가장 적절
  });
}
