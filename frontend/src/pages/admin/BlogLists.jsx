import DataTable from '../../components/admin/DataTable'
import './bloglists.css'
import SwipeableTemporaryDrawer from '../../components/admin/SwipeDrawer'
import { useState } from 'react'

export default function ListBlogs ({ columns }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <div className='bloglist'>
      <div className='homeDrowrWrapper'>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>
      <div className='bloglistContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}
