import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type === "FEED" ? false : true, // FEED 일때는 서버로 요청을 보내지 않고, 캐시된 개별 post 데이터를 활용
  });
}
