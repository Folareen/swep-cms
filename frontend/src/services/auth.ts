import Axios from "../config/axios"
import { AuthState } from "../stores/useAuthStore"

export const login = async (
    { email, password, role }: { email: string, password: string, role: string },
    authenticate: AuthState["authenticate"]
) => {
    try {
        const response = await Axios.post(role == 'patient' ? '/users/login' : '/doctors/login', { email, password })
        authenticate(response.data.data.accessToken)
        return response.data.data.accessToken
    } catch (error: any) {
        throw new Error(error)
    }
}

export const signup = async (
    { lastName, firstName, email, password, passwordConfirmation }: { lastName: string, firstName: string, email: string, password: string, passwordConfirmation: string }
) => {
    try {
        await Axios.post('/users/students/register', { email, lastName, firstName, password, passwordConfirmation })
    } catch (error: any) {
        throw new Error(error)
    }
}