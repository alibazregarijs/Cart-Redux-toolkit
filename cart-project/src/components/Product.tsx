import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DollarCircle, Star1 } from "iconsax-react";
import { useCartDispatch, useCartSelector } from "../store/hooks";
import { addToCart } from "../store/CartSlice";
import { useRef } from "react";

import { AddRating, ratingSlice } from "../store/RatingSlice";
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
  const quantityRef = useRef(0);
  const userId = localStorage.getItem("userId")?.toString() || "defaultUserId";
  const [ratings, setRatings] = useState<number>(0);
  const dispatch = useCartDispatch();
  const [boldStars, setBoldStars] = useState<boolean[]>(Array(5).fill(false));
  const starRef = useRef(0);

  const product = useCartSelector((state) => state.cart.items).find(
    (item) => item.id === id
  );

  const fetchRatings = async () => {
    const response = await fetch(
      `http://localhost:8000/rating?productId=${id}&userId=${userId}`
    );
    const data = await response.json();
    setRatings(data[0]?.rating);
  };

  useEffect(() => {
    fetchRatings();
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

  const toggleStarBoldness = (index: number) => {
    setBoldStars((prev) => {
      const newBoldStars = [...prev];
      newBoldStars.fill(true, 0, index);
      newBoldStars[index] = !newBoldStars[index];
      newBoldStars.fill(false, index + 1);
      starRef.current = newBoldStars.filter((value) => value === true).length;
      return newBoldStars;
    });
  };

  const handleStarRating = ({ id }: { id: string }) => {
    const fetchRating = async () => {
      const response = await fetch(
        `http://localhost:8000/rating?productId=${id}&userId=${userId}`
      );
      const data = await response.json();
      const prod = data[0];

      if (prod) {
        const newRating = { ...prod, rating: starRef.current };
        await fetch(`http://localhost:8000/rating/${prod.id}`, {
          method: "PUT",
          body: JSON.stringify(newRating),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const response = await fetch(`http://localhost:8000/rating`);
        const data = await response.json();
        console.log(data, "dataaaaaaaaa");
        const ratingId = (parseInt(data.length) + 1).toString();
        const newRating = {
          id: ratingId,
          userId,
          productId: id,
          rating: starRef.current,
        };
        await fetch(`http://localhost:8000/rating`, {
          method: "POST",
          body: JSON.stringify(newRating),
        });
      }
    };
    fetchRating();
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
          <div
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className="absolute top-60  left-0 z-20 right-0 bottom-0 w-full max-h-5 flex items-center justify-between"
          >
            <div className="flex items-center justify-center">
              <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap  ">
                {price}
              </span>
              <DollarCircle size="20" className="text-secondaryColor" />
            </div>
            <span className="text-white font-semibold font-mono mx-2 whitespace-nowrap">
              {title}
              {ratings}
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
                handleStarRating({ id });
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
