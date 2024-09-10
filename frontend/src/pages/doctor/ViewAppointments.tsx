import { Link } from 'react-router-dom'
import landingBg from '../../assets/landing-bg.png'
import Error from '../../components/Error'
import Logo from '../../components/Logo'
import Spinner from '../../components/Spinner'
import useFetch from '../../hooks/useFetch'
import { getDate } from '../../utils/formatDate'

// const data = [
//     {
//         id: 1,
//         patient_first_name: 'olapsum',
//         patient_last_name: 'adelorem',
//         patient_email: 'loerm@oauife.edu.ng',
//         shift: 'morning',
//         date: new Date(),
//         startTime: '09:00 AM',
//         endTime: '09:30 AM',
//         reason: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum commodi laboriosam atque et in amet! Doloribus accusantium earum eos, voluptatem adipisci nesciunt repudiandae fugiat numquam exercitationem odio laudantium incidunt natus.',
//     }
// ]

const ViewAppointments = () => {

    const { loading, data, error } = useFetch(`/appointments/doctor-appointments/`, [])

    return (
        <div className='bg-cover min-h-screen w-full font-montserrat ' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 flex flex-col overflow-hidden'>
                <Logo />
                <h2 className='text-[40px] text-black text-center font-montserrat font-bold mt-5'>
                    All Appointments
                </h2>
                {
                    loading ?
                        <div className='h-full flex-1 w-full flex items-center justify-center'>
                            <Spinner size='big' />
                        </div>
                        :
                        data ?
                            <div className='overflow-x-auto'>
                                <table className='w-full min-w-max bg-white shadow-md rounded-xl  text-[#202224] font-nunito-sans overflow-x-scroll  table-auto text-left mt-10 '>
                                    <tr className='bg-[#FCFDFD]  text-[10px] md:text-xs font-bold border-b-gray-200 border-b-[1px]'>
                                        <th className='p-2 md:p-4'>
                                            Date
                                        </th>
                                        <th className='p-2 md:p-4'>
                                            Shift
                                        </th>
                                        <th className='p-2 md:p-4'>
                                            Time
                                        </th>
                                        <th className='p-2 md:p-4  rounded-tl-xl rounded-bl-none' >
                                            Patient Name
                                        </th>
                                        <th className='p-2 md:p-4'>
                                            Patient Email
                                        </th>
                                        <th className='p-2 md:p-4 rounded-tr-xl rounded-br-none'>
                                            Reason
                                        </th>
                                        <th className='p-2 md:p-4 rounded-tr-xl rounded-br-none'>
                                            Action
                                        </th>
                                    </tr>
                                    {
                                        data?.data?.map(({ id, patient_first_name, patient_last_name, patient_email, date, shift, start_time, end_time, reason }: any) => (
                                            <tr className='text-[10px] md:text-xs border-b-gray-200 border-b-[1px]'>
                                                <td className='px-2 py-3 md:px-4 md:py-5 '>
                                                    {getDate(date)}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    {shift}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    {start_time} - {end_time}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    {patient_first_name} {patient_last_name}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    {patient_email}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    {reason?.length > 30 ? `${reason?.substring(0, 30)}...` : reason}
                                                </td>
                                                <td className='px-2 py-3 md:px-4 md:py-5'>
                                                    <Link to={`/doctor/appointments/${id}`} className='px-1.5 py-1 md:px-3 md:py-2 rounded-sm text-white font-bold font-nunito-sans bg-[#407BFF] w-max'>
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div>
                            :
                            error ?
                                <Error message={error} />
                                :
                                null
                }
            </div>
        </div>
    )
}

export default ViewAppointments