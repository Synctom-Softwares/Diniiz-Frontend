
import { useState } from "react";
import Button from "../common/buttons/MainButton";
import Input from "../common/Input";
import NotifyMeButton from "../common/buttons/NotifyMeButtons";
import ReservationSummary from "./ReservationSummary";

const EnterDetails = ({ data, update, onNext, onPrevious }) => {
    const [notify, setNotify] = useState(data.notify || false);

    const handleToggleNotify = () => {
        setNotify((prev) => {
            update("notify", !prev);
            return !prev;
        });
    };

    return (
        <div className="space-y-4">

            <ReservationSummary data={data}/>

            <h2 className="text-lg text-textPrimary font-semibold text-center">Enter Your Details</h2>

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
                <Input
                    placeholder= "Full Name"
                    value={data?.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                />
                <Input
                    placeholder="Phone Number"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                />
                <Input
                    placeholder="ZIP Code"
                    value={data.zip}
                    onChange={(e) => update("zip", e.target.value)}
                />
            </div>

            <div className="flex justify-center">
                <NotifyMeButton isEnabled={notify} onToggle={handleToggleNotify} />
            </div>

            {/* Continue Button */}
            <div className="text-center pt-2 flex justify-end gap-2">
                <Button onClick={onPrevious} className="px-4 bg-textSecondary">Back</Button>
                <Button onClick={onNext} className="px-4 bg-widgetColor">Next</Button>
            </div>
        </div>
    );
};

export default EnterDetails;
