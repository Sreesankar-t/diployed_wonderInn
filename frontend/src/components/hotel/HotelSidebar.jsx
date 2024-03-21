import './hotelsidebar.css'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import StoreIcon from '@mui/icons-material/Store'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TextsmsIcon from '@mui/icons-material/Textsms';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HotelAuthContext } from '../../context/hotel/HotelContext'

const HotelSidebar = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(HotelAuthContext)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    axios
      .post('/hotel/logout')
      .then(response => {
        console.log('Logout successful', response.data)

        navigate('/hotellogin')
      })
      .catch(error => {
        console.error('Logout failed', error)
      })
  }

  return (
    <div className='hsidebar'>
      <div className='htop'>
        <Link to='/hotel' style={{ textDecoration: 'none' }}>
          <span className='hlogo'>HOTEL</span>
        </Link>
      </div>
      <hr />
      <div className='hcenter'>
        <ul>
          <p className='htitle'>MAIN</p>
          <Link to='/hotel' style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className='hicon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='htitle'>LISTS</p>

          <Link to='/listhotel' style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className='hicon' />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to='/listroom' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='hicon' />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to='/listHotelBooking' style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className='hicon' />
              <span>Booking</span>
            </li>
          </Link>
          {/*        
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className='htitle'>USER</p>
          <Link to='/messenger' style={{ textDecoration: 'none' }}>
            <li>
              <TextsmsIcon className='hicon' />
              <span>Messenger</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className='hicon' />
            <span onClick={handleLogout}>Logout</span>
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default HotelSidebar
