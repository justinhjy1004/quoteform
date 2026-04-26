export const getToday = () => new Date().toISOString().split('T')[0];

export const getValidUntil = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
};

export function calculateMOT(price, citizenship) {
  // If the buyer is a foreigner, it's a flat 8%
  if (citizenship === "Malaysian") {
    return price * 0.08;
  }

  const mot = (0.01 * price) +
              (0.01 * Math.max(0, price - 100000)) +
              (0.01 * Math.max(0, price - 500000)) +
              (0.01 * Math.max(0, price - 1000000));

  return mot;
}