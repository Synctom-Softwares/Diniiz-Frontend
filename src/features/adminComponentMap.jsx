import React from 'react';

// Lazy wrapper
const lazy = (importFn) => React.lazy(importFn);

export const adminComponentMap = {
  dashboard: {
    label: "Dashboard",
    icon: "Category",
    roles: {
      super: lazy(() => import('../pages/admin/super/Dashboard')),
      tenant: lazy(() => import('../pages/admin/tenant/Dashboard')),
      location: lazy(() => import('../pages/admin/location/Dashboard')),
    },
  },
  tenants: {
    label: "Tenants",
    icon: "User",
    roles: {
      super: lazy(() => import('../pages/admin/super/Tenants')),
    },
  },
  chat: {
    label: "Chat",
    icon: "Chat",
    roles: {
      super: lazy(() => import('../pages/admin/super/Chat')),
      tenant: lazy(() => import('../pages/admin/tenant/Chat')),
    },
  },
  billing: {
    label: "Billing",
    icon: "Bag",
    roles: {
      super: lazy(() => import('../pages/admin/super/Billing')),
    },
  },
  report: {
    label: "Reports",
    icon: "Folder",
    roles: {
      super: lazy(() => import('../pages/admin/super/Report')),
      tenant: lazy(() => import('../pages/admin/tenant/Report')),
      location: lazy(() => import('../pages/admin/location/Report')),
    },
  },
  setting: {
    label: "Settings",
    icon: "Setting",
    roles: {
      super: lazy(() => import('../pages/admin/super/Setting')),
      tenant: lazy(() => import('../pages/admin/tenant/Setting')),
    },
  },
  booking: {
    label: "Booking",
    icon: "Category",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Booking')),
      location: lazy(() => import('../pages/admin/location/Booking')),
      staff: lazy(() => import('../pages/admin/staff/Booking')),
    },
  },
  'staff-manage': {
    label: "Manage Staff",
    icon: "Category",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/StaffManage')),
      location: lazy(() => import('../pages/admin/location/StaffManage')),
    },
  },
  location: {
    label: "Locations",
    icon: "Category",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Location')),
    },
  },
  api: {
    label: "API Keys",
    icon: "Category",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/Api')),
    },
  },
  'floor-plan': {
    label: "Floor Plan",
    icon: "Category",
    roles: {
      tenant: lazy(() => import('../pages/admin/tenant/FloorPlan')),
      location: lazy(() => import('../pages/admin/location/FloorPlan')),
      staff: lazy(() => import('../pages/admin/staff/FloorPlan')),
    },
  },
  'assign-staff': {
    label: "Assign Staff",
    icon: "Category",
    roles: {
      location: lazy(() => import('../pages/admin/location/AssignStaff')),
    },
  },
  'manage-event': {
    label: "Manage Events",
    icon: "Category",
    roles: {
      location: lazy(() => import('../pages/admin/location/ManageEvent')),
      staff: lazy(() => import('../pages/admin/staff/ManageEvent')),
    },
  },
  'guest-book': {
    label: "Guest Book",
    icon: "Category",
    roles: {
      location: lazy(() => import('../pages/admin/location/GuestBook')),
      staff: lazy(() => import('../pages/admin/staff/GuestBook')),
    },
  },
  logout: {
    label: "Logout",
    icon: "Logout",
    roles: {
      super: () => <div>Logout</div>,
      tenant: () => <div>Logout</div>,
      location: () => <div>Logout</div>,
      staff: () => <div>Logout</div>,
    },
  },
};
