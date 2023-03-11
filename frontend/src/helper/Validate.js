import toast from "react-hot-toast";
import {authenticate} from './helper'

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    if(values.Username){
        const {status} = await authenticate(values.Username);
        if(status!==200){
            errors.exist = toast.error('user does not exist');
        }
    }
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