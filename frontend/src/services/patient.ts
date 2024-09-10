import Axios from "../config/axios"

export const updateRecord = async (data: {
    bloodType: string,
    age: number,
    genotype: string,
    criticalIllness: string,
    physicalDisabilities: string,
    emergencyPhoneNumber: string
    substanceUse: string
}) => {
    try {
        await Axios.patch('/users/records', data)
    } catch (error: any) {
        throw new Error(error?.error || error?.message || error)
    }
} 
