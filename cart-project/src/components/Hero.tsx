import ListProduct from "./ListProduct";
import { fetchProducts } from "../api/rating";
import { useState } from "react";
import { useEffect } from "react";
import { type ProductProps } from "../utils/types";
import { useSearchSelector } from "../store/hooks";
import Filters from "./Filters";

const Hero = () => {
  const searchQuery = useSearchSelector((state) => state.search.query);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    console.log("salam")
    fetchProducts(searchQuery, setProducts);
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <Filters setProducts={setProducts} />
      <ListProduct products={products} />
    </div>
  );
};

export default Hero;
