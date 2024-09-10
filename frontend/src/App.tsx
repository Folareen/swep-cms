import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import BookAppointment from "./pages/patient/BookAppointment"
import HealthInformation from "./pages/patient/HealthInformation"
import PatientDashboard from "./pages/patient/PatientDashboard"
import useAuthStore from "./stores/useAuthStore"
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import NotFound from "./pages/NotFound"
import logo from './assets/oau-logo.png'
import ViewAppointments from "./pages/doctor/ViewAppointments"
import AppointmentDetails from "./pages/doctor/AppointmentDetails"

function App() {
  const { user, authenticate, logout } = useAuthStore()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          authenticate(token)
        } else {
          logout()
        }
      } catch (error: any) {
        logout()
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <div className='bg-blue-50 h-screen w-full flex items-center justify-center'>
      <img src={logo} className='w-40 h-40 animate-bounce' />
    </div>
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Landing />} path="/" />

        {user ? (
          <>
            {
              user?.role == 'patient' ?
                <>
                  <Route element={<PatientDashboard />} path="/patient/dashboard" />
                  <Route element={<BookAppointment />} path="/patient/book-appointment" />
                  <Route element={<HealthInformation />} path="/patient/health-information" />
                </>
                :
                <>
                  <Route element={<DoctorDashboard />} path="/doctor/dashboard" />
                  <Route element={<ViewAppointments />} path="/doctor/view-appointments" />
                  <Route element={<AppointmentDetails />} path="/doctor/appointments/:id" />
                </>
            }
          </>
        ) : (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/sign-up" />
          </>
        )}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App