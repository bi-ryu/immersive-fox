import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  userStory: Yup.string()
    .min(10, "Too Short!")
    .max(100, "Too Long!")
    .required("Required!"),
  userEmail: Yup.string().email("Invalid email!").required("Required!"),
  userName: Yup.string().min(2, "Too Short!").required("Required!"),
});
