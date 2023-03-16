import toast from "react-hot-toast";

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

export function usernameVerify(errors = {}, values) {
    if (!values.username) {
        errors.username = toast.error("Username required");
    } else if (values.username.includes(" ")) {
        errors.username = toast.error("Invalid username!!!");
    }
    return errors;
}