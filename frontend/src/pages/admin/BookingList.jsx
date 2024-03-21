import DataTable from '../../components/admin/DataTable'
import './bookinglist.css'
import SwipeableTemporaryDrawer from '../../components/admin/SwipeDrawer'
import { useState } from 'react'

export default function BookingList ({ columns }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <div className='bookinglist'>
      <div className='homeDrowrWrapper'>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>
      <div className='bookinglistContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}
