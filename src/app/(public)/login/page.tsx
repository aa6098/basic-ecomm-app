"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/app/server-actions/user";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must be at most 15 characters."),
  email: z.email(),
});

function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await loginUser(data);
     //
              alert(JSON.stringify(response))

      if (response.success){
        alert("success")
        Cookies.set("token", response.data)
        router.push("/products")
      } else {
        throw Error("Failed to login")
      }
    } catch (error: any) {}
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[400px] p-5 text-center">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Login to your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-1">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          {/* <CardFooter> */}
          {/* <Field orientation="horizontal"> */}
          <div className="flex flex-row justify-between items-baseline  px-5">
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button> */}
            <h1 className="text-sm">
              Don't have an account?{" "}
              <Link href={"/register"} className="underline">
                Register
              </Link>
            </h1>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </div>
          {/* </Field> */}
          {/* </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default Login;
