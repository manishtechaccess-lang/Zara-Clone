import { toast } from "react-toastify";

const ErrorToast = (message: string) => {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    // hideProgressBar: false,
    theme: "dark",
    closeOnClick: true,
    pauseOnHover: true,
    className: "bg-black border border-zinc-800 text-white rounded-lg",
    draggable: true,
    progressClassName: "bg-red-500",
  });
};

export default ErrorToast;
