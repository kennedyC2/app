// Cache Data For Easy Access
// =======================================================================================

// Dependencies
import { domain } from "./helper";
import { set, createStore } from "idb-keyval";
import axios from "axios";

// Create Store
export const store = createStore("SIGMA", "PHN_Dev4450J");

export const get_data_2 = async (type, ID, token, admin) => {
    if (type && ID && token) {
        // Populate
        try {
            // Company Profile
            const company = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/profile",
                data: {},
            });

            set("company", company.data, store);

            // Hourly
            const hourly = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/hourly",
                data: {},
            });

            set("hourly", hourly.data, store);

            // lab Activities
            const lab_activities = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/lab_activities",
                data: {},
            });

            set("lab_activities", lab_activities.data, store);

            // Admin Activities
            const admin_activities = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/admin_activities",
                data: {},
            });

            set("admin", admin_activities.data, store);

            // Revenue
            const revenue = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/revenue",
                data: {},
            });

            set("revenue", revenue.data, store);

            // Services
            const services = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/services",
                data: {},
            });

            set("services", services.data, store);

            // Stats
            const stats = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/stats",
                data: {},
            });

            set("stats", stats.data, store);

            // Storage
            const storage = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/storage",
                data: {},
            });

            set("storage", storage.data, store);

            // TestKits
            const testKits = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/testKits",
                data: {},
            });

            set("testKits", testKits.data, store);

            // Test
            const tests = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/tests",
                data: {},
            });

            set("tests", tests.data, store);

            // Top 5
            const top_5 = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/top_5",
                data: {},
            });

            set("top_5", top_5.data, store);

            // Users
            const users = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                },
                url: domain + type + "/users",
                data: {},
            });

            set("users", users.data, store);

            // Personal Profile
            const personal = await axios({
                method: "GET",
                params: {
                    tokenID: token,
                    companyID: ID,
                    type: type,
                    admin: admin === "admin" ? true : false,
                },
                url: domain + "account/profile",
                data: {},
            });

            set("personal", personal.data, store);

            // Set Fetched
            set("fetched", { status: true, id: ID }, store);
        } catch (error) {
            console.warn();
        }
    }
};
