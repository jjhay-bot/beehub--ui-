import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import formSlice from "./form/form-slice";
import uiSlice from "./ui/ui-slice";
import vendorSlice from "./vendors/vendor-slice";
import simulationSlice from "./simulation/simulation-slice";
import warehouseSlice from "./warehouse/warehouse-slice";
import skuSlice from "./sku/sku-slice";
import datatableSlice from "./datatable/datatable-slice";
import forecastSlice from "./forecast/forecast-slice";
import market_placeSlice from "./market_place/market_place-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    form: formSlice,
    datatable: datatableSlice,
    ui: uiSlice,
    vendor: vendorSlice,
    warehouse: warehouseSlice,
    simulation: simulationSlice,
    forecast: forecastSlice,
    sku: skuSlice,
    market_place: market_placeSlice,
  },
});

export default store;
