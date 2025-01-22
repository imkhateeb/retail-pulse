import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    // Listen for imageProcessed events
    socket.on("imageProcessed", (data) => {
      setUpdates((prevUpdates) => [
        ...prevUpdates,
        `Store ${data.storeId}: Image ${data.imageUrl} - ${data.status}`,
      ]);
    });

    // Listen for jobUpdate events
    socket.on("jobUpdate", (data) => {
      setUpdates((prevUpdates) => [
        ...prevUpdates,
        `Job ${data.jobId} - ${data.status}`,
      ]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!currentUpdate && updates.length > 0) {
      setCurrentUpdate(updates[0]);
      const timer = setTimeout(() => {
        removeCurrentUpdate();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [updates, currentUpdate]);

  const removeCurrentUpdate = () => {
    setUpdates((prevUpdates) => prevUpdates.slice(1));
    setCurrentUpdate(null);
  };

  const handleClose = () => {
    removeCurrentUpdate();
  };

  if (!currentUpdate) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full h-[10vh] bg-green-500 text-white flex items-center justify-center z-50"
      style={{ transition: "all 0.5s ease-in-out" }}
    >
      <span className="text-lg font-semibold">{currentUpdate}</span>
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Updates;
