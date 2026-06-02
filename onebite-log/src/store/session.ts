import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 타입 단언 문법(as) 사용한 이유 : 초기값을 의도적으로 느슨하게 정의하기 위함
type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

export const useSession = () => {
  const session = useSessionStore(store=>store.session);
  return session;
}

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore(store=>store.isLoaded)
  return isSessionLoaded;
}

export const useSetSession = () => {
  const setSession = useSessionStore(store=>store.actions.setSession);
  return setSession;
}