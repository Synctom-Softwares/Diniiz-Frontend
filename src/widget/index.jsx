import React from 'react';
import ReactDOM from 'react-dom/client';
import WidgetEntry from '../components/reservationwidgets/WidgetEntry';

export const initWidget = (locationId, mountId = 'diniiz-widget') => {
  const mountElement = document.getElementById(mountId);
  if (!mountElement) {
    console.error('Diniiz widget mount point not found!');
    return;
  }

  ReactDOM.createRoot(mountElement).render(
    <React.StrictMode>
      <WidgetEntry locationId={locationId} />
    </React.StrictMode>
  );
};
