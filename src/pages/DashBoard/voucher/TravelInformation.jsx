function TravelInformation({ flights, travelType, onChange, onAddFlight, onFileUpload }) {
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload("flights", file, index);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <h2 className="text-lg font-medium mb-4">Travel Information</h2>
      
      <div className="mb-4 flex space-x-4">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="travelMode" 
            value="airplane" 
            className="form-radio h-4 w-4 text-primary" 
            defaultChecked 
          />
          <span className="ml-2">By airplane</span>
        </label>
        
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="travelMode" 
            value="road" 
            className="form-radio h-4 w-4 text-primary" 
          />
          <span className="ml-2">By road</span>
        </label>
      </div>
      
      {flights.map((flight, index) => (
        <div key={index} className="mb-6 p-4 border border-border-gray rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                PNR number
              </label>
              <input 
                type="text" 
                value={flight.pnrNumber}
                onChange={(e) => onChange('flights', 'pnrNumber', e.target.value, index)}
                placeholder="Enter PNR number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Destination
              </label>
              <input 
                type="text" 
                value={flight.destination}
                onChange={(e) => onChange('flights', 'destination', e.target.value, index)}
                placeholder="Enter destination"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-dark mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Departure
              </label>
              <input 
                type="date" 
                value={flight.departure}
                onChange={(e) => onChange('flights', 'departure', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-dark mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Return
              </label>
              <input 
                type="date" 
                value={flight.return}
                onChange={(e) => onChange('flights', 'return', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <label className="flex items-center text-primary cursor-pointer">
              <input 
                type="file" 
                onChange={(e) => handleFileChange(e, index)}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              {flight.flightFile ? flight.flightFile.name : "Upload PDF"}
            </label>
          </div>
        </div>
      ))}
      
      <button 
        type="button"
        className="flex items-center text-primary hover:text-primary-dark font-medium"
        onClick={onAddFlight}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add another
      </button>
    </div>
  );
}

export default TravelInformation;