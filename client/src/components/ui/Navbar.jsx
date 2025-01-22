import { HouseLine } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
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
    </>
  );
};

export default Navbar;
