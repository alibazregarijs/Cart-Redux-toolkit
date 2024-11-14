import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import { fetchFavorite, fetchProduct } from "../api/rating";
import { type ProductProps } from "../utils/types";

const Favorite = () => {
  const userId = localStorage.getItem?.("userId")?.toString();
  const [favorite, setFavorite] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (userId) {
      fetchFavorite(userId).then((productsIds) => {
        const uniqueProducts: ProductProps[] = [];
        productsIds.forEach((id: string) => {
          fetchProduct(id).then((product) => {
            if (!uniqueProducts.some((p) => p.id === product.id)) {
              uniqueProducts.push(product);
            }
            if (uniqueProducts.length === productsIds.length) {
              setFavorite(uniqueProducts);
            }
          });
        });
      });
    }
  }, [userId]);

  console.log(favorite);
  return (
    <div><ListProduct products={favorite} /></div>
  )
}

export default Favorite