import toast from "react-hot-toast";

const successToast = (msg) => {
  toast.success(msg, {
    duration: 4000,
    icon: "✅",
    style: {
      borderRadius: "50px",
      background: "#333",
      color: "#fff",
    },
  });
};

export default successToast;
