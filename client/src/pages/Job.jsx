import { Route, Routes } from "react-router-dom";
import AllJobs from "./AllJobs";
import JobForm from "./JobForm";
import FindJob from "./FindJob";

const Job = () => {
  return (
    <Routes>
      <Route path="/" element={<AllJobs />} />
      <Route path="/submit" element={<JobForm />} />
      <Route path="/find" element={<FindJob />} />
    </Routes>
  );
};

export default Job;
