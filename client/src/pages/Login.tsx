import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "@/components/general/Logo";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import googleIcon from "../../public/google-logo.png";
import loginImage from "../../public/login-image.png";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

type loginFields = {
  username: string;
  password: string;
};

export default function Login() {
  const handleLogin = useGoogleLogin({
    onSuccess: (token) => console.log(token),
  });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFields>();

  const onSubmit: SubmitHandler<loginFields> = (value) => {
    console.log(value);
  };
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="grid grid-cols-2 h-[1024px] gap-10 p-10">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col pt-[5rem] gap-9 px-10">
            <Logo className="w-[53px] h-[53px]" />
            <div>
              <h1 className="text-largest text-white">Welcome Back!</h1>
              <p className="text-light">
                Enter your credential to login to your account
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...register("username", {
                    required: "Username field is required",
                  })}
                  className="mb-4"
                  errorMessage={errors.username?.message}
                />

                <div className="relative mb-4">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*************"
                    {...register("password", {
                      required: "Password field is required",
                    })}
                    errorMessage={errors.password?.message}
                  />
                  <button
                    type="button"
                    className={`bx ${
                      showPassword ? "bx-hide" : "bx-show"
                    } absolute right-5 top-11 text-3xl cursor-pointer text-white`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></button>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="border-none bg-accent text-white w-[100%] p-5 rounded-[8px]"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex justify-center">
              <p className="text-white text-paragraph font-medium">
                Don't have an account?
                <Link to="/register" className="text-accent ml-2 underline">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="flex items-center">
              <hr className="w-full  border-border" />
              <p className="text-light p-[1rem]">or</p>
              <hr className="w-full border-border" />
            </div>
            <Button
              variant={"tertiary"}
              className="gap-2"
              onClick={() => handleLogin()}
            >
              <img src={googleIcon} alt="google icon" className="w-6 h-6" />
              <p className="text-paragraph font-medium text-white">
                Log in with Google
              </p>
            </Button>
          </div>
          <footer>
            <p className="text-light text-center text-paragraph font-medium">
              &copy; 2024 VGC, All rights reserved
            </p>
          </footer>
        </div>
        <div className="relative flex flex-col justify-start bg-border rounded-[12px] p-10">
          <div className="pt-[7.5rem]">
            <h1 className="text-white text-largest max-w-[90%] font-medium">
              Your Front-Row Pass to Every Movie Experience.
            </h1>
            <p className="text-light text-paragraph font-medium">
              Say goodbye to long queues and last-minute hassles.
            </p>
          </div>
          <img
            src={loginImage}
            alt="login image"
            className="absolute rounded-[12px] self-end right-0 max-w-full bottom-10"
          />
        </div>
      </div>
    </main>
  );
}
