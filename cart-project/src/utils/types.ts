export type ProductProps = {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  quantityInStore: number;
  quantityOfSell: number;
  rating?: number;
  productId?: string;
};

export type UserProps = {
  id: string;
  email: string;
  password: string;
  username: string;
};

export type CommentProps = {
  id: string;
  userId: string;
  productId: string;
  comment: string;
};