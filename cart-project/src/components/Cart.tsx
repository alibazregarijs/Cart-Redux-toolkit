
import { useCartSelector } from "../store/hooks";
import MyModal from "./Modal";

const Cart = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) => {
  const cartItems = useCartSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (value, item) => value + item.price * item.quantity,
    0
  );
  
  return (
    <MyModal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      cartItems={cartItems} 
      totalPrice={totalPrice}
    />
  );
};

export default Cart;
