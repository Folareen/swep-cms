import { useParams } from 'react-router-dom'
import landingBg from '../../assets/landing-bg.png'
import Logo from '../../components/Logo'
import { getDateAndTime } from '../../utils/formatDate'
import useFetch from '../../hooks/useFetch'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'

// const data = {
//     id: 1,
//     patient_first_name: 'olapsum',
//     patient_last_name: 'adelorem',
//     patient_email: 'loerm@oauife.edu.ng',
//     shift: 'morning',
//     date: new Date(),
//     start_time: '09:00 AM',
//     end_time: '09:30 AM',
//     reason: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum commodi laboriosam atque et in amet! Doloribus accusantium earum eos, voluptatem adipisci nesciunt repudiandae fugiat numquam exercitationem odio laudantium incidunt natus.',
//     blood_type: 'xy',
//     genotype: '',
//     critical_illness: '',
//     physical_disabilities: '',
//     substance_use: '',
// }

const Row = ({ title, value }: { title: string, value: string }) => {

    return (
        <div className='flex flex-row flex-start rounded-[4px] border border-white my-0.5'>
            <p className='w-1/2 bg-[#315d9f] text-[#c8d1e2] font-medium px-5 py-3 rounded-l-[4px] capitalize'>
                {title}
            </p>
            <p className='w-1/2 text-[#315d9f] bg-[#c8d1e2] font-semibold px-5 py-3 rounded-l-[4px]'>
                {value}
            </p>
        </div>
    )
}

const AppointmentDetails = () => {
    const { id } = useParams()

    const { loading, data, error } = useFetch(`/appointments/${id}`, [])

    console.log(data, 'seee')

    return (
        <div className='bg-cover min-h-screen w-full font-montserrat ' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 flex flex-col overflow-hidden'>
                <Logo />
                <h2 className='text-[40px] text-black text-center font-montserrat font-bold mt-5'>
                    Appointment Details
                </h2>
                {
                    loading ?
                        <div className='h-full flex-1 w-full flex items-center justify-center'>
                            <Spinner size='big' />
                        </div>
                        :
                        data ?
                            <div className=' w-4/5 max-w-3xl mx-auto mt-10 text-lg' >
                                <Row title='date' value={getDateAndTime(data?.data?.date)} />
                                <Row title='shift' value={data?.shift} />
                                <Row title='timeline' value={data?.start_time + ' - ' + data?.end_time} />
                                <Row title='patient name' value={data?.patient_first_name + ' ' + data?.patient_last_name} />
                                <Row title='patient email' value={data?.patient_email} />
                                <Row title='reason' value={data?.reason} />
                                <Row title='blood type' value={data?.shift} />
                                <Row title='genotype' value={data?.genotype} />
                                <Row title='critical illness' value={data?.critical_illness} />
                                <Row title='physical disabilities' value={data?.physical_disabilities} />
                                <Row title='substance use' value={data?.substance_use} />
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

export default AppointmentDetails