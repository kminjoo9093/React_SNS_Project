import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateTodo } from "@/store/todos";

export default function TodoEditor() {
  const createTodo = useCreateTodo();
  const [content, setContent] = useState("");

  const onClickButton = ()=>{
    if(content.trim() === "") return;
    createTodo(content);
    setContent("");
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        className="p-5"
      />
      <Button variant={"default"} onClick={onClickButton} >추가</Button>
    </div>
  );
}
