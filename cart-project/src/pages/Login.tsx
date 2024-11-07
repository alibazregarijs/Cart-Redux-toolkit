
import background from "../public/images/background.jpg";
import { Image } from "@nextui-org/react";



export default function Login() {
  

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
        {/* <img className="w-full h-full object-cover" src={profilePic}></img> */}

        <div className="absolute z-10 flex space-y-5 flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <h1
            className={` text-white  shadow-xl font-bold md:text-7xl  text-4xl `}
          >
            Welcome To Mycarpet
          </h1>
          <div className=" flex justify-center items-center w-1/2 shadow-2xl">
            <h1 className={`text-white text-center`}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo a
              quibusdam mollitia, cumque aperiam veritatis saepe fugiat
              dignissimos sint aspernatur explicabo laboriosam qui optio
              voluptatibus natus ad nesciunt rerum labore.
            </h1>
          </div>
          
        </div>
      </div>
    </div>
  );
}
