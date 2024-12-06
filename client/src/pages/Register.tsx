import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "@/components/general/Logo";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import loginImage from "../../public/login-image.png";
import { useState } from "react";
import useAuthMutation from "@/hooks/mutation/useAuthMutation";
import { useToast } from "@/components/ui/Toast";
import { isAxiosError } from "axios";

type RegisterFields = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { registerMutation } = useAuthMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFields>();

  const onSubmit: SubmitHandler<RegisterFields> = async (value) => {
    try {
      if (value.confirmPassword !== value.password) {
        setError("confirmPassword", { message: "Password did not match" });
        setError("password", { message: "Password did not match" });
        return;
      }
      await registerMutation.mutateAsync({
        age: value.age,
        email: value.email,
        name: value.name,
        password: value.password,
      });
      toast.success("Successfuly Registed Account");
    } catch (err) {
      if (!isAxiosError(err)) return;
      const errorMessage = err.response?.data.message as string;
      if (errorMessage === "User with this email already exists") {
        setError("email", { message: errorMessage });
      }
    }
  };
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="grid grid-cols-2 h-[75rem] gap-10 p-10">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col pt-[5rem] gap-9 px-10">
            <Logo className="w-[53px] h-[53px]" />
            <div>
              <h1 className="text-largest text-white">Welcome To VGC!</h1>
              <p className="text-light">
                Enter the information below to create your account
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name field is required",
                  })}
                  className="mb-4"
                  errorMessage={errors.name?.message}
                />
                <Input
                  label="Email"
                  type="text"
                  placeholder="johndoe@gmail.com"
                  {...register("email", {
                    required: "Email field is required",
                  })}
                  className="mb-4"
                  errorMessage={errors.email?.message}
                />
                <Input
                  label="Age"
                  type="text"
                  placeholder="16"
                  {...register("age", {
                    required: "Age field is required",
                  })}
                  className="mb-4"
                  errorMessage={errors.age?.message}
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
                    } absolute right-5 top-11 text-2xl cursor-pointer text-white`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></button>
                </div>
                <div className="relative mb-4">
                  <Input
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*************"
                    {...register("confirmPassword", {
                      required: "Confirm Password field is required",
                    })}
                    errorMessage={errors.confirmPassword?.message}
                  />
                  <button
                    type="button"
                    className={`bx ${
                      showPassword ? "bx-hide" : "bx-show"
                    } absolute right-5 top-11 text-2xl cursor-pointer text-white`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></button>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="border-none bg-accent text-white w-[100%] p-5 rounded-[8px]"
                    isLoading={registerMutation.isPending}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex justify-center">
              <p className="text-white text-paragraph font-medium">
                Already have an account?
                <Link to="/login" className="text-accent ml-2 underline">
                  Login
                </Link>
              </p>
            </div>
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
