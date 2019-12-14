import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Enter your old password"),
  newPassword: Yup.string()
    .min(6, "Six character minimum")
    .required("Enter your new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm your new password")
});
