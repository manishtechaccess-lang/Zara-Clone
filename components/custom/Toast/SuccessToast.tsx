import { toast } from "react-toastify";

const SuccessToast = (message: string) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    // hideProgressBar: false,
    theme: "dark",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "bg-black border border-zinc-800 text-white rounded-lg",
    progressClassName: "bg-green-500",
  });
};

export default SuccessToast;
