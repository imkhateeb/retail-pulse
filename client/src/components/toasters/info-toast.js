import toast from "react-hot-toast";

const infoToast = (msg) => {
  toast(msg, {
    duration: 4000,
    icon: "ℹ️",
    style: {
      borderRadius: "50px",
      background: "#333",
      color: "#fff",
    },
  });
};

export default infoToast;
