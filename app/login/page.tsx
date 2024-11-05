import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  async function handleForm(formData: FormData) {
    "use server";
    console.log(formData.get("name"));
    console.log("jfjfjfj");
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">LogIn with Email and Password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="Email"
          required
          errors={[]}
          name="email"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
