import { Category2, DirectRight, Like } from "iconsax-react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { AnchorIcon } from "../public/svg/Anchor";
import { useState } from "react";

const Comment = () => {
  const [like, setLike] = useState(false);

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
            <div className="flex justify-center items-center gap-4">
              <div className="flex flex-col justify-end gap-4">
                <p className="text-gray-400">Ali Bazregari</p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos,
                  nulla. Voluptates accusamus dolorum omnis officia nulla eum,
                  id commodi earum!
                </p>
              </div>
              <div></div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <DirectRight
                size="25"
                className="text-secondaryColor cursor-pointer"
                variant="Bold"
              />
              <Like
                size="32"
                onClick={() => setLike(!like)}
                className="text-secondaryColor cursor-pointer"
                variant={like ? "Bold" : "Outline"}
              />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Comment;
