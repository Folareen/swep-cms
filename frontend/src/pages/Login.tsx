import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import Logo from '../components/Logo'
import Spinner from '../components/Spinner'
import { login } from '../services/auth'
import useAuthStore from '../stores/useAuthStore'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
    const [tab, setTab] = useState('patient')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const { authenticate } = useAuthStore()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            const token = await login({ email, password, role: tab }, authenticate)
            const user: any = jwtDecode(token)
            if (user?.UserInfo?.role == 'patient') {
                navigate('/patient/dashboard')
            } else if (user?.UserInfo?.role == 'doctor') {
                navigate('/doctor/dashboard')
            }
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

                    <h2 className='text-4xl text-[rgba(0,0,0,1)]  font-montserrat font-bold'>
                        Welcome!
                    </h2>
                    <p className='text-3xl mb-8'>
                        Already own an account? Login.
                    </p>

                    <div className='flex items-center mb-5'>
                        {
                            [
                                'patient',
                                'doctor'
                            ].map((tb) => (
                                <button className={`${tab == tb ? 'bg-[rgba(1,0,128,1)] text-white' : 'bg-white text-[rgba(1,0,128,1)]'} px-5 py-2 font-montserrat font-medium rounded-sm text-lg mt-8 mb-5 flex justify-center capitalize flex-1`} onClick={() => {
                                    setTab(tb)
                                }} type='button'>
                                    {tb}
                                </button>
                            ))
                        }
                    </div>


                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Email
                        </p>
                        <input type="email" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div>
                        <p className='text-xl md:text-2xl mb-1'>
                            Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <p className='text-[rgba(1,0,128,1)] text-right font-medium text-xl mt-2'>
                        Forgot Password?
                    </p>

                    <button className='bg-[rgba(1,0,128,1)] py-3 text-white font-montserrat font-bold rounded-[10px] text-xl md:text-2xl w-full mt-8 mb-5 flex justify-center' onClick={handleSubmit}>
                        {
                            submitting ?
                                <Spinner size='small' /> :
                                'Login'
                        }
                    </button>

                    {
                        tab == 'patient' &&
                        <>
                            <p className='text-xl md:text-2xl text-center mt-2.5'>
                                Don't have an account?
                            </p>
                            <Link to='/sign-up' className='text-[rgba(1,0,128,1)] text-center block font-semibold text-xl md:text-2xl mt-1'>
                                Sign Up
                            </Link>
                        </>
                    }

                </form>


            </div>
        </div>
    )
}

export default Login