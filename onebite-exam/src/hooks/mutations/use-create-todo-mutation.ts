import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
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
    onSuccess: (newTodo) => { //createTodo의 반환값이 매개변수로 제공됨
      // 데이터가 많을 경우를 대비해 리패칭 없이 새로운 데이터 불러오기(기존 캐시값 뒤에 추가)
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
    },
    //요청 실패
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
