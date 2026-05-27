import { useEffect, type ReactNode } from "react";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  //세션 데이터 변화 때마다 호출되는 이벤트 핸들러
  // Supabase 클라이언트의 `onAuthStateChange` 이벤트 핸들러는 인증 상태가 변경될 때마다 트리거됨. 
  // 이를 활용하여 Zustand 스토어의 세션 데이터를 실시간으로 업데이트할 수 있음 (동기화)
  //리렌더링 될 때 마다 동일한 이벤트 핸들러가 여러 개 생성되면 안됨 -> useEffect
  //보통 clean up 함수 필요하지만 여기서는 최상위 컴포넌트기 때문에 안해도 됨(해당 컴포넌트가 언마운트됐다는건 이 앱을 나갔다는 거니까)
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
