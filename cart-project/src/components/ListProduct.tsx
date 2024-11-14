
import Product from "./Product";
import Masonry from "react-masonry-css";
import { type ProductProps } from "../utils/types";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};
const ListProduct = ({products}: {products: ProductProps[]}) => {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="flex animate-slide-fwd gap-10 relative mx-4">
       {products?.map((product) => <Product key={product.id} {...product} />)}
    </Masonry>
  );
};

export default ListProduct;
