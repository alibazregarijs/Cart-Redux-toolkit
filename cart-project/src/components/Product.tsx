import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DollarCircle, Star1 } from "iconsax-react";
import { useCartDispatch, useCartSelector } from "../store/hooks";
import { addToCart } from "../store/CartSlice";
import { useRef } from "react";
import { fetchRatings } from "../api/rating";
import { handleStarRating } from "../api/rating";


const Product = ({
  title,
  img,
  price,
  quantityInStore,
  id,

}: {
  id: string;
  title: string;
  img: string;
  price: number;
  quantityInStore: number;
  quantity: number;
}) => {
  const [hover, setHover] = useState(false);
  const [ratings, setRatings] = useState<number>(0);
  const [boldStars, setBoldStars] = useState<boolean[]>(Array(5).fill(false));

  const userId = localStorage.getItem("userId")?.toString() || "defaultUserId";

  const starRef = useRef(0);
  const quantityRef = useRef(0);

  const dispatch = useCartDispatch();
  const product = useCartSelector((state) => state.cart.items).find(
    (item) => item.id === id
  );

  useEffect(() => {
    fetchRatings(id,userId).then((rating)=>{
      setRatings(rating)
    })
  }, []);

  useEffect(() => {
    setRate(false,ratings)
  }, [ratings]);

  const setRate = (out:boolean,index:number) => {
      setBoldStars((prev) => {
        const newBoldStars = [...prev];
        newBoldStars.fill(true, 0, index);
        newBoldStars[index] = !newBoldStars[index];
        out ? newBoldStars.fill(false, index + 1) : newBoldStars.fill(false, index)
        starRef.current = newBoldStars.filter((value) => value === true).length;
        return newBoldStars;
      });
  };

  function handleAddToCart() {
    quantityRef.current = (product?.quantity ?? 0) + 1;
    dispatch(
      addToCart({
        id,
        title,
        price,
        img,
        quantity: quantityRef.current,
        quantityInStore,
      })
    );
  }

  return (
    <div className="flex flex-col relative items-center justify-center mt-10">
      <div className="space-y-9 relative">
        <Image
          src={img}
          alt={title}
          className={`cursor-pointer ${hover && "brightness-50"}`}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        />
        {hover && (
          <div
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className="absolute top-[-10]  left-0 z-20 right-0 bottom-0 w-full flex items-center justify-between"
          >
            <div className="flex items-center justify-center">
              <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap  ">
                {price}
              </span>
              <DollarCircle size="20" className="text-secondaryColor" />
            </div>
            <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap">
              {title}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-3">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            <Star1
              size="20"
              onClick={() => {
                setRate(true,i);
                handleStarRating({ id,userId,starRef });
              }}
              variant={boldStars[i] ? "Bold" : "Outline"}
              className={`cursor-pointer text-secondaryColor`}
            />
          </span>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        <Button
          onClick={() => {
            handleAddToCart();
          }}
          className="bg-secondaryColor text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
