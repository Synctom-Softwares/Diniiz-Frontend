import React from 'react';

// Lazy wrapper
const lazy = (importFn) => React.lazy(importFn);

export const adminComponentMap = {
  dashboard: {
    label: "Dashboard",
    roles: {
      super: lazy(() => import('../pages/admin/super/Dashboard')),
      tenant: lazy(() => import('../pages/admin/tenant/Dashboard')),
      location: lazy(() => import('../pages/admin/location/Dashboard')),
    },
  },
  tenants: {
    label: "Tenants",
    roles: {
      super: lazy(() => import('../pages/admin/super/Tenants')),
    },
  },
  chat: {
    label: "Chat",
    roles: {
      super: lazy(() => import('../pages/admin/super/Chat')),
      tenant: lazy(() => import('../pages/admin/tenant/Chat')),
    },
  },
  billing: {
    label: "Billing",
    roles: {
      super: lazy(() => import('../pages/admin/super/Billing')),
    },
  },
  report: {
    label: "Reports",
    roles: {
      super: lazy(() => import('../pages/admin/super/Report')),
      tenant: lazy(() => import('../pages/admin/tenant/Report')),
      location: lazy(() => import('../pages/admin/location/Report')),
    },
  },
  setting: {
    label: "Settings",
    roles: {
      super: lazy(() => import('../pages/admin/super/Setting')),
      tenant: lazy(() => import('../pages/admin/tenant/Setting')),
    },
  },
  booking: {
    label: "Booking",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Booking')),
      location: lazy(() => import('../pages/admin/location/Booking')),
      staff: lazy(() => import('../pages/admin/staff/Booking')),
    },
  },
  'staff-manage': {
    label: "Manage Staff",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/StaffManage')),
      location: lazy(() => import('../pages/admin/location/StaffManage')),
    },
  },
  location: {
    label: "Locations",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Location')),
    },
  },
  api: {
    label: "API Keys",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Api')),
    },
  },
  'floor-plan': {
    label: "Floor Plan",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/FloorPlan')),
      location: lazy(() => import('../pages/admin/location/FloorPlan')),
      staff: lazy(() => import('../pages/admin/staff/FloorPlan')),
    },
  },
  'assign-staff': {
    label: "Assign Staff",
    roles: {
      location: lazy(() => import('../pages/admin/location/AssignStaff')),
    },
  },
  'manage-event': {
    label: "Manage Events",
    roles: {
      location: lazy(() => import('../pages/admin/location/ManageEvent')),
      staff: lazy(() => import('../pages/admin/staff/ManageEvent')),
    },
  },
  'guest-book': {
    label: "Guest Book",
    roles: {
      location: lazy(() => import('../pages/admin/location/GuestBook')),
      staff: lazy(() => import('../pages/admin/staff/GuestBook')),
    },
  },
  logout: {
    label: "Logout",
    roles: {
      super: () => <div>Logout</div>,
      tenant: () => <div>Logout</div>,
      location: () => <div>Logout</div>,
      staff: () => <div>Logout</div>,
    },
  },
};
