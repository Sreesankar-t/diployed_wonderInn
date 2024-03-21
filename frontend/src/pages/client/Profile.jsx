import Header from '../../components/client/Header'
import Navbar from '../../components/client/Navbar'
// import DataTable from 'react-data-table-component'
import { DataGrid } from '@mui/x-data-grid'
import './profile.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/client/AuthContext'
import useFetch from '../../hooks/useFetch'
import Modal from 'react-modal'
import axios from 'axios'
import { ToastContainer, Zoom, toast } from 'react-toastify'
import { Bookingcolumns } from '../../datatablesource'
import TextField from '@mui/material/TextField'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { ProfileModalStyles, ReviewModalStyle } from '../../ModelStyle'
import { format, parseISO } from 'date-fns'
import ReactStars from 'react-rating-stars-component'

const Profile = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [files, setFiles] = useState('')
  const [userProfile, setUserProfile] = useState({})
  const [result, setResult] = useState('')
  const [pymentDetailsModal, setPaymentDetailsModal] = useState(false)
  const [reviewModal, setReviewModal] = useState(false)
  const [hotelId,setHotelId]=useState('')
  const [hotelName,setHotelName]=useState('')

  const [rating, setRating] = useState(0)
  const [change, setChange] = useState('')
  const [open, setOpen] = useState(false)

  const { user } = useContext(AuthContext)
  const { data } = useFetch(`/getBookingDetails/${user._id}`)

  useEffect(() => {
    try {
      axios.get(`/getUser/${user._id}`).then(response => {
        setUserProfile(response.data)
        setEditData(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setPaymentDetailsModal(false)
    setReviewModal(false)
  }

  const handleEdit = e => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = async () => {
    try {
      const updatedUser = {
        ...editData
      }

      const response = await axios.put(`/editProfile/${user._id}`, updatedUser)

      if (response.data) {
        setUserProfile(response.data)

        toast.success('Profile saved successfully', {
          transition: Zoom,
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    } catch (err) {
      toast.warn(err.response?.data?.message, {
        transition: Zoom,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  const handlPaymentDetails = async id => {
    try {
      const response = await axios.get(`/getPymetDetails/${id}`)
      setResult(response)
      setPaymentDetailsModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handlReview = (id,name)=>{
     setReviewModal(true)
     setHotelId(id)
     setHotelName(name)
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 270,
      renderCell: params => {
        return (
          <div className='cellAction'>
            <div
              className='deleteButtonPro'
              onClick={() => handlPaymentDetails(params.row._id)}
            >
              View Details
            </div>
            <div
              className='deleteButtonPro'
              onClick={() => handlReview(params.row.hotelId,params.row.hotelName)}
                
               
            >
              Review now
            </div>
          </div>
        )
      }
    }
  ]

  const ratingChanged = newRating => {
    setRating(newRating)
  }

  const handleSubmit = () => {
    if (rating !== 0) {
      setOpen(true)
    } else {
      toast.info('please give the rating', {
        transition: Zoom,
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
   
  }
  const handleChange = e => {
    setChange(e.target.value)
  }
  const submitReview = async () => {
    if (change.trim() !== '' && rating !== 0) {
      const data = {
        data: change,
        rating: rating,
        hotelId: hotelId
      }
      try {
        console.log('submit')
        const res = await axios.post('/postReview', data)
       res &&  toast.info(` ${hotelName}: Thank you for providing your honest review`, {
        transition: Zoom,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      setReviewModal(false)
        setChange('')
        setOpen(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='layout'>
        <div className='profile'>
          <div className='profile__picture'>
            {files ? (
              <img src={URL.createObjectURL(files)} alt='' />
            ) : (
              <img src='/images/images (2).jpeg' alt='' />
            )}
          </div>
          <div className='formInputImg'>
            <label htmlFor='file'>
              Image: <DriveFolderUploadOutlinedIcon className='icon' />
            </label>
            <input
              type='file'
              id='file'
              accept='image/*'
              onChange={e => setFiles(e.target.files[0])}
              style={{ display: 'none' }}
              required
            />
          </div>

          <div className='profile__header'>
            <div className='profile__account'>
              <h3 className='profile__username'>{userProfile.name}</h3>
            </div>
            <div className='profile__edit'>
              <a onClick={openModal} className='profile__button' href='#'>
                Edit Profile
              </a>
            </div>
          </div>
          <div className='profile__stats'>
            <div className='profile__stat'>
              <div className='profile__value1'>{userProfile.name}</div>
            </div>
            <div className='profile__stat'>
              <div className='profile__value'>{userProfile.email}</div>
            </div>
            <div className='profile__stat'>
              <div className='profile__value'>{userProfile.phone}</div>
            </div>
          </div>
          <div className='profileTable'>
            <DataGrid
              className='datagrid'
              rows={data}
              columns={Bookingcolumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          </div>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={ProfileModalStyles}
          contentLabel='Edit Profile Modal'
        >
          <div className='profileHeader'>
            <h2>Edit Profile</h2>
          </div>
          <form className='modal-form'>
            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              type='text'
              name='name'
              className='text'
              value={
                editData.name !== undefined ? editData.name : userProfile.name
              }
              onChange={handleEdit}
            />
            <TextField
              id='standard-basic'
              label='Email'
              variant='standard'
              type='text'
              name='email'
              value={
                editData.email !== undefined
                  ? editData.email
                  : userProfile.email
              }
              onChange={handleEdit}
            />
            <TextField
              id='standard-basic'
              label='Phone Number'
              variant='standard'
              type='number'
              name='phone'
              value={
                editData.phone !== undefined
                  ? editData.phone
                  : userProfile.phone
              }
              onChange={handleEdit}
            />
            <div className='modal-buttons'>
              <button className='mbutton' onClick={saveProfile} type='button'>
                Save
              </button>
              <button className='mbutton' onClick={closeModal} type='button'>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={pymentDetailsModal}
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
          isOpen={reviewModal}
          onRequestClose={closeModal}
          style={ReviewModalStyle}
          contentLabel='Edit Profile Modal'
          
        >
          <div className='reviewHeader'>
          <h3>Give the rating and review now!</h3>
          </div>
        
                <div className='main_C'>
                  
        <div className='rating_C'>
          <div className='rating'>
            <ReactStars 
              count={5}
              onChange={ratingChanged}
              size={30}
              activeColor='#ffd700'
            />
          </div>
          <button className='RV_btn' onClick={handleSubmit}>Review now!</button>
        </div>

        <div className='btnWrap'></div>
      </div>
      {open && (
        <>
          <div className='textarea_C'>
            <textarea
            placeholder='enter here...'
              value={change}
              onChange={handleChange}
              rows='5'
            ></textarea>
          </div>
          <div className='review_btn'>
            <button className='texAreaBtn' onClick={submitReview}>Submit</button>
          </div>
        </>
      )}
        </Modal>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Profile
