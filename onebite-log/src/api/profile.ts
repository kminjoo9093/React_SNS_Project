import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";

//프로필 데이터 조회 요청
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// 프로필 생성 후 반환
export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if(error) throw error;
  return data;
}
