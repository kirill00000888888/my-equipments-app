import React from "react";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Оборудование</h1>
      </header>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
