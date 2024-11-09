import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { DollarCircle } from "iconsax-react";
const Product = ({
  title,
  img,
  price,
  quantityInStore,
}: {
  title: string;
  img: string;
  price: number;
  quantityInStore: number;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex flex-col relative items-center justify-center">
      <div className="relative space-y-9">
        <Image
          src={img}
          alt={title}
          width={300}
          height={300}
          className={`cursor-pointer ${hover && "brightness-50"}`}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        />
        {hover && (
          <div onMouseEnter={() => {
            setHover(true);
          }} onMouseLeave={() => {
            setHover(false);
          }} className="absolute top-60  left-0 z-20 right-0 bottom-0 w-full max-h-5 flex items-center justify-between">
            <div className="flex items-center justify-center">
              <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap  ">
                {price}
              </span>
              <DollarCircle size="20" className="text-secondaryColor"/>
            </div>
            <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap">
              {title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <Button className="bg-secondaryColor text-white">Add to Cart</Button>
      </div>
    </div>
  );
};

export default Product;
