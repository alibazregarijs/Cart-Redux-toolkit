import Product from "./Product";
import { useEffect, useState } from "react";
type Product = {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  quantityInStore: number;
  rating?: number;
  productId?: string;
};

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    const prods = data.filter(
      (product: Product) => product.quantityInStore > 0
    );
    setProducts(prods);
  };



  
  useEffect(() => {
    fetchProducts();
    
  }, []);

 

  return (
    <div className="grid grid-cols-3 gap-10">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ListProduct;
