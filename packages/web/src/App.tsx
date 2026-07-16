import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ParentApp from "./pages/ParentApp";
import BillCenter from "./pages/BillCenter";
import DocumentVault from "./pages/DocumentVault";
import MFAHub from "./pages/MFAHub";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/bills" element={<BillCenter />} />
      <Route path="/dashboard/vault" element={<DocumentVault />} />
      <Route path="/dashboard/mfa" element={<MFAHub />} />
      <Route path="/parent" element={<ParentApp />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
