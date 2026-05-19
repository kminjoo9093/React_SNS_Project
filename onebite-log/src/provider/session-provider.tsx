import { useEffect, type ReactNode } from "react";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  //세션 데이터 변화 때마다 호출되는 이벤트 핸들러
  //리렌더링 될 때 마다 동일한 이벤트 핸들러가 여러 개 생성되면 안됨 -> useEffect
  //보통 clean up 함수 필요하지만 여기서는 최상위 컴포넌트기 때문에 안해도 됨(해당 컴포넌트가 언마운트됐다는건 이 앱을 나갔다는 거니까)
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
