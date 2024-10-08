import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import Logo from '../components/Logo'
import Spinner from '../components/Spinner'
import { signup } from '../services/auth'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await signup({ firstName, lastName, email, password, passwordConfirmation })
            toast.success('Sign up successful!')
            navigate('/login')
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
                        Create New Account
                    </h2>
                    <p className='text-3xl mb-8'>
                        Please register to create a new account.
                    </p>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Email
                        </p>
                        <input type="email" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Surname
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={lastName} onChange={(e) => {
                            setLastName(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Other Name
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-xl md:text-2xl mb-1'>
                            Confirm Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={passwordConfirmation} onChange={(e) => {
                            setPasswordConfirmation((e.target.value))
                        }} />
                    </div>

                    <button className='bg-[rgba(1,0,128,1)] py-3 text-white font-montserrat font-bold rounded-[10px] text-xl md:text-2xl w-full mt-8 mb-5 flex justify-center' onClick={handleSubmit}>
                        {
                            submitting ?
                                <Spinner size='small' /> :
                                'Sign Up'
                        }
                    </button>

                    <p className='text-xl md:text-2xl text-center mt-2.5'>
                        Have an account?
                    </p>
                    <Link to='/login' className='text-[rgba(1,0,128,1)] text-center block font-semibold text-xl md:text-2xl mt-1'>
                        Login
                    </Link>

                </form>


            </div>
        </div>
    )
}

export default Signup