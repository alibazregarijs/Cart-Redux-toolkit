import { Button, Slider, SliderValue } from "@nextui-org/react";
import { useState } from "react";

const Filters = () => {
  const [value, setValue] = useState<SliderValue>([100, 300]);
  console.log(value)
  return (
    <div className="flex justify-around w-full items-center gap-10">
      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
          <Slider
            formatOptions={{ style: "currency", currency: "USD" }}
            step={10}
            aria-label="Select a budget"
            maxValue={1000}
            minValue={0}
            value={value}
            onChange={setValue}
            className="max-w-md"
          />
          <p className="text-default-500 font-medium text-small">
            Selected budget:{" "}
            {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Button className="bg-secondaryColor text-black">Popular</Button>
        <Button className="bg-mainColor text-white">Newest Products</Button>
      </div>
    </div>
  );
};

export default Filters;
