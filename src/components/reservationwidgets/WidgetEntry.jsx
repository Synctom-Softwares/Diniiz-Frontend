
import { useState } from "react";
import WidgetFAB from "./WidgetFAB";
import ReservationWidgetModal from "./ReservationWidgetModal";
import ReservationWidgetWrapper from "./ReservationWidgetWrapper";

const WidgetEntry = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WidgetFAB onClick={() => setIsOpen((prev) => !prev)} />
      <ReservationWidgetModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ReservationWidgetWrapper />
      </ReservationWidgetModal>
    </>
  );
};

export default WidgetEntry;
