import { DirectRight, Like } from "iconsax-react";
import { Button } from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@nextui-org/react";
import { type CommentProps } from "../utils/types";
import { UserProps } from "../utils/types";
import { fetchUserAndLike } from "../api/rating";
import { handleLike } from "../api/rating";

const Comment = ({ comment }: { comment: CommentProps }) => {
  const [replyButtonClicked, setReplyButtonClicked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [userCommented, setUserCommented] = useState<UserProps | undefined>(undefined);
  const [commentLiked, setCommentLiked] = useState(false);
  const userId = localStorage.getItem("userId") || "defaultUserId";

  useEffect(() => {
    if (replyButtonClicked && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyButtonClicked]);

  useEffect(() => {
    fetchUserAndLike(userId, comment.id, setUserCommented, setCommentLiked);
  }, []);

  return (
    <div className="mx-20 mt-10">
      <div className="flex border w-full flex-col justify-end gap-4 space-x-10  rounded-lg p-4">
        <p className="text-gray-400">{userCommented?.username}</p>
        <p>{comment.comment}</p>
        <div className="flex items-center gap-4">
          <DirectRight
            size="25"
            className="text-secondaryColor cursor-pointer"
            variant="Bold"
            onClick={() => setReplyButtonClicked(!replyButtonClicked)}
          />
          <Like
            size="32"
            onClick={() => {
              if (userId) {
                handleLike({
                  userId,
                  commentId: comment.id,
                  commentLiked,
                  setCommentLiked,
                });
              }
            }}
            className="text-secondaryColor cursor-pointer"
            variant={commentLiked ? "Bold" : "Outline"}
          />
        </div>
        {replyButtonClicked && (
          <div className="">
            <div className="flex flex-col items-center">
              <Textarea ref={textareaRef} placeholder="Write your reply..." />
            </div>
            <div className="mt-3">
              <Button onClick={() => setReplyButtonClicked(false)}>Send</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
