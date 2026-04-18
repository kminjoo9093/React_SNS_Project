import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string, type: "LIST" | "DETAIL"){
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    enabled: type === "DETAIL", //detail페이지일때만 리패치 되도록 (LIST일때는 리패치 X)

    staleTime: 1000, //fresh인 상태에서만 유효
    gcTime: 5000,

    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  })
}