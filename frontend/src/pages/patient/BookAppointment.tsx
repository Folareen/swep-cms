import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import landingBg from '../../assets/landing-bg.png'
import Logo from '../../components/Logo'
import useAuthStore from '../../stores/useAuthStore'
import Spinner from '../../components/Spinner'
import { bookAppointment } from '../../services/appointment'
import { useNavigate } from 'react-router-dom'

const BookAppointment = () => {
    const { user } = useAuthStore()

    const [shift, setShift] = useState('morning')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState<any>('')

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        try {
            setSubmitting(true)
            e.preventDefault()
            await bookAppointment({ userId: user?.id, date, shift, reason })
            toast.success('Appointment booked!')
            navigate('/patient/dashboard')
        } catch (error: any) {
            toast.error(error?.message || error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 '>
                <Logo />

                <form className='w-4/5 md:w-2/5 mx-auto mt-10' onSubmit={handleSubmit}>

                    <h2 className='text-[40px] text-black text-center font-montserrat font-bold my-5'>
                        Book Appointment
                    </h2>

                    <div className='mb-5'>
                        <p className='text-2xl mb-1'>
                            Reason
                        </p>
                        <textarea className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white h-[30vh]' value={reason} onChange={(e) => {
                            setReason(e.target.value)
                        }}> </textarea>
                        <p className='italic text-sm'>
                            Keep it brief and straightfoward
                        </p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-2xl mb-1'>
                            Date
                        </p>
                        <input type="date" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={date} onChange={(e) => {
                            setDate(e.target.value)
                        }} />
                        <p className='italic text-sm'>
                            Choose a date within the current week
                        </p>
                    </div>

                    <div className='mb-5'>
                        <p className='text-2xl mb-1'>
                            Time
                        </p>
                        <select name="" id="" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={shift} onChange={(e) => {
                            setShift(e.target.value.toLowerCase())
                        }}>
                            {['Morning', 'Afternoon', 'Evening'].map((tm) => (
                                <option value={tm} className='capitalize'>{tm}</option>
                            ))}
                        </select>
                    </div>

                    <button className='bg-[rgba(1,0,128,1)] py-3 text-white font-montserrat font-bold rounded-[10px] text-2xl w-full mt-10 mb-5 flex justify-center' onClick={handleSubmit}>
                        {
                            submitting ?
                                <Spinner size='small' /> :
                                'Submit'
                        }
                    </button>

                </form>


            </div>
        </div>
    )
}

export default BookAppointment