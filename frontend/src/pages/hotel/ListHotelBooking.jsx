import { useState } from 'react'
import DataTable from '../../components/admin/DataTable'
import HotelSwipeDrawer from '../../components/hotel/HotelSwipeDrawer'
import './listhotelbooking.css'

export default function ListHotelBooking ({ columns }) {
   const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }
  return (
    <div className='LHlist'>
      <div className='hotelhomeDrowrWrapper'>
        <HotelSwipeDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>

      <div className='LHlistContainer'>
        <div className='ctable'>
          <DataTable columns={columns} />
        </div>
      </div>
    </div>
  )
}
