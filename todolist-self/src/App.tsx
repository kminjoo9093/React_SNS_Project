import "./App.css";
import TodoListPage from "./pages/todo-list-page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TodoListPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
