import background from "../public/images/background.jpg";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/hash";
import { TSignInSchema, signInSchema } from "../utils/ZodTypes";

type User = {
  id: number;
  email: string;
  password: string;
};

export default function Signin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    const response = await fetch("http://localhost:8000/users");
    const apiData = await response.json();

    let user: User | null = null;
    const hashedPass = hashPassword({ pass: data.password }).toString();

    apiData.forEach((apiUser: User) => {
      if (apiUser.email === data.email) {
        user = apiUser;
      }
    });

    if (!user) {
      setError("email", {
        type: "server",
        message: "email not found",
      });
    } else if (user && (user as User).password != hashedPass) {
      setError("password", {
        type: "server",
        message: "password is incorrect",
      });
    } else {
      localStorage.setItem("userId", (user as User).id.toString());
      navigate("/home");
      reset();
    }
  };

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
        <div className="absolute z-10 flex space-y-5 flex-col justify-center items-center top-[0rem] lg:top-[-5rem] right-0 left-0 bottom-0 bg-blackOverlay">
          <h1
            className={` text-white  shadow-xl font-bold md:text-5xl  text-xl `}
          >
            Signin <span className="text-secondaryColor">Page</span>
          </h1>
          <div className="flex flex-col space-y-5 justify-center items-center w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-3 text-center w-full"
            >
              <Input
                {...register("email")}
                type="email"
                variant="underlined"
                label="Email"
                classNames={{
                  input: ["!text-white"],
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-left">{`${errors.email.message}`}</p>
              )}

              <Input
                {...register("password")}
                type="password"
                variant="underlined"
                label="Password"
                classNames={{
                  input: ["!text-white"],
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-left">{`${errors.password.message}`}</p>
              )}
              <div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white disabled:bg-gray-500"
                  variant="bordered"
                >
                  Signin
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
