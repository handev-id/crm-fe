import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginApi } from "@/api/endpoints/auth";
import toast from "react-hot-toast";
import { useApi } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <Card className="shadow-lg border-border/60">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold">
              Login to your account
            </CardTitle>
            <CardDescription>
              Enter your username & password to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <FieldDescription className="text-center pt-2">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
