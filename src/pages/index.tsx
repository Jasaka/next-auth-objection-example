import { useSession } from "next-auth/react";
import SignInButton from "@/frontend/components/SignInButton/SignInButton";
import SignOutButton from "@/frontend/components/SignOutButton/SignOutButton";
import Button from "@/frontend/components/Button/Button";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className="text-4xl font-bold text-center">Welcome</h1>
      <p className="text-2xl text-center">
        You are in an {session.status} session.
        {session.status === "authenticated" && (
          <>
            <br />
            {` Your email is ${session.data.user.email}.`}
          </>
        )}
      </p>
      <Button>
        <Link href={"/protected"}>Protected Route</Link>
      </Button>
      {session.status === "authenticated" && <SignOutButton />}
      {session.status === "unauthenticated" && <SignInButton />}
    </main>
  );
}
