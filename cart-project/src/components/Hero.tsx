import ListProduct, { Product } from "./ListProduct";
import { fetchProducts } from "../api/rating";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts(setProducts);
  }, []);
  return <div><ListProduct products={products}/></div>;
};

export default Hero