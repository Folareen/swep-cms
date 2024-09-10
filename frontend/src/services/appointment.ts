import Axios from "../config/axios"

export const bookAppointment = async ({ userId, date, shift, reason }: { userId: string, date: string, shift: string, reason: string }) => {
    try {
        await Axios.post('/appointments', {
            userId,
            date,
            shift,
            reason
        })
    } catch (error: any) {
        throw new Error(error?.error || error?.message || error)
    }
} 
