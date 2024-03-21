import './hotelhome.css'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Chart from '../../components/admin/Chart'
import Featured from '../../components/admin/FeaturedAdmin'

import Widget from '../../components/admin/Widget'
import HotelSwipeDrawer from '../../components/hotel/HotelSwipeDrawer'
export default function HotelHome () {
  const [hasShownToast, setHasShownToast] = useState(false)
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  useEffect(() => {
    const hasToastBeenShown = localStorage.getItem('toastShown')

    if (!hasToastBeenShown && !hasShownToast) {
      toast.success('approved success you can access your page', {
        position: 'top-center',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      localStorage.setItem('toastShown', 'true')

      setHasShownToast(true)
    }
  }, [hasShownToast])

  return (
    <div className='Hhome'>
      <div className='hotelhomeDrowrWrapper'>
        <HotelSwipeDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>

      <div className='Hwidgets'>
        <Widget />
      </div>

      <div className='Hcharts'>
        <Featured />
        <Chart />
      </div>
      <ToastContainer />
    </div>
  )
}
