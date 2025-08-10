"use client";

import { ClientsPage } from "@/components/pages/clients";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <ClientsPage />
    </Provider>
  );
}
