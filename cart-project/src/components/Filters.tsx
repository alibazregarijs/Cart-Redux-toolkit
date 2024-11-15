import { Button, Slider} from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { type ProductProps } from "../utils/types";
import { fetchProductPrice } from "../api/rating";

const Filters = ({setProducts }:{setProducts:React.Dispatch<React.SetStateAction<ProductProps[]>>}) => {
  const [value, setValue] = useState<[number, number]>([0, 0]);
  const newestProducts = useRef<ProductProps[]>([])
  const newestButtonClickedRef = useRef<boolean>(false);

  useEffect(() => {
    if (newestButtonClickedRef.current) {
      setProducts(newestProducts.current);
    } else {
      fetchProductPrice(value, setProducts);
    }
  }, [value]);

  const fetchNewestProducts = async () => {
    const response = await fetch(`http://localhost:8000/products`);
    const data = await response.json();
    newestProducts.current = data.slice(-3);
    newestButtonClickedRef.current = true;
    setValue([0, 0]);
    setProducts(newestProducts.current);
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
        <Button className="bg-secondaryColor text-black">Popular</Button>
        <Button onClick={fetchNewestProducts} className="bg-mainColor text-white">Newest Products</Button>
      </div>
    </div>
  );
};

export default Filters;
