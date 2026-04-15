import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if(!response.ok) throw new Error("Fetch Failed");

  const data: Todo[] = await response.json();
  return data;
}