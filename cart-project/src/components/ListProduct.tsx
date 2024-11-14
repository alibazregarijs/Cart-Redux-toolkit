import Product from "./Product";
export type Product = {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  quantityInStore: number;
  rating?: number;
  productId?: string;
};

const ListProduct = ({products}: {products: Product[]}) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ListProduct;
