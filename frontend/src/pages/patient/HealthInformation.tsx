import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../../assets/landing-bg.png'
import Logo from '../../components/Logo'
import Spinner from '../../components/Spinner'
import { updateRecord } from '../../services/patient'

const HealthInformation = () => {

    const [bloodType, setBloodType] = useState('')
    const [age, setAge] = useState(0)
    const [genotype, setGenotype] = useState('')
    const [criticalIllness, setCriticalIllness] = useState('')
    const [physicalDisabilities, setPhysicalDisabilities] = useState('')
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('')
    const [substanceUse, setSubstanceUse] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        try {
            setSubmitting(true)
            e.preventDefault()
            await updateRecord({
                bloodType,
                age,
                genotype,
                criticalIllness,
                physicalDisabilities,
                emergencyPhoneNumber,
                substanceUse
            })
            toast.success('Health Information Submitted!')
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

                <form className='w-[90%] md:w-2/5 mx-auto mt-10' onSubmit={handleSubmit}>

                    <h2 className='text-[40px] text-black text-center font-montserrat font-bold my-5'>
                        Health Information
                    </h2>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Blood Type
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={bloodType} onChange={(e) => {
                            setBloodType(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Genotype
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={genotype} onChange={(e) => {
                            setGenotype(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Age
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' type='number' value={age} onChange={(e) => {
                            setAge(Number(e.target.value))
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Critical Illness
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={criticalIllness} onChange={(e) => {
                            setCriticalIllness(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Physical Disabilities
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={physicalDisabilities} onChange={(e) => {
                            setPhysicalDisabilities(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Substance Use History
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={substanceUse} onChange={(e) => {
                            setSubstanceUse(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Emergency Phone number
                        </p>
                        <input className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={emergencyPhoneNumber} onChange={(e) => {
                            setEmergencyPhoneNumber(e.target.value)
                        }} />
                    </div>

                    <button className='bg-[rgba(1,0,128,1)] py-3 text-white font-montserrat font-bold rounded-[10px] text-xl md:text-2xl w-full mt-10 mb-5 flex justify-center' onClick={handleSubmit}>
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

export default HealthInformation