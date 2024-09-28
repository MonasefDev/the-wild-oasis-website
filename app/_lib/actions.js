"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

//! behind the scene this create a POST request for us
export async function updateGuestAction(guest) {
  const session = await auth();
  if (!session) throw new Error("you must be loged in");

  const nationalID = guest.get("nationalID");
  const [nationality, countryFlag] = guest.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updatedProfile = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { data, error } = await updateGuest(
    session.user.guestId,
    updatedProfile
  );
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be loged in");
  //! if any guest copy the cURL he will be unable to delete the booking, so to fix that we test if the guest is the owner of the booking.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("you are not authorized to delete this reservation");
  const data = await deleteBooking(bookingId);
  revalidatePath("account/reservations");
}

export async function updateBookingAction(formData) {
  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedFields = { numGuests, observations };
  const session = await auth();
  if (!session) throw new Error("you must be loged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error("you are not authorized to update this reservation");
  const { data, error } = await updateBooking(bookingId, updatedFields);
  if (error) throw new Error(error.message);
  console.log(`account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
