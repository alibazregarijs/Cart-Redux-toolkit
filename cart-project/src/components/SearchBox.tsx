import { Input } from "@nextui-org/react";
import { SearchNormal1 } from "iconsax-react";

const SearchBox = () => {
  return (
    <Input
      isClearable
      type="email"
      variant="flat"
      startContent={<SearchNormal1 size="18" className="text-mainColor cursor-pointer"/>}
      placeholder="Search For Products"
      onClear={() => console.log("input cleared")}
      className="max-w-xs"
    />
  );
};

export default SearchBox;