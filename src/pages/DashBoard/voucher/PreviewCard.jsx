function PreviewCard({ formData }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card">
      <h2 className="text-lg font-medium mb-4">Preview</h2>
      
      <div className="aspect-[3/4] border border-border-gray rounded-lg overflow-hidden">
        <div className="h-full bg-yellow-50 p-4 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-medium">{formData.clientName || 'Client Name'}</h3>
            <div className="text-sm font-medium text-gray-600">#{formData.bookingId || 'Booking ID'}</div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-24">Phone no.:</span>
              <span>{formData.phoneNumber || '#0000000223'}</span>
            </div>
            
            <div className="flex">
              <span className="text-gray-500 w-24">Email address:</span>
              <span>{formData.emailAddress || 'mail@gmail.com'}</span>
            </div>
          </div>
          
          <div className="mt-auto">
            {formData.flights.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium">Flight Details:</h4>
                {formData.flights.map((flight, i) => (
                  <div key={i} className="text-xs mt-1">
                    {flight.destination && `To: ${flight.destination}`}
                    {flight.departure && ` - ${new Date(flight.departure).toLocaleDateString()}`}
                  </div>
                ))}
              </div>
            )}
            
            {formData.hotel.hotelName && (
              <div>
                <h4 className="text-sm font-medium">Hotel:</h4>
                <div className="text-xs mt-1">
                  {formData.hotel.hotelName}
                  {formData.hotel.checkInDate && ` - Check in: ${new Date(formData.hotel.checkInDate).toLocaleDateString()}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewCard