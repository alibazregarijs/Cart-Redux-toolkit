import { Category2, DirectRight, Like } from "iconsax-react";
import { Accordion, AccordionItem, Avatar, Button } from "@nextui-org/react";
import { AnchorIcon } from "../public/svg/Anchor";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@nextui-org/react";
import { CommentProps } from "./ListComment";
import { UserProps } from "../utils/types";

const Comment = ({ comment }: { comment: CommentProps }) => {
  const [like, setLike] = useState(false);
  const [replyButtonClicked, setReplyButtonClicked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userCommented = useRef<UserProps>();
  const [commentLiked, setCommentLiked] = useState(false);

  useEffect(() => {
    if (replyButtonClicked && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyButtonClicked]);

  const fetchUserAndLike = async () => {
    // getting user and like of every comment
    const response = await fetch(
      `http://localhost:8000/users/${comment.userId}`
    );
    const data = await response.json();
    userCommented.current = data;
    const res = await fetch(
      `http://localhost:8000/commentLiked?userId=${userCommented.current?.id}&commentId=${comment.id}`
    );
    const info = await res.json();
    setCommentLiked(info.length > 0 ? true : false);
  };

  useEffect(() => {
    fetchUserAndLike();
  }, []);

  return (
    <div className="mx-20 mt-10">
      <Accordion selectionMode="multiple">
        <AccordionItem
          key="1"
          aria-label="Chung Miller"
          indicator={<AnchorIcon />}
          startContent={
            <Avatar
              isBordered
              radius="lg"
              icon={
                <Category2
                  size="32"
                  className="text-secondaryColor"
                  variant="Bold"
                />
              }
            />
          }
          subtitle="4 unread messages"
          title="Comments"
        >
          <div className="flex justify-between">
            <div className="flex w-full justify-center items-center gap-4">
              <div className="flex border w-full flex-col justify-end gap-4 space-x-10  rounded-lg p-4">
                <p className="text-gray-400">
                  {userCommented.current?.username}
                </p>
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
                    onClick={() => setLike(!like)}
                    className="text-secondaryColor cursor-pointer"
                    variant={commentLiked ? "Bold" : "Outline"}
                  />
                </div>
                {replyButtonClicked && (
                  <div className="">
                    <div className="flex flex-col items-center">
                      <Textarea
                        ref={textareaRef}
                        placeholder="Write your reply..."
                      />
                    </div>
                    <div className="mt-3">
                      <Button onClick={() => setReplyButtonClicked(false)}>
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Comment;
