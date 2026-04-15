import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { //글로벌 설정
    queries:{
      staleTime: 0,
      gcTime: 5 * 60 * 1000, //메모리를 아예 삭제해버리는거기 때문에 충분히 시간을 둠

      //주식 차트, 실시간 채팅 처럼 실시간 데이터를 빠르게 반영해야하는 상황이 아니라면
      // 보통은 마운트 시점만 true로 설정하고 나머지는 false로 설정하는게 일반적
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
