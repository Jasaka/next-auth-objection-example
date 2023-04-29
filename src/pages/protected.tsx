import { useSession } from "next-auth/react";
import Button from "@/frontend/components/Button/Button";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1 className="text-4xl font-bold text-center">Protected</h1>
      <p className="text-2xl text-center">
        You are on a protected route, because you are {session.status}.
      </p>
      <Button>
        <Link href={"/"}>Home</Link>
      </Button>
    </main>
  );
}
