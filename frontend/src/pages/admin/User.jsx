import DataTable from '../../components/admin/DataTable'
import './user.css'
import SwipeableTemporaryDrawer from '../../components/admin/SwipeDrawer'
import { useState } from 'react'

export default function User ({ columns }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <div className='list'>
      <div className='homeDrowrWrapper'>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>

      <div className='listContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}
