import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId? : string){

  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!), // !는 null이 아님을 단언 (!!userId 해두었기 때문에)
    queryFn: async ()=>{
      try{
        const profile = await fetchProfile(userId!);
        return profile;
      } catch(error) {
        //에러 원인 파악위해 타입, 코드 확인 (타입은 profile.ts, 코드는 네트워크 미리보기에서 확인)
        if( isMine && (error as PostgrestError).code === "PGRST116"){
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId //userId가 없으면 아무 일 일어나지 않음
  })
}