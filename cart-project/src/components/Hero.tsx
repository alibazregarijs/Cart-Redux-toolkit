import ListProduct from "./ListProduct";
import { fetchProducts } from "../api/rating";
import { useState } from "react";
import { useEffect } from "react";
import { type ProductProps } from "../utils/types";
import { useSearchSelector } from "../store/hooks";

const Hero = () => {
  const searchQuery = useSearchSelector(state => state.search.query)
  
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    fetchProducts(searchQuery, setProducts);
  }, [searchQuery]);
  return <div><ListProduct products={products}/></div>;
};

export default Hero