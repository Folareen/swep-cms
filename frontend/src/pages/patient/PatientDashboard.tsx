import { FaCalendarCheck } from 'react-icons/fa6'
import { RiHealthBookFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import landingBg from '../../assets/landing-bg.png'
import Logo from '../../components/Logo'
import useAuthStore from '../../stores/useAuthStore'
import { toast } from 'react-toastify'
import useFetch from '../../hooks/useFetch'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'

const PatientDashboard = () => {
    const { user, logout } = useAuthStore()

    const { loading, data, error } = useFetch(`/appointments/user-appointments/`, [])

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
        toast.info('Logout successful!')
    }

    console.log(data, 'user appointments')

    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 flex flex-col '>
                <Logo />
                <h2 className='text-3xl font-semibold text-center mt-12 text-gray-900 '>
                    <i> Hello,</i> {user?.firstName} {user?.lastName}
                </h2>
                <div className='flex flex-wrap gap-10 justify-center justify-self-center flex-1 items-center'>

                    {
                        loading ?
                            <div className='h-ful w-full flex items-center justify-center'>
                                <Spinner size='big' />
                            </div>
                            :
                            data ?
                                <>
                                    <Link to={`/patient/health-information`} className='bg-[#c8d1e2] hover:bg-[#315d9f] flex flex-col px-6 py-10 rounded-[8px] w-full md:w-1/2 lg:w-1/4 justify-center items-center gap-2 hover:text-white'>
                                        <RiHealthBookFill size={50} />
                                        <p className='font-montserrat text-3xl font-bold text-center'>
                                            Health Information
                                        </p>
                                    </Link>
                                    <Link to={`/patient/book-appointment`} className='bg-[#c8d1e2] hover:bg-[#315d9f] flex flex-col px-6 py-10 rounded-[8px] w-full md:w-1/2 lg:w-1/4 justify-center items-center gap-2 hover:text-white'>
                                        <FaCalendarCheck size={50} />
                                        <p className='font-montserrat text-3xl font-bold text-center'>
                                            Book an Appointment
                                        </p>
                                    </Link>
                                </>

                                :
                                error ?
                                    <Error message={error} />
                                    :
                                    null
                    }
                </div>
                <button className='bg-red-900 px-5 py-1.5 text-white font-montserrat font-medium rounded-md text-lg w-max mb-5 flex justify-center mx-auto mt-auto' onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    )
}

export default PatientDashboard