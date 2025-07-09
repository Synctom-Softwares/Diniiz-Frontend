import { useState } from "react";
import Button from "../common/buttons/MainButton";
import Input from "../common/Input";
import NotifyMeButton from "../common/buttons/NotifyMeButtons";
import ReservationSummary from "./ReservationSummary";

const EnterDetails = ({ data, update, onNext, onPrevious }) => {
    const [notify, setNotify] = useState(data.notify || false);
    const [error, setError] = useState("");

    const handleToggleNotify = () => {
        setNotify((prev) => {
            update("notify", !prev);
            return !prev;
        });
    };

    const handleNext = () => {
        if (
            !data.fullName?.trim() ||
            !data.email?.trim() ||
            !data.phone?.trim() ||
            !data.zip?.trim()
        ) {
            setError("Please fill out all required fields.");
            return;
        }

        setError("");
        onNext();
    };

    return (
        <div className="space-y-4">

            <ReservationSummary data={data} />

            <h2 className="text-lg text-textPrimary font-semibold text-center">
                Enter Your Details
            </h2>

            {/* Error Message */}
            {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
                <Input
                    placeholder="Full Name"
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

            {/* Notify Me Toggle */}
            <div className="flex justify-center">
                <NotifyMeButton isEnabled={notify} onToggle={handleToggleNotify} />
            </div>

            {/* Navigation Buttons */}
            <div className="text-center pt-2 flex justify-end gap-2">
                <Button onClick={onPrevious} className="px-4 bg-textSecondary">
                    Back
                </Button>
                <Button onClick={handleNext} className="px-4 bg-widgetColor">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default EnterDetails;
