import { Button, Slider } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { type ProductProps } from "../utils/types";
import { fetchProductPrice } from "../api/rating";
import { fetchNewestProducts } from "../api/rating";

const Filters = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}) => {
  const [value, setValue] = useState<[number, number]>([0, 0]);
  const newestProducts = useRef<ProductProps[]>([]);
  const popularProducts = useRef<ProductProps[]>([]);
  const newestButtonClickedRef = useRef<boolean>(false);
  const popularButtonClickedRef = useRef<boolean>(false);

  useEffect(() => {
    if (newestButtonClickedRef.current) {
      setProducts(newestProducts.current);
    } 
    else if (popularButtonClickedRef.current) {
      console.log(popularProducts.current, "popularProducts")
      setProducts(popularProducts.current);
    }
    else {
      fetchProductPrice(value, setProducts);
    }
  }, [value]);

  const fetchPopularProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/products`);
      const data = await response.json();
      let averageRating = 0;
      
      data.forEach((product: ProductProps) => {
        if (product?.quantityOfSell !== undefined) {
          averageRating += product.quantityOfSell;
        }
      });
      averageRating = averageRating / data.length;

      const filteredPopularProducts = data.filter(
        (product: ProductProps) =>
          product?.quantityOfSell && product?.quantityOfSell > averageRating
      );

      popularProducts.current = filteredPopularProducts;
      popularButtonClickedRef.current = true;
      setValue([0, 0]);
      setProducts(popularProducts.current);

      console.log(popularProducts.current, "popularProducts");
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  return (
    <div className="flex justify-around w-full items-center gap-10">
      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
          <Slider
            formatOptions={{ style: "currency", currency: "USD" }}
            step={10}
            aria-label="Select a budget"
            maxValue={1000}
            minValue={0}
            value={value}
            onChange={(e) => {
              setValue(e as [number, number]);
              newestButtonClickedRef.current = false;
            }}
            className="max-w-md"
          />
          <p className="text-default-500 font-medium text-small">
            Selected budget:{" "}
            {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Button
          onClick={fetchPopularProducts}
          className="bg-secondaryColor text-black"
        >
          Popular
        </Button>
        <Button
          onClick={() =>
            fetchNewestProducts({
              setProducts,
              setValue,
              newestProducts,
              newestButtonClickedRef,
            })
          }
          className="bg-mainColor text-white"
        >
          Newest Products
        </Button>
      </div>
    </div>
  );
};

export default Filters;