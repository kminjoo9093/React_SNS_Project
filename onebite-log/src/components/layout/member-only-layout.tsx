import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout(){
  //로그인 세션이 없으면 로그인 페이지로
  const session = useSession();
  if(!session) return <Navigate to={"/sign-in"} replace={true}/>
  
  return <Outlet/>
}
