"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/custom/Loader/Loader";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
