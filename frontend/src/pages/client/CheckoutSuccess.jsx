import './checkoutsuccess.css'
import axios from 'axios'
import { BookingContext } from '../../context/client/BookingContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutSuccess () {
  const {
    user,
    dates,
    hotel,
    selectedRooms,
    totalAmount,
    alldates,
    data,
    dispatch
  } = useContext(BookingContext)

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        await Promise.all(
          selectedRooms.map(selectedRoom => {
            const { roomId } = selectedRoom
            const res = axios.put(`/hotel/availability/${roomId}`, {
              dates: alldates
            })
            return res.data
          })
        )

        await axios.post('/BookingDetails', {
          data,
          dates,
          user,
          hotel,
          selectedRooms,
          totalAmount
        })
      } catch (error) {
        console.log(error)
      }
    }

    // Call the function
    console.log('i fire once')
    handleCheckout()
  }, [])

  const resetContext = () => {
    dispatch({ type: 'RESET' })
    console.log('resent avanam')
  }

  return (
    <>
      <div className='wrapperAlert'>
        <div className='contentAlert'>
          <div className='topHalf'>
            <p>
              <svg viewBox='0 0 512 512' width='100' title='check-circle'>
                <path d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z' />
              </svg>
            </p>
            <h1>Congratulations</h1>

            <ul className='bg-bubbles'>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
             <li className='CleckOutList'></li>
            </ul>
          </div>

          <div className='bottomHalf'>
            <p>
              Embark on a journey of comfort and tranquility. Your successful
              hotel booking marks the beginning of a remarkable adventure,
              promising relaxation, rejuvenation, and cherished memories.
            </p>

            <Link to='/profile'>
              <button className='checkOutBtn' onClick={resetContext} id='alertMO'>
                Booking Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
