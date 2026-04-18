"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { registerUser } from "@/app/server-actions/user";
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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { error } from "console";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(32, "username must be at most 20 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password must be at most 15 characters."),
  email: z.email(),
});

function Register() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await registerUser(data);
      if (response.success) {
        alert("User registered!!");
      } else {
        throw Error("Something wrong");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[400px] p-5 text-center">
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-1">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>UserName</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="string"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
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
              Already have an account?{" "}
              <Link href={"/login"} className="underline">
                Login
              </Link>
            </h1>
            {
              <Button type="submit" form="form-rhf-demo">
                Submit
              </Button>
            }
          </div>
          {/* </Field> */}
          {/* </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default Register;
