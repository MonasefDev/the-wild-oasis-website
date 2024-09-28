"use client";
import { updateBookingAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import { useFormStatus } from "react-dom";

function ReservationEditForm({ bookingId, maxCapacity, observations }) {
  return (
    <form
      action={updateBookingAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={maxCapacity}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>
      <input
        type="hidden"
        name="bookingId"
        value={bookingId}
        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
      />

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          id="observations"
          defaultValue={observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

const Button = () => {
  const { pending: isUpdating } = useFormStatus();

  return (
    <button
      disabled={isUpdating}
      className="bg-accent-500 px-8 py-4 min-w-[200px] flex items-center justify-center text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {isUpdating ? <SpinnerMini /> : "Update reservation"}
    </button>
  );
};

export default ReservationEditForm;
