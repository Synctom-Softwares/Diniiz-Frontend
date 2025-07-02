
import Button from "../common/buttons/MainButton";
import ReservationSummary from "./ReservationSummary";

const ConfirmReservation = ({ data, onExit }) => {
    return (
        <div className="space-y-6">
            <p className="mb-3 text-sm text-textPrimary font-semibold">Thank you! Your reservation has been successfully  confirmed</p>


            <div className=" p-4 border-t-2 border-gray-300">
                <p className="mb-3 text-[16px] font-semibold text-textPrimary">Reservation Details</p>

                <ReservationSummary data={data} />

                <div className="flex justify-center">
                    <ul className="space-y-4 text-sm mt-5 text-left">
                    <li><strong>Name:</strong> {data.fullName}</li>
                    <li><strong>Email:</strong> {data.email}</li>
                    <li><strong>Phone no:</strong> {data.phone}</li>
                    <li><strong>ZIP Code:</strong> {data.zip}</li>
                </ul>
                </div>
            </div>

            <div>
                <p className="text-xs font-semibold">For cancelation or changes, please contact the restaurant directly.</p>
            </div>

            <div className="text-center flex justify-center">
                <Button onClick={onExit} className="px-4 bg-widgetColor">Exit</Button>
            </div>
        </div>
    );
};

export default ConfirmReservation;
