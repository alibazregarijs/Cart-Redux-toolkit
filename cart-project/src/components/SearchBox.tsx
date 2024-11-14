import { Input } from "@nextui-org/react";
import { SearchNormal1 } from "iconsax-react";
import { useSearchDispatch } from "../store/hooks";
import { setSearchQuery } from "../store/SearchSlice";

const SearchBox = () => {
  
  const dispatch = useSearchDispatch()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }
  return (
    <Input
      isClearable
      type="email"
      variant="flat"
      startContent={<SearchNormal1 size="18" className="text-mainColor cursor-pointer"/>}
      placeholder="Search For Products"
      onClear={() => console.log("input cleared")}
      className="lg:w-96 w-60"
      onChange={handleSearch}
    />
  );
};

export default SearchBox;