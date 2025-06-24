import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Clerk Next.js Template</h1>
      <p className="mt-4 text-lg">
        This is a template for building applications with Clerk authentication.
      </p>
      <Image
        src="/vercel.svg"
        alt="Clerk Logo"
        width={200}
        height={100}
        className="mt-8"
      />
    </main>
  );
}
