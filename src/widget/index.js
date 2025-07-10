import React from 'react';
import ReactDOM from 'react-dom/client';
import ReservationWidgetWrapper from '../components/reservationWidgets/ReservationWidgetWrapper';

export const initWidget = (locationId, mountId = 'diniiz-widget') => {
  const mountElement = document.getElementById(mountId);
  if (!mountElement) {
    console.error('Diniiz widget mount point not found!');
    return;
  }

  ReactDOM.createRoot(mountElement).render(
    <React.StrictMode>
      <ReservationWidgetWrapper locationId={locationId} />
    </React.StrictMode>
  );
};
