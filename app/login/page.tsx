"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useActionState } from "react";
import { login } from "./actions";

export default function LogIn() {
  const [state, dispatch] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">LogIn with Email and Password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="Email"
          required
          name="email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <FormButton text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
