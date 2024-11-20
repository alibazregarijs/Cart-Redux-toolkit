export type ProductProps = {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  quantityInStore: number;
  rating?: number;
  productId?: string;
  quantityOfSell?: number;
};

export type UserProps = {
  id: string;
  email: string;
  password: string;
  username: string;
};
