import './hoteldetails.css'
import DataTable from '../../components/admin/DataTable'
import SwipeableTemporaryDrawer from '../../components/admin/SwipeDrawer'
import { useState } from 'react'

export default function HotelDetails ({ columns }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <div className='hdlist'>
      <div className='homeDrowrWrapper'>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>
      <div className='hdlistContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}
