import * as yup from "yup";
import validator from "validator";

// Login schema
export const LoginSchema = yup.object({
    email: yup
        .string()
        .required("Please provide an email address")
        .trim()
        .email("Please provide a valid email address")
        .test("validate-email", "Please provide a valid email address", (value) => validator.isEmail(value)),
    password: yup
        .string()
        .required("Please provide a password")
        .trim()
        .test(
            "validate-password",
            "Password must be at least 8 characters long and includes at least one lowercase character, one uppercase character, one number and one symbol",
            (value) =>
                validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })
        )
});

// Signup schema
export const SignupSchema = yup.object({
    name: yup
        .string()
        .required("Please provide a name")
        .min(6, "Name must be at least 6 characters")
        .max(50, "Name must not exceed 50 characters")
        .trim(),
    email: yup
        .string()
        .required("Please provide an email address")
        .trim()
        .email("Please provide a valid email address")
        .test("validate-email", "Please provide a valid email address", (value) => validator.isEmail(value)),
    password: yup
        .string()
        .required("Please provide a password")
        .trim()
        .test(
            "validate-password",
            "Password must be at least 8 characters long and includes at least one lowercase character, one uppercase character, one number and one symbol",
            (value) =>
                validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })
        )
});
