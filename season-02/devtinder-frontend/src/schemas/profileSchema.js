import * as yup from "yup";
import validator from "validator";

// Edit profile schema
export const EditProfileSchema = yup.object({
    name: yup.string().min(6, "Name must be at least 6 characters").max(50, "Name must not exceed 50 characters").trim(),
    email: yup
        .string()
        .trim()
        .email("Please provide a valid email address")
        .test("validate-email", "Please provide a valid email address", (value) => validator.isEmail(value)),
    gender: yup.string().trim().oneOf(["male", "female"]),
    photoUrl: yup.string().trim().url("Please provide a valid URL").required("Please provide the photo url"),
    age: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .typeError("Please enter a valid age")
        .positive("Age must be positive")
        .integer("Age must be a whole number")
        .min(18, "You must be at least 18 years old"),
    about: yup.string().trim().max(200, "About section should not exceed 200 characters").min(10, "About section must be at least 10 characters")
});
