import { useEffect, useState } from "react";
import ListProduct, { type Product } from "./ListProduct";
import { fetchFavorite, fetchProduct } from "../api/rating";

const Favorite = () => {
  const userId = localStorage.getItem?.("userId")?.toString();
  const [favorite, setFavorite] = useState<Product[]>([]);

  console.log("rendersss")
  useEffect(() => {
    if (userId) {
      fetchFavorite(userId).then((productsIds) => {
        const uniqueProducts: Product[] = [];
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