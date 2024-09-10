import oauLogo from '../assets/oau-logo.png'
import { Link } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

const Logo = () => {
    const { user } = useAuthStore()

    return (
        <Link to={user ? `${user?.role == 'patient' ? '/patient/dashboard' : user?.role == 'doctor' ? '/doctor/dashboard' : '/'}` : '/'} className='flex justify-center items-center space-x-6'>
            <img src={oauLogo} className='w-12 md:w-28 h-12 md:h-28 object-contain ' />
            <h1 className='text-[rgba(1,0,128,1)] text-2xl md:text-4xl font-montserrat font-bold text-center break-normal'>
                OAU <br /> E-health Centre
            </h1>
        </Link>
    )
}

export default Logo