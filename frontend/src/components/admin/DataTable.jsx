import './datatable.css'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { HotelAuthContext } from '../../context/hotel/HotelContext'
import Modal from 'react-modal'
import { ProfileModalStyles, ownerHotelsModalStyle } from '../../ModelStyle'
import { format, parseISO } from 'date-fns'
import { ListHotelColumns } from '../../datatablesource'
import { Rating } from '@mui/material'

const showConfirmationDialog = () => {
  return Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to delete ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })
}

export default function DataTable ({ columns }) {
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  const [list, setList] = useState([])
  const [ownerHotels, setOwerHotels] = useState([])
  const [userStates, setUserStates] = useState({})
  const [hotelApprovals, setHotelApprovals] = useState({})
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [hotelModalOpen, setHotelModalOpen] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [result, setResult] = useState('')
  const [review, setReview] = useState([])
  const [rating, setRating] = useState([])
  const { hotel } = useContext(HotelAuthContext)
  const hotelId = hotel == undefined || null ? "" :hotel._id

  useEffect(() => {
    const fetchData = async () => {
      console.log(hotelId,"smasthaanuramba");
      try {
        if (
        
          path === 'listhotel' ||
          path === 'listroom' ||
          path == 'listHotelBooking'
        ) {
          const response = await axios.get(`/hotel/${path}/${hotelId}`)
          const data = response.data
          setList(data)
          setLoading(false)
        }
        const response = await axios.get(`/admin/${path}`)
        const data = response.data
        setList(data)
        setLoading(false)

        const updatedUserStates = {}
        const updatedHotelApprovals = {}

        data.forEach(item => {
          if (path === 'users') {
            updatedUserStates[item._id] = item.isUser
          } else if (path === 'owners') {
            updatedHotelApprovals[item._id] = item.approveHotel
          }
        })

        setUserStates(updatedUserStates)
        setHotelApprovals(updatedHotelApprovals)
      } catch (error) {
        console.error(error)
        setLoading(false) // Set loading to false on error
      }
    }

    fetchData()
  }, [path])

  const handleDelete = async id => {
    const confirmation = await showConfirmationDialog()
    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`/admin/${path}/${id}`)
        setList(prevList => prevList.filter(item => item._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleHotelDelete = async id => {
    const confirmation = await showConfirmationDialog()
    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`/hotel/${path}/${id}`)
        setList(prevList => prevList.filter(item => item._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleBlock = async id => {
    try {
      const response = await axios.get(`/admin/hideUser/${id}`)
      const user = response.data
      localStorage.removeItem('user')
      // Update the local state
      setUserStates(prevState => ({
        ...prevState,
        [id]: user.isUser
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnBlock = async id => {
    try {
      const response = await axios.get(`/admin/unHideUser/${id}`)
      const user = response.data

      // Update the local state
      setUserStates(prevState => ({
        ...prevState,
        [id]: user.isUser
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleApprove = async id => {
    try {
      const response = await axios.get(`/admin/hotellist/${id}`)
      const hotel = response.data

      // Update the local state
      setHotelApprovals(prevState => ({
        ...prevState,
        [id]: hotel.approveHotel
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setHotelModalOpen(false)
    setReviewModal(false)
  }

  const handleDetails = async id => {
    try {
      const response = await axios.get(`/getPymetDetails/${id}`)
      setResult(response)
      setModalOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGethotels = async id => {
    setHotelModalOpen(true)
    try {
      const res = await axios.get(`/admin/getOwnerHotels/${id}`)
      setOwerHotels(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getReview =async(id)=>{
    setReviewModal(true)
    try {
      const res = await axios.get(`/getReviews/${id}`)
    const result =  res.data.map((item)=>(
       item.data
     
      ))
    const ratingResult =  res.data.map((item)=>(
      item.rating
       
      )) 
      setReview(result)
      setRating(ratingResult)
     
    } catch (error) {
      console.log(error)
    }
  }

  console.log(review);
  console.log(rating);

  return (
    <div className='datatable'>
      {loading ? (
        <div className='loader-container'>
          <HashLoader
            color='#36d7b7'
            loading={loading}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <div>
          <div className='datatableTitle'>
            {path == 'BookingList'
              ? 'Booking'
              : '' || path == 'listHotelBooking'
              ? 'Booking'
              : '' || path === 'users'
              ? 'Users'
              : '' || path === 'owners'
              ? 'Owners'
              : '' || path === 'listhotel'
              ? 'Hotels'
              : '' || path === 'listroom'
              ? 'Rooms'
              : '' || path === 'BlogsList'
              ? 'Blogs'
              : ''}
            {path === 'users' ||
            path === 'owners' ||
            path == 'BookingList' ||
            path == 'listHotelBooking' ? (
              <div></div>
            ) : (
              <Link to={`/${path}/new`} className='link'>
                Add New
              </Link>
            )}
          </div>
          <DataGrid
            rows={list}
            columns={columns.concat([
              {
                field: 'action',
                headerName: 'Action',
                width: 210,
                renderCell: params => {
                  const userState = userStates[params.row._id]
                  const isHotelApproved = hotelApprovals[params.row._id]

                  return (
                    <div className='cellAction'>
                      {path === 'users' && (
                        <>
                          <div
                            className='deleteButton'
                            onClick={() => handleDelete(params.row._id)}
                          >
                            Delete
                          </div>
                          {userState === false ? (
                            <div
                              className='viewButton'
                              onClick={() => handleUnBlock(params.row._id)}
                            >
                              Unblock
                            </div>
                          ) : (
                            <div
                              className='viewButton'
                              onClick={() => handleBlock(params.row._id)}
                            >
                              Block
                            </div>
                          )}
                        </>
                      )}

                      {path === 'listhotel' && (
                        <>
                          <div
                            className='deleteButton'
                            onClick={() => handleHotelDelete(params.row._id)}
                          >
                            Delete
                          </div>
                          <div
                              className='viewButton'
                              onClick={() => getReview(params.row._id)}
                            >
                              Reviews
                            </div>
                        </>
                      )}
                      { path === 'listroom' && (
                        <>
                          <div
                            className='deleteButton'
                            onClick={() => handleHotelDelete(params.row._id)}
                          >
                            Delete
                          </div>
                        </>
                      )}
                      {path === 'BlogsList' && (
                        <>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/BlogsList/${params.row._id}`}
                          >
                            <div className='viewButton'>View</div>
                          </Link>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/editBlog/${params.row._id}`}
                          >
                            <div className='viewButton'>Edit</div>
                          </Link>

                          <div
                            className='deleteButton'
                            onClick={() => handleDelete(params.row._id)}
                          >
                            Delete
                          </div>
                        </>
                      )}

                      {path === 'owners' && (
                        <>
                          <div
                            className='viewButton'
                            onClick={() => handleGethotels(params.row._id)}
                          >
                            Hotels
                          </div>
                          {!isHotelApproved ? (
                            <div
                              className='viewButton'
                              onClick={() => handleApprove(params.row._id)}
                            >
                              Approve
                            </div>
                          ) : (
                            <div className='status'>Approved</div>
                          )}
                        </>
                      )}
                      {(path === 'BookingList' ||
                        path === 'listHotelBooking') && (
                        <>
                          <div
                            className='viewButton'
                            onClick={() => handleDetails(params.row._id)}
                          >
                            View Details
                          </div>
                        </>
                      )}
                    </div>
                  )
                }
              }
            ])}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={row => row._id}
          />
        </div>
      )}
      <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={ProfileModalStyles}
          contentLabel='Edit Profile Modal'
        >
          <div className='cardContainer'>
            <div className='hedingContainer'>
              <h2>Booking Details</h2>
            </div>

            {result && (
              <>
                {' '}
                <div className='bookItems'>
                  <p className='bookingPraraHeading'>Hotel name :</p>{' '}
                  <p>{result.data.hotelName}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Hotel Type : </p>{' '}
                  <p> {result.data.hotelType}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Hotel Address :</p>{' '}
                  <p className='parclass'> {result.data.hotelAddress}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Room:</p>
                  <p> {result.data.roomTitle}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Max people :</p>{' '}
                  <p> {result.data.maxPeople}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Room number :</p>{' '}
                  <p>{result.data.roomNumbers}</p>
                </div>
                <div className='bookItems'>
                  <p className='bookingPraraHeading'>Check-in date : </p>{' '}
                  <p>
                    {' '}
                    {format(parseISO(result.data.startDate), 'MM-dd-yyyy')}
                  </p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Check-out date : </p>{' '}
                  <p> {format(parseISO(result.data.endDate), 'MM-dd-yyyy')}</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Status : </p>{' '}
                  <p style={{ color: 'green' }}>
                    {result.data.status == true
                      ? 'booked Success'
                      : 'booking Pending'}{' '}
                  </p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Booked Amount : </p>
                  <p style={{ color: 'green' }}>{result.data.totalAmount} /-</p>
                </div>
                <div className='bookItems'>
                  {' '}
                  <p className='bookingPraraHeading'>Payment Method : </p>
                  <p style={{ color: 'lightskyblue' }}> Online [card]</p>
                </div>
              </>
            )}
          </div>
        </Modal>
      <Modal
        isOpen={hotelModalOpen}
        onRequestClose={closeModal}
        style={ownerHotelsModalStyle}
        contentLabel='Edit Profile Modal'
      >
        <div className='ModalTitle'>
          <h2>Owner Hotels</h2>
        </div>

        <DataGrid
          className='datagrid'
          rows={ownerHotels}
          columns={ListHotelColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={row => row._id}
        />
      </Modal>
      <Modal
        isOpen={reviewModal}
        onRequestClose={closeModal}
        style={ownerHotelsModalStyle}
        contentLabel='Edit Profile Modal'
      >
        
        { review && review.length > 0 ? (
    <div className='review_Content_C'>
    <div className='review_Content_C'>
      {review.map((item, index) => (
        <div className='R_Wrapp' key={index}>
          <div className='RandR'>
            <Rating name='read-only' value={rating[index]} readOnly />
            {rating[index] === 0 && <h1>Worst hotel</h1>}
            {rating[index] === 1 && <h1>Bad hotel</h1>}
            {rating[index] === 2 && <h1>Okay hotel</h1>}
            {rating[index] === 3 && <h1>Avarage hotel</h1>}
            {rating[index] === 4 && <h1>Good hotel</h1>}
            {rating[index] === 5 && <h1>Exellent hotel</h1>}
            <p>{item}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <div className='toper'>
    <h1>No reviews yet !</h1>
  </div>
)}


      
      </Modal>
    </div>
  )
}

//prop type define

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired
}
