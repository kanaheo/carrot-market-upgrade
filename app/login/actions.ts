"use server";

export default async function handleForm(prevState: any, formData: FormData) {
  console.log("logged in!");
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["worng password", "password too short"],
  };
}
