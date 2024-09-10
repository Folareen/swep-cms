import { useEffect, useState } from 'react'
import Axios from '../config/axios'

const useFetch = (url: string, dependencies: any[]) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        (
            async () => {
                try {
                    setError('')
                    setLoading(true)
                    const response = await Axios.get(url)
                    setData(response.data)
                } catch (error: any) {
                    setError(error?.message || error)
                } finally {
                    setLoading(false)
                }
            }
        )()

    }, [...dependencies])

    return {
        loading,
        data,
        error
    }
}

export default useFetch