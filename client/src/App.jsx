import { Link, Route, Routes } from "react-router-dom";
import "./assets/styles/animations.css";
import "./assets/styles/click-effects.css";
import Home from "./pages/Home";
import Job from "./pages/Job";
import NotFound from "./pages/NotFound";
import { HouseLine } from "@phosphor-icons/react";

export default function App() {
  return (
    <h1 className="flex flex-col h-screen">
      <div className="flex items-center justify-between border-b h-[10vh]">
        <div className="flex gap-2 pl-4 flex-col">
          <Link to="/" className="text-3xl font-semibold shrink-effect">
            <HouseLine size={32} weight="fill" />
          </Link>
        </div>
        <div className="flex gap-2 h-full">
          <Link
            to={"/jobs"}
            className="p-4 h-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-xl font-semibold flex items-center justify-center shrink-effect"
          >
            All Jobs
          </Link>
          <Link
            to={"/jobs/find"}
            className="p-4 h-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-xl font-semibold flex items-center justify-center shrink-effect"
          >
            Find Job
          </Link>
          <Link
            to={"/jobs/submit"}
            className="p-4 h-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-xl font-semibold flex items-center justify-center shrink-effect"
          >
            Submit Job
          </Link>
        </div>
      </div>
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
