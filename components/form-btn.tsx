"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  /* 이건 자식에서만 사용가능. pending은 자동으로 위에 form이 pending를 찾아내서 Loading...을 표시 */
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
