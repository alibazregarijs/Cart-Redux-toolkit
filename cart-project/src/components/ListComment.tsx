import { useEffect, useState } from 'react'
import Comment from './Comment';

export type CommentProps = {
  id: string;
  userId: string;
  productId: string;
  comment: string;
};

const ListComment = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const fetchComments = async () => {
    const response = await fetch("http://localhost:8000/comments");
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div>
        {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  )
}

export default ListComment