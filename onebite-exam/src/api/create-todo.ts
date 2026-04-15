import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function createTodo(content: string){
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body:JSON.stringify({
      // id, 자동 부여가 됨으로 생략 가능함 (버전 업 이후 문자열로만 부여 됨 -> 기존 넘버 타입을 스트링 타입으로 수정)
      content,
      isDone: false,
    })
  })
  if(!response.ok) throw new Error("Create Todo Failed");
  const data: Todo = await response.json();
  return data;
}