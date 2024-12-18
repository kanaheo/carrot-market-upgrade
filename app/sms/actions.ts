"use server";

import validator from "validator";
import { z } from "zod";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// coerce는 강제로 타입 지정해주기
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogIn(prevState: any, formData: FormData) {
  tokenSchema.parse(formData.get("token"));
  console.log(typeof tokenSchema.parse(formData.get("token")));
}
