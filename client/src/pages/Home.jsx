import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-[90%] items-center justify-center flex">
      <div className="flex items-center justify-center w-full h-full xl:w-1/2 md:w-2/3 max-md:w-[90%] flex-col gap-4 slight-up">
        <p className="text-4xl font-bold">Retail Pulse</p>
        <p className="text-center text-lg font-semibold text-gray-500">
          RetailPulse Image Processor is a Node.js-based microservice designed
          to process and analyze images collected from retail stores. It handles
          job submissions, calculates image dimensions, and provides real-time
          job status updates via REST APIs. The service is optimized for
          scalability and can be deployed using Docker or run locally.
        </p>

        <div className="flex gap-4">
          <Link
            to={"/jobs/submit"}
            className="w-[160px] bg-black text-white font-semibold p-3 border-[4px] border-black text-lg shrink-effect"
          >
            Submit A Job
          </Link>
          <Link
            to={"/jobs"}
            className="w-[160px] hover:bg-black hover:text-white font-semibold p-3 border-[4px] border-black text-lg shrink-effect flex gap-2 items-center justify-center"
          >
            See Jobs
            <ArrowUpRight size={32} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
