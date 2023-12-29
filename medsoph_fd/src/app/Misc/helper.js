export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const hours = ["12:am", "1:am", "2:am", "3:am", "4:am", "5:am", "6:am", "7:am", "8:am", "9:am", "10:am", "11:am", "12:pm", "1:pm", "2:pm", "3:pm", "4:pm", "5:pm", "6:pm", "7:pm", "8:pm", "9:pm", "10:pm", "11:pm"];
const today = new Date(Date.now());

// Seconds
export const seconds = today.getSeconds();

// Minutes
export const minutes = today.getMinutes();

// Hour in number
export const hour = today.getHours();

// Hour in string
export const hoursInString = hours[today.getHours()];

// Date
export const date = today.getDate();

// Day
export const day = days[today.getDay()];

// Month in number
export const monthNum = today.getMonth();

// Month in words
export const month = months[today.getMonth()];

// Year
export const year = today.getFullYear();

// Registration Form Date Of Birth Helper
export const CalenderYear = () => {
    let data = [];
    for (var i = Math.round(year) - 100 + (2000 - year); i < year + 1; i++) {
        data.push(i);
    }
    return data;
};

export const RF_days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

// Specimen
export const specimen = ["Blood", "Urine", "Sputum", "Faeces", "Saliva", "Swab", "Tissue", "CSF", "Semen", "Plasma", "Serum"];

// Religion
export const religion = ["Christian", "Muslim", "Judaism", "Hindi", "Traditional", "other"];

// Sex
export const sex = ["Male", "Female"];

// Tribe
export const tribe = ["Igbo", "Yoruba", "Hausa", "Tiv", "Efik", "Fulani"];

// 36 States
export const states = ["Abia State", "Adamawa State", "Akwa Ibom State", "Anambra State", "Bauchi State", "Bayelsa State", "Benue State", "Borno State", "Cross River State", "Delta State", "Ebonyi State", "Edo State", "Ekiti State", "Enugu State", "Gombe State", "Imo State", "Jigawa State", "Kaduna State", "Kano State", "Katsina State", "Kebbi State", "Kogi State", "Kwara State", "Lagos State", "Nasarawa State", "Niger State", "Ogun State", "Ondo State", "Osun State", "Oyo State", "Plateau State", "Rivers State", "Sokoto State", "Taraba State", "Yobe State", "Zamfara State"];

// Domain
// export const domain = "https://medsoph.xyz/";
// export const domain = "http://localhost:5000/";
export const domain = "/api/";
