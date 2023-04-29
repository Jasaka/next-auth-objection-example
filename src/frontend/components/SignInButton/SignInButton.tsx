import Button from "@/frontend/components/Button/Button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return <Button onClick={() => signIn("github")}>Sign In</Button>;
}
