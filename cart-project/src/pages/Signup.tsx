import background from "../public/images/background.jpg";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-full h-full">
        <Image
          src={background}
          className="w-screen h-screen object-cover rounded-none"
          width={0}
          height={0}
          alt="background"
        />
        <div className="absolute z-10 flex space-y-5 flex-col justify-center items-center top-[-10rem] right-0 left-0 bottom-0 bg-blackOverlay">
          <h1
            className={` text-white  shadow-xl font-bold md:text-5xl  text-xl `}
          >
            Signup <span className="text-secondaryColor">Page</span>
          </h1>
          <div className="flex flex-col space-y-5 justify-center items-center w-1/2 shadow-2xl">
            <Input
              type="email"
              variant="underlined"
              label="Email"
              classNames={{
                input: ["!text-white"],
              }}
            />
            <Input
              type="text"
              variant="underlined"
              label="UserName"
              classNames={{
                input: ["!text-white"],
              }}
            />
            <Input
              type="password"
              variant="underlined"
              label="Password"
              classNames={{
                input: ["!text-white"],
              }}
            />
            <Input
              type="password"
              variant="underlined"
              label="Password"
              classNames={{
                input: ["!text-white"],
              }}
            />
            <Button className="text-white" variant="bordered">
              Signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
