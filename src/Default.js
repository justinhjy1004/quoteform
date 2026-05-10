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
    option_name: "",
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
    password_hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    lead_info: { name: "", contact: "", citizenship: "Malaysian" },
    project_details: {
        project_name: "Netizen Residence", 
        developer: "KEB Group", 
        tenure: "Leasehold",
        unit_no: "", 
        facing: "", 
        layout_type: "Type A1 1+1B1R", 
        area_sqft: 540, 
        spa_price: 0, 
        car_park_lot: ""
    },
    legal_and_fees: {
        maintenance_fee_psf: 0.35, 
        maintenance_fee_total: 189, 
        included: [], 
        not_included: [],
        spa_legal: "not_included",
        spa_disbursement: "not_included",
        loan_agreement: "not_included",
        loan_disbursement: "not_included",
        loan_stamp_duty: "not_included"
    },
    agent: {
        name: "John", 
        phone_number: "+60123456789", 
        email: "John@gmail.com", 
        logo_url: "", 
        signature_url: ""
    },
    options: [{ ...defaultOption, option_name: "" }]
};

export const layoutData = {
        "E-Type A1 1+1B1R": { area: 540, psf: 0.35 },
        "E-Type B2 2B2R": { area: 653, psf: 0.35 },
        "E-Type C 2+1B2R": { area: 982, psf: 0.40 },
        "E-Type D 3+1B3R": { area: 1319, psf: 0.40 },
        "====================" : {},
        "R-Type A 1+1B1R":  { area: 556, psf: 0.33 },
        "R-Type B 2B2R":  { area: 737, psf: 0.33 },
        "R-Type C 3B2R":  { area: 858, psf: 0.33 },
        "R-Type D 3B3R":  { area: 916, psf: 0.33 },
        "R-Type E 4B3R":  { area: 1019, psf: 0.33 },
        "=====================" : {},
        "A-Type B 2B2R":  { area: 775, psf: 0.32 },
        "A-Type C 3B2R":  { area: 1022, psf: 0.32 },
        "A-Type D 4B3R":  { area: 1420, psf: 0.32 }
};