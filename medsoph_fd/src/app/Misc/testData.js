// Initial State
const testData = {
    Clinical_Chemistry: {
        name: "chempath",
        class: {
            Blood_Sugar: ["Fasting_Blood_Sugar_(FBS)", "Random_Blood_Sugar_(RBS)", "Oral_Glucose_Tolerance_Test_(OGTT)"],
            Lipid_Profile: ["Total_Cholesterol", "Low_density_Lipoprotein_(LDL)", "High_density_Lipoprotein_(HDL)", "Triglycerides"],
            Blood_Chemistry: ["Sodium", "Potassium", "Chloride", "Bicarbonate", "Calcium", "Phosphate", "Magnesium", "Blood_Urea_Nitrogen_(BUN)", "Uric_Acid", "Amylase", "Serum_Creatinine", "Glucose-6-Phosphate_Dehydrogenase_(G6PD)"],
            Cardiac_Enzymes: ["Creatinine_phosphokinase_(CPK)", "Creatinine_phosphokinase_MB_(CPK-MB)", "Myoglobin", "Ischemia_Modified_Albumin_(IMA)", "Atrial_Natriuretic_Peptide_(ANP)", "C_Reactive_Protein_(CRP)", "Homocysteine", "Troponin"],
            Liver_Function_Test: ["Albumin", "Total_Protein", "Albumin-Globulin_Ratio_(A/G)", "Alkaline_Phosphatase_(ALP)", "Alanine_Transaminase_(ALT)", "Aspartate_Aminotransferase_(AST)", "Gamma_Glutamyl_Transferase_(GGT)", "Total Bilirubin", "Direct Bilirubin", "Lactate_Dehydrogenase_(LDH)", "Prothrombin_Time(PT)", "5_Nucleotidase_(5NT)", "Globulin"],
            Urinalysis: ["Appearance", "Specific_Gravity", "Acidity_(PH)", "Glucose", "Protein", "Ascorbic_Acid", "Ketone", "Nitrite", "Bilirubin", "Urobilinogen", "Blood"],
            Basic_Metabolic_Panel: ["Calcium", "Glucose", "Sodium", "Potassium", "Bicarbonate", "Chloride", "Blood_Urea_Nitrogen", "Serum_Creatinine"],
            Comprehensive_Metabolic_Panel: ["Calcium", "Glucose", "Sodium", "Potassium", "Bicarbonate", "Chloride", "Blood_Urea_Nitrogen", "Serum_Creatinine", "Albumin", "Total_Protein", "Alkaline_Phosphatase_(ALP)", "Alanine_Transaminase_(ALT)", "Aspartate_Aminotransferase_(AST)", "Bilirubin"],
        },
        // class: ["Fasting_Blood_Sugar_(FBS)", "Random_Blood_Sugar_(RBS)", "Oral_Glucose_Tolerance_Test_(OGTT)", "Liver_Function_Test", "Lipid_Profile", "Renal_Function_Test", "HBA1C", "C_Peptide", "Thyroid_Function_Test"],
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    Hematology: {
        name: "heme",
        // class: ["Activated_Partial_Thromboplastin_Time_(APTT)", "Full_Blood_Count_(FBC)", "Peripheral_Blood_Film", "Erythrocyte_Sedimentation_Rate_(ESR)", "Prothrombin_Time_and_INR_(PT/INR)", "Genotype", "Blood_Group", "D_Dimer", "Hemoglobin_(HB)", "Packed_Cell_Volume_(PCV)", "COOMB'S_Test_(Direct)", "COOMB'S_Test_(Indirect)"],
        class: {},
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    Serology: {
        name: "sero",
        // class: ["Hepatitis_B_Antigen_(HBsAg)", "Hepatitis_C_Antigen_(antiHCV)", "HIV_Screening_(RVS)", "ASO_Titre_(Quantitative)", "ASO_Titre_(Qualitative)", "Hepatitis_B_Panel", "Hepatitis_B_Viral_Load", "Hepatitis_C_Viral_Load", "H._Pylori_(Blood)", "Packed_Cell_Volume_(PCV)", "CD4_Count", "COOMB'S_Test_(Direct)", "COOMB'S_Test_(Indirect)"],
        class: {},
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    // Histology_Cytology: {
    //     name: "histo",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Immunology: {
    //     name: "immune",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    Microbiology: {
        name: "micro",
        class: {
            Urine_Microscopy: ["White_Blood_Cells", "Red_Blood_Cells", "Casts", "Crystals", "Yeast_Cells", "Bacteria", "Parasite"],
        },
        // class: ["Urinalysis", "Urine_MCS", "Feacal_Occult_Blood_(FOBT)", "Stool_Analysis", "Stool_MCS", "H._Pylori_(Stool)", "Malaria_Parasite_(MP)"],
        // class: {},
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    Hormonal_Assay: {
        name: "hom",
        class: {},
        // class: ["Follicle_Stimulating_Hormone_(FSH)", "Luteinizing_Hormone_(LH)", "Progesterone", "Prolactin", "Prostate_Specific_Antigen_(PSA)", "Thyroid_Stimulating_Hormone_(TSH)", "Testosterone", "Free_T3", "Free_T4", "Human_Chorionic_Gonadotropin_(B.HCG)", "Serum_Cortisol", "Estradiol", "Growth_Hormone_(GH)", "Parathyroid_Hormone_(PTH)", "Hormone_Profile_(Male)", "Hormone_Profile_(Female)"],
        unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    },

    // "Digital_X-Ray": {
    //     name: "xray",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Ultrasonography: {
    //     name: "ultra",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // "Magnetic_Resonance_Imaging_(MRI)": {
    //     name: "mri",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // "Computerized Tomography (CT)": {
    //     name: "ct",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Cardiology: {
    //     name: "cardio",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },

    // Breast_Clinic: {
    //     name: "breast",
    //     class: {},
    //     unit: ["mmol/L", "mg/dL", "g/dL", "g/L"],
    // },
};

export default testData;
