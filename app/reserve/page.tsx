import ReserveClient from "./ReserveClient";

export default function ReservePage() {
  const earlyBirdPrice = process.env.EARLYBIRDPASS || "5000";
  const standardPrice = process.env.STANDARDPASS || "10000";
  const vipPrice = process.env.VIPPASS || "20000";

  const config = {
    earlyBirdPrice,
    standardPrice,
    vipPrice,
    earlyBirdValidUntil: process.env.EARLYBIRDPASS_VALID_UNTIL || null,
    standardValidUntil: process.env.STANDARDPASS_VALID_UNTIL || null,
    vipValidUntil: process.env.VIPPASS_VALID_UNTIL || null,
    vipSpotsLeft: process.env.VIPPASS_SPOTS_LETF || "10",
    isProduction: process.env.IS_PRODUCTION === "true"
  };

  return <ReserveClient config={config} />;
}
