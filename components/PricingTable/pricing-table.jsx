import { PricingTable } from "@clerk/nextjs";

const pricingtable = () => {
  return (
      <div className="mt-8 w-full">
        <PricingTable
          appearance={
            {
              elements: {
                headerTitle: "Choose Your Plan",
                headerSubtitle: "Select a plan that suits your needs",
                ctaButton: {
                  text: "Get Started",
                },
              },
              variables: {
                colorPrimary: "#4F46E5",
              },
            }
          }
        />
      </div>
  )
}

export default pricingtable;