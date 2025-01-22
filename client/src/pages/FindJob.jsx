import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import axios from "axios";
import successToast from "../components/toasters/success-toast";
import VisitsList from "../components/ui/VisitsList";

const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState(null);

  const [job, setJob] = useState(null);

  const getJob = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/status?jobId=${searchTerm}`
      );

      if (response?.data?.status === "success") {
        successToast("Job found successfully!");
        setJob(response?.data?.data?.job);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-[90%] items-center justify-center flex">
      {job && (
        <VisitsList
          list={job?.visits}
          onClose={() => {
            setJob(null);
          }}
        />
      )}
      <div className="gap-2 h-[80px] p-2 bg-white border-[4px] border-black w-[400px] flex items-center">
        <input
          className="h-full p-2 border-none outline-none border-black  text-xl font-semibold w-full "
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div
            onClick={getJob}
            className="p-2 bg-black text-white cursor-pointer shrink-effect"
          >
            <MagnifyingGlass size={40} weight="bold" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;
