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
              <div className="flex flex-col justify-end gap-4 space-x-10 border rounded-lg p-4">
                <p className="text-gray-400">Ali Bazregari</p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere molestias placeat reiciendis dicta qui. Veritatis
                  soluta animi aperiam explicabo perspiciatis ut vitae at fugiat
                  corporis, quisquam quis voluptates nisi? Numquam repudiandae
                  quaerat illum eos cum, officiis voluptatibus minima nostrum,
                  asperiores aperiam cumque, rerum iste assumenda tempora unde
                  rem repellat ad praesentium quod perferendis nihil illo
                  maxime! Excepturi minus iure dolorem veritatis id ullam
                  quidem, quibusdam saepe suscipit in eaque. Consequatur
                  asperiores ex necessitatibus illo. Rem et facere labore,
                  quisquam quis doloremque repudiandae quidem deserunt corrupti
                  quasi cupiditate exercitationem fugit, quibusdam quas quod.
                  Repellat, error placeat officiis similique modi exercitationem
                  aliquid.
                </p>
                <div className="flex items-center gap-4">
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
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Comment;
