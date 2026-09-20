import HomeClient from "./HomeClient";

export default function Page() {
  const pricingConfig = {
    earlyBirdPrice: process.env.EARLYBIRDPASS || "5000",
    standardPrice: process.env.STANDARDPASS || "10000",
    vipPrice: process.env.VIPPASS || "20000",
    earlyBirdValidUntil: process.env.EARLYBIRDPASS_VALID_UNTIL || null,
    standardValidUntil: process.env.STANDARDPASS_VALID_UNTIL || null,
    vipValidUntil: process.env.VIPPASS_VALID_UNTIL || null,
    vipSpotsLeft: process.env.VIPPASS_SPOTS_LETF || "10"
  };

  return <HomeClient pricingConfig={pricingConfig} />;
}
