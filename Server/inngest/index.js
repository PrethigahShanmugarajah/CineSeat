// CineSeat / Server / inngest / index.js
import { Inngest } from "inngest";
import User from "../models/User.js";

/* -------- CREATE A CLIENT TO SEND AND RECEIVE EVENTS -------- */
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/* -------- INNGEST FUNCTION TO SAVE USER DATA TO DATABASE -------- */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + "" + last_name,
      image: image_url,
    };

    await User.create(userData);
  }
);

/* -------- INNGEST FUNCTION TO DELETE USER FROM DATABASE -------- */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
  }
);

/* -------- INNGEST FUNCTION TO UPDATE USER FROM DATABASE -------- */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + "" + last_name,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData);
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
