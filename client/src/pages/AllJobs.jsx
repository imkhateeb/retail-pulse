import { useEffect, useState } from "react";
import axios from "axios";
import successToast from "../components/toasters/success-toast";
import JobStatus from "../components/ui/JobStatus";
import { Eye } from "@phosphor-icons/react";
import convertTo12HourFormat from "../utils/convertTo12HourFormat";
import VisitsList from "../components/ui/VisitsList";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVistList, setShowVistList] = useState(false);

  const getAllJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/jobs`);

      if (response.data?.status === "success") {
        successToast(response?.data?.message);
        setJobs(response.data?.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  console.log(jobs);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full h-full p-4 max-sm:p-2 xl:w-[90%] mx-auto">
      {showVistList?.length > 0 && (
        <VisitsList
          list={showVistList}
          onClose={() => {
            setShowVistList(false);
          }}
        />
      )}
      <div className="h-full w-full flex flex-col">
        <p className="text-2xl font-semibold">All Jobs</p>
        <div className="mt-4 h-full">
          {jobs?.jobs?.length > 0 ? (
            <div className="flex flex-col gap-4 overflow-x-auto">
              <div className="flex gap-4">
                <p className="w-[180px] text-lg font-semibold">Job ID</p>
                <p className="w-[150px] text-lg font-semibold">Status</p>
                <p className="w-[150px] text-lg font-semibold text-center">
                  Total Visits
                </p>
                <p className="w-[150px] text-lg font-semibold text-center">
                  Visits
                </p>
                <p className="w-[150px] text-lg font-semibold text-center">
                  Entry Time
                </p>
                <p className="w-[150px] text-lg font-semibold text-center">
                  Completion Time
                </p>
              </div>
              {jobs?.jobs?.map((job) => (
                <div key={job?._id} className="flex gap-4">
                  <p className="w-[180px] text-lg">{job?.jobId || "N/A"}</p>
                  <p className="w-[150px] text-lg">
                    <JobStatus status={job?.status} />
                  </p>
                  <p className="w-[150px] text-lg text-center">
                    {job?.count || 0}
                  </p>
                  <p className="w-[150px] text-lg text-center flex items-center justify-center ">
                    <Eye
                      onClick={() => {
                        setShowVistList(job?.visits);
                      }}
                      size={32}
                      weight="bold"
                      className="cursor-pointer"
                    />
                  </p>
                  <p className="w-[150px] text-lg text-center">
                    {convertTo12HourFormat(job?.createdAt)}
                  </p>
                  <p className="w-[150px] text-lg text-center">
                    {convertTo12HourFormat(job?.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[90%] w-full flex items-center justify-center">
              <p className="text-3xl font-bold">No jobs available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
