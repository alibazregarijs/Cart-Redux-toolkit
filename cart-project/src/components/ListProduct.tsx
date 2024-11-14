
import Product from "./Product";
import Masonry from "react-masonry-css";
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

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};
const ListProduct = ({products}: {products: Product[]}) => {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex animate-slide-fwd gap-10 relative">
       {products?.map((product) => <Product key={product.id} {...product} />)}
    </Masonry>
  );
};

export default ListProduct;
