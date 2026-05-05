// 1. Define helper functions first
export const getToday = () => new Date().toISOString().split('T')[0];

export const getValidUntil = () => {
    const date = new Date();
    date.setDate(date.getDate() + NumDaysValid);
    return date.toISOString().split('T')[0];
};
const NumDaysValid = 30;

// 2. Define the small building blocks
export const defaultOption = {
    option_name: "New Option",
    rebate: 0, 
    cashback: 0, 
    cashback_type: "Cash Out",
    down_payment: 0, 
    nett_price: 0, 
    loan_amount: 0, 
    interest_rate: 4.0, 
    monthly_instalment: 0,
    other_discounts: [],
    furnishing: {
        kitchen_cabinet: false, 
        hood_and_hob: false, 
        fridge: false, 
        toilet: false, 
        heater: false, 
        shower_screen: false,
        washing_machine_qty: 0, 
        airconds_qty: 0, 
        wardrobe_qty: 0, 
        bed_set_qty: 0,
        additional_items: []
    }
};

// 3. Define the main object last
export const defaultValues = {
    appointment_date: getToday(), // Now this works!
    quotation_validity: getValidUntil(),
    lead_info: { name: "", contact: "", citizenship: "Malaysian" },
    project_details: {
        project_name: "Skyline Residences", 
        developer: "Apex Development Group", 
        tenure: "Freehold",
        unit_no: "", 
        facing: "", 
        layout_type: "Type A 2R1B", 
        area_sqft: 850, 
        spa_price: 0, 
        car_park_lot: ""
    },
    legal_and_fees: {
        maintenance_fee_psf: 0.35, 
        maintenance_fee_total: 297.5, 
        included: [], 
        not_included: [],
        spa_legal: "not_included",
        spa_disbursement: "not_included",
        loan_agreement: "not_included",
        loan_disbursement: "not_included",
        loan_stamp_duty: "not_included"
    },
    agent: {
        name: "Sarah Jenkins", 
        phone_number: "+60123456789", 
        email: "sarah@apex.com", 
        logo_url: "", 
        signature_url: ""
    },
    options: [{ ...defaultOption, option_name: "Option 1" }]
};

export const layoutData = {
        "Type A 2R1B": { area: 850, psf: 0.35 },
        "Type B 2+1R2B": { area: 1000, psf: 0.35 },
        "Type C 3R2B": { area: 1200, psf: 0.40 }
};