import { Button } from "@/components/ui/button";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginApi } from "@/api/endpoints/auth";
import toast from "react-hot-toast";
import { useApi } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export interface LoginInputType {
  username: string;
  password: string;
}

export default function Login() {
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();

  const login = useApi({
    api: loginApi,
    onSuccess: (data) => {
      if (data?.token) {
        setCookie("token", data.token, { path: "/" });
        navigate("/");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInputType) => {
    toast.promise(login.process(data), {
      loading: "Logging in...",
      success: "Login successful",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-5xl bg-card border border-border/40 shadow-xl rounded-2xl overflow-hidden flex">
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Login to your CentraChannel Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <FieldGroup>
              <Input
                id="username"
                label="Username"
                placeholder="your username"
                icon={<User className="size-4" />}
                className={errors.username && "border-red-500"}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                message={errors.username?.message}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                icon={<Lock className="size-4" />}
                className={errors.password && "border-red-500"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                message={errors.password?.message}
              />

              <Button type="submit" className="w-full h-11">
                Login
              </Button>
            </FieldGroup>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don’t have an account?{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-muted items-center justify-center p-10">
          <div className="border border-border/40 rounded-lg p-6 bg-background/40">
            <img src="/300.png" alt="placeholder" className="opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
