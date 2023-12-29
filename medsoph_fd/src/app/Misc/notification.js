// Import Dependencies
import { Modal } from "bootstrap";

// Component A
export const Notification_A = (message, success, notify = "notify") => {
    // Notification Bar
    const notificationPane = document.querySelector("div." + notify);
    const class_1 = success === true ? "text-success" : "text-danger";

    // Notify
    notificationPane.classList.add("text-uppercase", class_1);
    notificationPane.innerText = message || "Something Went Wrong, Please Try Again Later";

    setTimeout(() => {
        // Hide
        notificationPane.classList.remove("text-uppercase", class_1);
        notificationPane.innerText = "";
    }, 2000);
};

// Component B
export const Notification_B = (message, success) => {
    // Notification
    const notification = new Modal(document.getElementById("notificationPane"));
    const body = document.querySelector("body");
    const div = document.querySelector("div#notificationPane div.modal-body");
    const class_1 = success === true ? "text-success" : "text-danger";
    div.classList.remove("text-success", "text-danger");
    div.innerHTML = message;
    div.classList.add("text-uppercase", class_1);
    body.classList.add("notif");
    notification.show();

    setTimeout(() => {
        notification.hide();
        body.classList.remove("notif");
    }, 1500);
};
