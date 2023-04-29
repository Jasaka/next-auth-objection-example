import Button from "@/frontend/components/Button/Button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
      Sign Out
    </Button>
  );
}
