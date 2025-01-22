import { Link, Route, Routes } from "react-router-dom";
import "./assets/styles/animations.css";
import "./assets/styles/click-effects.css";
import Home from "./pages/Home";
import Job from "./pages/Job";
import NotFound from "./pages/NotFound";
import Navbar from "./components/ui/Navbar";
import Updates from "./components/ui/Updates";

export default function App() {
  return (
    <h1 className="flex flex-col h-screen relative">
      <div className="flex items-center justify-between z-40 border-b h-[10vh]">
        <Navbar />
      </div>
      <Updates />
      <div className="h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/*" element={<Job />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </h1>
  );
}
