import SearchBox from "./SearchBox";
import { Like, Profile, ShoppingCart } from "iconsax-react";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center mx-5">
      <div>
        <Profile size="32" className="text-mainColor" />
      </div>
      <div>
        <SearchBox />
      </div>
      <div className="flex justify-center items-center gap-10">
        <ShoppingCart size="32" className="text-secondaryColor cursor-pointer" />
        <Like size="32" className="text-secondaryColor cursor-pointer"/>
      </div>
    </div>
  );
};

export default NavBar;
