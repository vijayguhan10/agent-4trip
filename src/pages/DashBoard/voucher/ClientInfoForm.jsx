function ClientInfoForm({ formData, onChange }) {
  const inputStyles = "w-full border border-gray-300 rounded-md px-3 py-2";

  return (
    <div className="bg-white p-6 rounded-lg shadow-card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Client Name
          </label>
          <input 
            type="text" 
            value={formData.clientName}
            onChange={(e) => onChange('root', 'clientName', e.target.value)}
            placeholder="Enter the client's name"
            className={inputStyles}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Travel location
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={formData.travelLocation}
              onChange={(e) => onChange('root', 'travelLocation', e.target.value)}
              placeholder="Enter the location"
              className={`${inputStyles} pr-8`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Booking ID
          </label>
          <input 
            type="text" 
            value={formData.bookingId}
            onChange={(e) => onChange('root', 'bookingId', e.target.value)}
            placeholder="#299951"
            className={inputStyles}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Phone number
          </label>
          <input 
            type="tel" 
            value={formData.phoneNumber}
            onChange={(e) => onChange('root', 'phoneNumber', e.target.value)}
            placeholder="Enter the client's phone number"
            className={inputStyles}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Email Address
          </label>
          <input 
            type="email" 
            value={formData.emailAddress}
            onChange={(e) => onChange('root', 'emailAddress', e.target.value)}
            placeholder="Enter the client's email address"
            className={inputStyles}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Personal Message
          </label>
          <textarea 
            rows="4" 
            value={formData.personalMessage}
            onChange={(e) => onChange('root', 'personalMessage', e.target.value)}
            className={`${inputStyles} resize-none`}
            placeholder="Type your message here..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">
            Upload Itinerary
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-text-gray bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Upload itinerary PDF</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <select 
                  value={formData.travelType}
                  onChange={(e) => onChange('root', 'travelType', e.target.value)}
                  className={`${inputStyles} appearance-none`}
                >
                  <option value="Adventure">Adventure</option>
                  <option value="Business">Business</option>
                  <option value="Leisure">Leisure</option>
                  <option value="Family">Family</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInfoForm;
