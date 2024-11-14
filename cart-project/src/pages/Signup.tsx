import background from "../public/images/background.jpg";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "../utils/ZodTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/hash";

export default function Signup() {
  const navigate = useNavigate();
  type User = {
    id: number;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("http://localhost:8000/users");
    const apiData = await response.json();
    let userId = apiData.length + 1
    const existEmails = apiData.map((user: any) => user.email);

    if(existEmails.includes(data.email)){
      setError("email", {
        type: "server",
        message: "email already exists",
      });
      return
    }

    apiData.map((apiUser: User) => {
      if(apiUser.email === data.email){
        setError("email", {
          type: "server",
          message: "email already exists",
        });
        return
      }
  
    })

    if (response.ok) {
      const hashedPassword = hashPassword({ pass: data.password }).toString();
      const newData = { ...data, password: hashedPassword , id:userId.toString() };
      await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify(newData),
      });

      localStorage.setItem("userId", userId.toString());
      navigate("/home");

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
            Signup <span className="text-secondaryColor">Page</span>
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
                {...register("username")}
                type="text"
                variant="underlined"
                label="UserName"
                classNames={{
                  input: ["!text-white"],
                }}
              />
              {errors.username && (
                <p className="text-red-500 text-left">{`${errors.username.message}`}</p>
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
              <Input
                {...register("confirmPassword")}
                type="password"
                variant="underlined"
                label="Confirm Password"
                classNames={{
                  input: ["!text-white"],
                }}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-left">{`${errors.confirmPassword.message}`}</p>
              )}
              <div className="flex justify-center items-center space-x-5">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white disabled:bg-gray-500"
                  variant="bordered"
                >
                  Signup
                </Button>
                <Button
                  onClick={() => navigate("/signin")}
                  type="submit"
                  className={`text-secondaryColor disabled:bg-gray-500 ${
                    !errors.email && "hidden"
                  }`}
                  variant="ghost"
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
