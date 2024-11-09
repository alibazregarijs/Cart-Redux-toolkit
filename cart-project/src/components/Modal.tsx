import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { DollarCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useCartSelector } from "../store/hooks";
import { CartItem } from "../store/CartSlice";

const MyModal = ({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) => {
  const [count, setCount] = useState(1);

  const cartItems = useCartSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (value, item) => value + item.price * item.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-10">
                {cartItems.map((item,index) => (
                  <div className="flex justify-between items-center gap-2" key={index}>
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        className="text-mainColor min-w-1"
                        onClick={() => {
                          setCount((prevCount) => {
                            if (
                              prevCount >= 0 &&
                              !(item.quantityInStore <= prevCount)
                            )
                              return prevCount + 1;
                            return prevCount;
                          });
                        }}
                      >
                        +
                      </Button>
                      <span className="text-gray-500 brightness-75 ">
                        {count}
                      </span>
                      <Button
                        className="text-mainColor min-w-1"
                        onClick={() => {
                          setCount((prevCount) => {
                            if (prevCount > 0) return prevCount - 1;
                            return prevCount;
                          });
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
  );
};

export default MyModal;
