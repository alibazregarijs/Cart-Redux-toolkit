import ListProduct from "./ListProduct";
import { fetchProducts } from "../api/rating";
import { useState } from "react";
import { useEffect } from "react";
import { type ProductProps } from "../utils/types";

const Hero = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    fetchProducts(setProducts);
  }, []);
  return <div><ListProduct products={products}/></div>;
};

export default Hero