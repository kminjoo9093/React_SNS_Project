import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout(){
  //로그인 세션 있으면 인덱스 페이지로 + 뒤로가기 방지
  const session = useSession();
  if(session) return <Navigate to={"/"} replace={true}/>

  return <Outlet/>;
}