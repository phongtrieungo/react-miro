import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className="flex flex-col gap-y-4 ">
      <p>Authenticated screen</p>
      <UserButton />
    </main>
  );
}
