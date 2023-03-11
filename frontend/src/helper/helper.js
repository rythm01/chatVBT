import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function authenticate(username) {
    try {
        return await axios.post('/api/authentication', { username });
    } catch (error) {
        return { error: "Username doesn't exist" }
    }
}
/**Get user */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't match" }
    }
}
/**register */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);
        let { username, email } = credentials;
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        }
        return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({ error });
    }
}
/**login */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match" });
    }
}
/**update */
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });

    } catch (error) {
        return Promise.reject({ error: "Couldn't update profile" });
    }
}