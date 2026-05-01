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
    return P * 0.04;
  }

  return mot;
}

export const formatNumber = (value) => {
  if (value === undefined || value === null || value === "") return "";
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const revertToNumeric = (e, onBlur, onChange) => {
  const rawString = e.target.value.replace(/,/g, '');

  // 1. Handle the empty state gracefully so users can delete the value
  if (rawString === '') {
    onChange(""); // Or pass 'null' depending on what your backend/schema expects
    onBlur(e);    // 2. Pass the event back to RHF!
    return;
  }

  // 3. Handle normal numeric parsing
  const finalVal = parseFloat(rawString);
  onChange(isNaN(finalVal) ? "" : finalVal); 
  
  // 4. Pass the event back to RHF!
  onBlur(e); 
}

export const parseNumber = (value) => {
  if (typeof value !== "string") return value;
  // Remove everything except digits and dots
  let clean = value.replace(/[^0-9.]/g, "");
  // Ensure only one decimal point exists
  const parts = clean.split(".");
  if (parts.length > 2) {
    clean = `${parts[0]}.${parts.slice(1).join("")}`;
  }
  return clean;
};

export const getNumeric = (value) => {
  value = parseNumber(value);
  value = parseFloat(value);
  return value;
};  

export function calculateMonthlyInstalment(spaPrice, annualRate, loanTenure) {
    const monthlyRate = annualRate / 12;
    const totalPayments = loanTenure * 12;

    // To prevent division by zero if interest rate is 0
    if (monthlyRate === 0) return (spaPrice / totalPayments).toFixed(2);

    // Formula: [r * (1 + r)^n] / [(1 + r)^n - 1] * P
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    
    const monthlyInstalment = spaPrice * (numerator / denominator);

    return parseFloat(monthlyInstalment.toFixed(2));
}