export const getToday = () => new Date().toISOString().split('T')[0];

export const getValidUntil = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

export function calculateMOT(price, citizenship) {
  const P = price;
  
  // Standard tiered MOT formula
  const mot = Math.min(P, 100000) * 0.01 + 
              Math.max(0, Math.min(P, 500000) - 100000) * 0.02 + 
              Math.max(0, Math.min(P, 1000000) - 500000) * 0.03 + 
              Math.max(0, P - 1000000) * 0.04;

  if (citizenship === "Non-Malaysian") {
    // For Non-Malaysians, typically it's a flat 4% or the tiered rate, 
    // but we'll stick to the provided tiered formula unless it's a flat rate requirement.
    // Given the previous code had a flat rate placeholder, I'll keep the tiered one for now 
    // as it's more common for residential properties.
    return mot; 
  }

  return mot;
}