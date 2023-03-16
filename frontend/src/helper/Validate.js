import toast from "react-hot-toast";

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

export function usernameVerify(errors = {}, values) {
    if (!values.Username) {
        errors.Username = toast.error("Username required");
    } else if (values.Username.includes(" ")) {
        errors.Username = toast.error("Invalid username!!!");
    }
    return errors;
}