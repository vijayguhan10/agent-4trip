function HotelInformation({ hotel, onChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <h2 className="text-lg font-medium mb-4">Hotel Information</h2>
      
      <div className="p-4 border border-border-gray rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              Hotel Name
            </label>
            <input 
              type="text" 
              value={hotel.hotelName}
              onChange={(e) => onChange('hotel', 'hotelName', e.target.value)}
              placeholder="Enter hotel name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">
              Booking Number
            </label>
            <input 
              type="text" 
              value={hotel.bookingNumber}
              onChange={(e) => onChange('hotel', 'bookingNumber', e.target.value)}
              placeholder="Enter booking number"
            />
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-dark mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Check-In Date
            </label>
            <input 
              type="date" 
              value={hotel.checkInDate}
              onChange={(e) => onChange('hotel', 'checkInDate', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-dark mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              check out date
            </label>
            <input 
              type="date" 
              value={hotel.checkOutdate}
              onChange={(e) => onChange('hotel', 'checkOutdate', e.target.value)}
            />
          </div>
        </div>
          
          <button className="text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Upload PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelInformation