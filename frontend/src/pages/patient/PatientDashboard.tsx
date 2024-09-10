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

const Row = ({ title, value }: { title: string, value: string }) => {

    return (
        <div className='flex flex-row flex-start rounded-[4px] border border-white my-0.5'>
            <p className='w-1/2 bg-[#315d9f] text-[#c8d1e2] font-medium px-5 py-3 rounded-l-[4px] capitalize'>
                {title}
            </p>
            <p className='w-1/2 text-[#315d9f] bg-[#c8d1e2] font-semibold px-5 py-3 rounded-l-[4px] break-words break-all text-sm md:text-base'>
                {value}
            </p>
        </div>
    )
}

const PatientDashboard = () => {
    const { user, logout } = useAuthStore()

    const { loading, data, error } = useFetch(`/users/user-appointments/`, [])

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
        toast.info('Logout successful!')
    }

    console.log(data, 'seee')

    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 flex flex-col '>
                <Logo />
                <h2 className='text-3xl font-semibold text-center mt-12 text-gray-900 mb-10'>
                    <i> Hello,</i> {user?.firstName} {user?.lastName}
                </h2>
                <div className='flex flex-wrap space-x-0 md:space-x-10 space-y-5 justify-center justify-self-center flex-1 items-center'>

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
                                        <p className='font-montserrat text-xl md:text-3xl font-bold text-center'>
                                            Health Information
                                        </p>
                                    </Link>
                                    {
                                        data?.data?.length < 2 &&
                                        <Link to={`/patient/book-appointment`} className='bg-[#c8d1e2] hover:bg-[#315d9f] flex flex-col px-6 py-10 rounded-[8px] w-full md:w-1/2 lg:w-1/4 justify-center items-center gap-2 hover:text-white'>
                                            <FaCalendarCheck size={50} />
                                            <p className='font-montserrat text-xl md:text-3xl font-bold text-center'>
                                                Book an Appointment
                                            </p>
                                        </Link>
                                    }
                                    <div className='w-full'>
                                        <h4 className='text-lg md:text-xl text-black text-center font-montserrat font-bold my-5'>
                                            Pending Appointments
                                        </h4>
                                        {
                                            data?.data?.map(({ doctor_name, doctor_email, doctor_office, start_time, end_time }: any) => (
                                                <div className='my-3.5 w-[90%] md:w-3/5 mx-auto '>
                                                    <Row title='doctor name' value={doctor_name} />
                                                    <Row title='doctor email' value={doctor_email} />
                                                    <Row title='doctor office' value={doctor_office} />
                                                    <Row title='time' value={start_time + ' - ' + end_time} />
                                                </div>
                                            ))
                                        }

                                    </div>
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
