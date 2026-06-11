import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants"
import { useInfiniteQuery } from "@tanstack/react-query"

const PAGE_SIZE = 5;

export function useInfinitePostsData(){
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    //pageParam : 현재 불러와야 하는 페이지의 번호
    queryFn: async ({pageParam}) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({from, to});
      return posts;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // getNextPageParam : 다음으로 불러올 페이지 번호
      // lastPage : 가장 최근에 불러온 페이지
      // allPages : 지금까지 불러온 페이지들에 대한 정보, 2차 배열 형태( 각 페이지[] -> 5 post items [] )
      if(lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    }
  })
}