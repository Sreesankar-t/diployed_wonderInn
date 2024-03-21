import { useState } from 'react'
import DataTable from '../../components/admin/DataTable'
import HotelSwipeDrawer from '../../components/hotel/HotelSwipeDrawer'
import './listRooms.css'

export default function ListHotel ({ columns }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }
  return (
    <div className='Llist'>
      <div className='hotelhomeDrowrWrapper'>
        <HotelSwipeDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>

      <div className='LlistContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}
