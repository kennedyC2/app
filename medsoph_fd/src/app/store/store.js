// Import dependencies
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import testData from "./../Misc/testData";

const InitialState = {
    personal: {
        firstname: "",
        lastname: "",
        other: "",
        sex: "",
        day: "",
        month: "",
        year: "",
        time: "",
        date: "",
        phone: "",
        email: "",
        password: "",
        state: "",
        country: "",
        company: {},
        display: "default.png",
        account: "",
        verified: false,
        fetched: false
    },
    company: {
        hourly: {},
        lab_activities: {},
        admin: {},
        revenue: {},
        services: {},
        stats: {},
        storage: {},
        testKits: {},
        tests: {},
        top_5: {},
        users: [],
        fetched: false,
    },
    testData: testData
};

const appReducer = (state = InitialState, action) => {
    switch (action.type) {
        // Toggle Fetched
        // ====================================================================================================================
        case "toggle": {
            return {
                ...state,
                fetch: false,
            };
        }

        // Personal Profile
        // ====================================================================================================================
        case "personal": {
            return {
                ...state,
                personal: action.payload,
            };
        }

        // Company Profile
        // ====================================================================================================================
        case "company": {
            return {
                ...state,
                company: action.payload,
            };
        }

        // home
        // ====================================================================================================================
        case "login": {
            return {
                ...state,
                personal: action.payload.user,
                company: action.payload.company,
            };
        }

        // Full Profile
        // ====================================================================================================================
        case "full_acct": {
            const data = state.personal;
            data["company"] = action.payload.company

            return {
                ...state,
                personal: data,
                company: action.payload.companyD
            };
        }

        // Verified
        // ====================================================================================================================
        case "verify": {
            const data = {};
            data["personal"] = state.personal;
            data["personal"]["verified"] = true

            return {
                ...state,
                personal: data,
            };
        }

        // Services
        // ====================================================================================================================
        case "addServices": {
            const services = action.payload.services;
            const stats = action.payload.stats;
            const top_5 = action.payload.top_5;

            return {
                ...state,
                services: { ...services },
                stats: { ...stats },
                top_5: { ...top_5 },
            };
        }

        // Booking A TEst
        // ====================================================================================================================
        case "bookTest": {
            // Get Tests
            const test = state.tests;

            // VAr
            const unsettled = action.payload.unsettled;
            const stats = action.payload.stats;
            const activity = action.payload.lab_activities;
            const hourly = action.payload.hourly;
            const top_5 = action.payload.top_5;
            const storage = action.payload.storage;
            const revenue = action.payload.revenue;

            // Update Tests
            test.unsettled = unsettled;

            if (action.payload.admin !== undefined) {
                const admin = action.payload.admin;

                // Upload
                return {
                    ...state,
                    test: { ...test },
                    stats: { ...stats },
                    lab_activities: { ...activity },
                    hourly: { ...hourly },
                    storage: { ...storage },
                    top_5: { ...top_5 },
                    revenue: { ...revenue },
                    admin: { ...admin },
                };
            }

            const user = action.payload.user;

            // Upload
            return {
                ...state,
                test: { ...test },
                stats: { ...stats },
                lab_activities: { ...activity },
                hourly: { ...hourly },
                storage: { ...storage },
                top_5: { ...top_5 },
                revenue: { ...revenue },
                users: { ...user },
            };
        }

        // Pending Tests
        // ====================================================================================================================
        case "incomplete_Result": {
            // Previous Data
            const test = state.tests;
            test.unsettled = action.payload;

            // Upload
            return {
                ...state,
                tests: { ...test },
            };
        }

        // Completed Tests
        // ====================================================================================================================
        case "complete_Result": {
            // test Previous Data
            const test = action.payload.tests;
            const storage = action.payload.storage;
            const stats = action.payload.stats;

            // Upload
            return {
                ...state,
                tests: { ...test },
                storage: { ...storage },
                stats: { ...stats },
            };
        }

        // Add New User
        // ====================================================================================================================
        case "addUser": {
            // Previous Data
            const users = state.users;
            const stats = state.stats;
            stats.employees += 1;

            // Update
            users[action.payload.user.details.email.split("@")[0]] = action.payload.user;

            // Upload
            return {
                ...state,
                users: { ...users },
                stats: { ...stats },
            };
        }

        // Add New Kit
        // ====================================================================================================================
        case "addKit": {
            // kit Previous Data
            const testKits = action.payload.testKits;
            const storage = action.payload.storage;
            const services = action.payload.services;

            // Upload
            return {
                ...state,
                testKits: { ...testKits },
                storage: { ...storage },
                services: { ...services },
            };
        }

        // ====================================================================================================================
        case "profile": {
            // Profile Data
            const data = action.payload;

            // Upload
            return {
                ...state,
                personal: { ...data },
            };
        }

        // Default
        // ====================================================================================================================
        default: {
            return state;
        }
    }
};

//  Create Store
const store = configureStore({ reducer: appReducer, middleware: [thunk] });

export default store;



