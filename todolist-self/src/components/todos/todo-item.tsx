import { useDeleteTodo } from "@/store/todos";
import { Button } from "../ui/button";

export default function TodoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const deleteTodo = useDeleteTodo();
  const onClickButton = ()=>{
    deleteTodo(id);
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-sm border p-2">
      {content}
      <Button variant={"destructive"} onClick={onClickButton}>삭제</Button>
    </div>
  );
}
