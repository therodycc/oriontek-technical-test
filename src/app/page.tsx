"use client";
import { Header } from "@/components/layout/Header";
import { ClientsPage } from "@/components/pages/clients";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />
          <ClientsPage />
        </div>
      </div>
    </Provider>
  );
}
