import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth/authSlice';
import planSlice from "../slices/plan/planSlice";
import tenantSlice from "../slices/super-admin/tenants/tenantSlice"



const store = configureStore({
    reducer: {
        auth: authSlice,
        plan: planSlice,
        tenants: tenantSlice
    }
});

export default store;