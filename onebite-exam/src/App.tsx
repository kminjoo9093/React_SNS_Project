import "./App.css";
import { Routes, Route, Outlet } from "react-router";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import IndexPage from "./pages/index-page";
import CounterPage from "./pages/counter-page";

function AuthLayout() {
  return (
    <div>
      <header>Auth!</header>
      <Outlet />
      {/* Outlet -> 공통 레이아웃 컴포넌트 내에서 실제 페이지 컴포넌트가 렌더링 될 위치를 결정해줌*/}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
