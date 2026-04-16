import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updateTodo) => {
      await queryClient.cancelQueries({
        //데이터 조회 요청 취소
        queryKey: QUERY_KEYS.todo.list,
      });

      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updateTodo.id
            ? { ...prevTodo, ...updateTodo }
            : prevTodo,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (error, variable, context) => {
      //안정적인 낙관적 업데이트를 위해
      if (context && context.prevTodos) {
        //캐시 데이터 원상복구
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      //데이터 무결성 보장 위해 캐시 데이터 무효화로 다시 최신 데이터 조회
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
