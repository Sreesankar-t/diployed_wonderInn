import { useEffect, useState } from 'react'
import './review.css'
import axios from 'axios'
import Rating from '@mui/material/Rating'
import { Line } from 'rc-progress'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Review ({ hotelId }) {
  const [items, setItems] = useState([])
  const [getRating, setGetRating] = useState([])
  const [result1, setResult1] = useState(0)
  const [result2, setResult2] = useState(0)
  const [result3, setResult3] = useState([])

  useEffect(() => {
    async function getReviews () {
      try {
        const response = await axios.get(`/getReviews/${hotelId}`)
        const content = response.data.map(item => item.data)
        const ratingData = response.data.map(item => item.rating)
        setGetRating(ratingData)
        setItems(content)
      } catch (error) {
        console.log(error)
      }
    }
    getReviews()
  }, [])

  useEffect(() => {
    const request1 = axios.get(`/getTotalRating/${hotelId}`)
    const request2 = axios.get(`/getTotalReview/${hotelId}`)
    const request3 = axios.get(
      `/getSpecificRatingTotal/${hotelId}?count=5,4,3,2,1`
    )

    Promise.all([request1, request2, request3])
      .then(([res1, res2, res3]) => {
        const data1 = res1.data
        const data2 = res2.data
        const data3 = res3.data

        setResult1(data1)
        setResult2(data2)
        setResult3(data3)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className='review'>
      <div className='heading_wrapper'>
        <h1>Rating & Review</h1>
        <div className='divider'>
          <div className='prgrss_maintain'>
            <h1>
              {result1} Ratings & {result2} Reviews
            </h1>
          </div>
          <div className='progess_c'>
            <div className='prgs'>
              <p>5</p>
              <FontAwesomeIcon icon={faStar} />
              <Line
                percent={result3[0]}
                strokeWidth={2}
                strokeColor='#22920d'
              />
              <p>{result3[0]}</p>
            </div>
            <div className='prgs'>
              <p>4</p>
              <FontAwesomeIcon icon={faStar} />
              <Line
                percent={result3[1]}
                strokeWidth={2}
                strokeColor='#22920d'
              />
              <p>{result3[1]}</p>
            </div>
            <div className='prgs'>
              <p>3</p>
              <FontAwesomeIcon icon={faStar} />
              <Line
                percent={result3[2]}
                strokeWidth={2}
                strokeColor='#f6ca01'
              />
              <p>{result3[2]}</p>
            </div>
            <div className='prgs'>
              <p>2</p>
              <FontAwesomeIcon icon={faStar} />
              <Line
                percent={result3[3]}
                strokeWidth={2}
                strokeColor='#f6ca01'
              />
              <p>{result3[3]}</p>
            </div>
            <div className='prgs'>
              <p> 1</p>
              <FontAwesomeIcon icon={faStar} />
              <Line
                percent={result3[4]}
                strokeWidth={2}
                strokeColor='#e22424'
              />
              <p>{result3[4]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='review_Content_C'>
        <div className='review_Content_C'>
          {items.map((item, index) => (
            <div className='R_Wrapp' key={index}>
              <div className='RandR'>
                <Rating name='read-only' value={getRating[index]} readOnly />
                {getRating[index] === 0 && <h1>Worst hotel</h1>}
                {getRating[index] === 1 && <h1>Bad hotel</h1>}
                {getRating[index] === 2 && <h1>Okay hotel</h1>}
                {getRating[index] === 3 && <h1>Avarage hotel</h1>}
                {getRating[index] === 4 && <h1>Good hotel</h1>}
                {getRating[index] === 5 && <h1>Exellent hotel</h1>}
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
