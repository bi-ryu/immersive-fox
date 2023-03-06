import emailjs from "emailjs-com";
import { toast } from "react-toastify";
//config
import { SERVICE_ID, TEMPLATE_ID, USER_ID } from "../../config";

export const sendMessage = (data, resetForm) => {
  emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
    (response) => {
      if (response?.status === 200) {
        resetForm();
        toast.success("Success!");
      }
    },
    (err) => {
      toast.error(`Something went wrong: ${err}`);
    }
  );
};
