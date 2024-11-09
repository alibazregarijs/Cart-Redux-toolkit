import SearchBox from "./SearchBox";
import { Like, Profile, ShoppingCart } from "iconsax-react";
import { useDisclosure } from "@nextui-org/react";
import Cart from "./Cart";
const NavBar = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="flex justify-between items-center mx-5 mt-2">
      <div>
        <Profile size="32" className="text-mainColor" />
      </div>
      <div>
        <SearchBox />
      </div>
      <div className="flex justify-center items-center gap-10">
        <ShoppingCart onClick={onOpen} size="32" className="text-secondaryColor cursor-pointer" />
        <Like size="32" className="text-secondaryColor cursor-pointer"/>
      </div>
      {isOpen && <Cart isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>}
    </div>
  );
};

export default NavBar;
