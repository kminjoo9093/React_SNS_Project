import CommentItem from "@/components/comment/comment-item";
import { useCommentsData } from "@/hooks/queries/use-comments-data";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(postId);

  return (
    <div className="flex flex-col gap-5">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
