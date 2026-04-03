import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todos-data";
import { SERVER_URL } from "@/lib/constants";

export default function TodoListPage() {

  const {data:todos, isLoading, error} = useTodosData();

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {
        todos?.map((todo)=><TodoItem key={todo.id} {...todo}/>)
      }
    </div>
  );
}
