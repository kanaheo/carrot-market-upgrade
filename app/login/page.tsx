"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useActionState, useState } from "react";
import { login } from "./actions";
import { useFormStatus } from "react-dom";

export default function LogIn() {
  const [state, dispatch] = useActionState(login, null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { pending } = useFormStatus(); // 현재 폼 상태 확인

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
          value={formValues.email}
          onChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
          value={formValues.password}
          onChange={handleChange}
        />
        <FormButton text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
