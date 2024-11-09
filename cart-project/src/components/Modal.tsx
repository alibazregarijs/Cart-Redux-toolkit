import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@nextui-org/react";
import { addToCart, CartItem, removeFromCart } from "../store/CartSlice";
import { DollarCircle } from "iconsax-react";
import { useCartDispatch } from "../store/hooks";

const MyModal = ({isOpen, onOpenChange, cartItems, totalPrice}:{isOpen:boolean,onOpenChange:()=>void,cartItems:CartItem[],totalPrice:number}) => {
  const dispatch = useCartDispatch();
  
  function handleAddToCart({
        id,
        title,
        price,
        img,
        quantity,
        quantityInStore,
      }: CartItem) {
        dispatch(addToCart({ id, title, price, img, quantity, quantityInStore }));
      }
    
      function handleRemoveFromCart(id: string) {
        dispatch(removeFromCart(id));
      }
    return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-10">
                {cartItems.map((item, index) => (
                  <div
                    className="flex justify-between items-center gap-2"
                    key={index}
                  >
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        className="text-mainColor min-w-1"
                        onClick={() => {
                          handleAddToCart({...item,quantity:item.quantity+1})
                        }}
                      >
                        +
                      </Button>
                      <span className="text-gray-500 brightness-75 ">
                        {item.quantity}
                      </span>
                      <Button
                        className="text-mainColor min-w-1"
                        onClick={() => {
                          handleRemoveFromCart(item.id);
                        }}
                      >
                        -
                      </Button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <span className="font-bold font-mono border-b">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end items-center gap-2">
                  <span>Total Price : {totalPrice}</span>
                  <DollarCircle size="20" className="text-secondaryColor" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-secondaryColor text-white"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button className="bg-mainColor text-white" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default MyModal