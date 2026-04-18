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
        queryKey: QUERY_KEYS.todo.detail(updateTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updateTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updateTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            ...updateTodo,
          };
        },
      );

      return {prevTodo};
    },
    onError: (error, variable, context) => {
      //안정적인 낙관적 업데이트를 위해
      if (context && context.prevTodo) {
        //캐시 데이터 원상복구
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
    // onSettled: () => {
    //   //데이터 무결성 보장 위해 캐시 데이터 무효화로 다시 최신 데이터 조회
    //   queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list,
    //   });
    // },
  });
}
