const JobStatus = ({ status }) => {
  return (
    <p
      className={`font-semibold ${
        status === "ongoing"
          ? "text-yellow-600"
          : status === "completed"
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {status}
    </p>
  );
};

export default JobStatus;
