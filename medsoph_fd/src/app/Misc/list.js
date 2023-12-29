// Import Dependencies
// import { month, date } from "./helper";

// One Layer Nesting
// ========================================================
export const one_layer = (obj) => {
    let count = 0;
    let file = [];
    for (const prop in obj) {
        if (count < 4) {
            file.push(obj[prop]["details"]);
        }

        count++;
    }

    return file;
};

// Two Layer Nesting
// ========================================================
export const two_layer = (obj, add) => {
    let count = 0;
    let file = [];
    const data = Object.keys(obj).pop();

    if (add) {
        for (const prop in obj[data]) {
            if (count < 5) {
                file.push(obj[data][prop]);
            }

            count++;
        }

        return file;
    }

    for (const prop in obj[data]) {
        if (count < 4) {
            file.push(obj[data][prop]);
        }

        count++;
    }

    return file;
};
