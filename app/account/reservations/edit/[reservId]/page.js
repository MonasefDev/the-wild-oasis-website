import ReservationEditForm from "@/app/_components/ReservationEditForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const currentBooking = await getBooking(bookingId);
  const currentCabin = await getCabin(currentBooking.cabinId);

  const maxCapacity = currentCabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <ReservationEditForm
        bookingId={bookingId}
        maxCapacity={maxCapacity}
        observations={currentBooking.observations}
      />
    </div>
  );
}
