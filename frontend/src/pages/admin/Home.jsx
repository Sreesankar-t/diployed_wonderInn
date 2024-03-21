import { lazy, Suspense } from 'react'
import './home.css'
import SwipeableTemporaryDrawer from '../../components/admin/SwipeDrawer'
import { useState } from 'react'

const LazyWidget = lazy(() => import('../../components/admin/Widget'))
const LazyFeatured = lazy(() => import('../../components/admin/FeaturedAdmin'))
const LazyChart = lazy(() => import('../../components/admin/Chart'))

export default function Home () {
  const [open, setOpen] = useState(false)

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen)
  }

  return (
    <div className='home'>
      <div className='homeDrowrWrapper'>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer} open={open} />
      </div>

      <div className='widgets'>
        <Suspense fallback={<div>Loading Widget...</div>}>
          <LazyWidget />
        </Suspense>
      </div>
      <div className='charts'>
        <Suspense fallback={<div>Loading Featured or Chart...</div>}>
          <LazyFeatured />
          <LazyChart />
        </Suspense>
      </div>
    </div>
  )
}
