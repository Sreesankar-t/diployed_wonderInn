export const userColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'user',
    headerName: 'User',
    width: 100,
    renderCell: params => {
      return (
        <div className='cellWithImg'>
          <img
            className='cellImg'
            src={params.row.img || 'https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif'}
            alt='avatar'
          />
          {params.row.username}
        </div>
      )
    }
  },
  { field: 'name', headerName: 'name', width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    width: 350
  },

  {
    field: 'phone',
    headerName: 'Phone',
    width: 180
  }
]

export const hotelColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'name',
    headerName: 'Name',
    width: 130
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    width: 170
  },

  {
    field: 'address',
    headerName: 'Address',
    width: 350
  }
]

export const ListHotelColumns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'Name',
    width: 100
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200
  },
  {
    field: 'city',
    headerName: 'City',
    width: 80
  },

  {
    field: 'distance',
    headerName: 'D(km)',
    width: 80
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100
  },
  {
    field: 'cheapestPrice',
    headerName: 'Price(₹)',
    width: 100
  }
]

export const roomColumns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'title',
    headerName: 'Title',
    width: 180
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 400
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 80
  },
  {
    field: 'maxPeople',
    headerName: 'Max People',
    width: 120
  }
]

export const Bookingcolumns = [
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 120
  },
  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 120
  },
  {
    field: 'roomTitle',
    headerName: 'Romm',
    width: 120
  },
  {
    field: 'totalAmount',
    headerName: 'BooKing Charge',
    width: 120
  },
  {
    field: 'roomDesc',
    headerName: 'Fecility',
    width: 200
  },
  {
    field: 'roomNumbers',
    headerName: 'roomNumbers',
    cell: row => (
      <ul>
        {row.roomNumbers.map(roomNumber => (
          <li key={roomNumber}>{roomNumber}</li>
        ))}
      </ul>
    ),
    width: 100
  },
  {
    field: 'startDate',
    headerName: 'Check_in_date',
    width: 150
  },
  {
    field: 'endDate',
    headerName: 'Check_out_date',
    width: 150
  }
]

export const blogColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'title',
    headerName: 'Title',
    width: 280
  },
  {
    field: 'summary',
    headerName: 'summary',
    width: 400
  },

  {
    field: 'createdAt',
    headerName: 'Date',
    width: 200
  }
]

export const bookingColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 180
  },
  {
    field: 'hotelType',
    headerName: 'hotelType',
    width: 110
  },

  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 280
  },
  {
    field: 'roomTitle',
    headerName: 'Room',
    width: 110
  },
  {
    field: 'roomDesc',
    headerName: 'Facility',
    width: 270
  }
]

export const ownerBookingColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 120
  },
  {
    field: 'hotelType',
    headerName: 'hotelType',
    width: 100
  },

  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 300
  },
  {
    field: 'roomTitle',
    headerName: 'Room',
    width: 80
  },
  {
    field: 'roomDesc',
    headerName: 'Facility',
    width: 350
  }
]
