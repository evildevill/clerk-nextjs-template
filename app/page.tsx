import PricingTable from "@/components/PricingTable/pricing-table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Clerk Next.js Template</h1>
      <p className="mt-4 text-lg">
        This is a template for building applications with Clerk authentication.
      </p>
      <PricingTable />
    </main>
  );
}