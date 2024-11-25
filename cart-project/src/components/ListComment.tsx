import { useEffect, useState } from "react";
import Comment from "./Comment";
import {
  Accordion,
  Textarea,
  Button,
  AccordionItem,
  Avatar,
} from "@nextui-org/react";
import { AnchorIcon } from "../public/svg/Anchor";
import { Category2 } from "iconsax-react";
import { fetchComments, handleSendComment } from "../api/rating";
import { type CommentProps } from "../utils/types";

const ListComment = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentText, setCommentText] = useState("");
  const userId = localStorage.getItem("userId") || "defaultUserId";

  useEffect(() => {
    fetchComments(setComments);
  }, []);

  return (
    <div>
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
              <div className="flex flex-col justify-center items-center gap-4 w-full">
                <div className="w-full">
                  <div className="flex flex-col items-center">
                    <Textarea
                      placeholder="leave a comment ..."
                      onChange={(e) => setCommentText(e.target.value)}
                      value={commentText}
                    />
                  </div>
                  <div className="mt-3">
                    <Button
                      onClick={() =>
                        handleSendComment(
                          commentText,
                          userId,
                          setCommentText,
                          setComments
                        )
                      }
                      isDisabled={!commentText}
                    >
                      Send
                    </Button>
                  </div>
                </div>
                
                <div className="w-full">
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ListComment;
