import { useState } from "react";
import TemplateSelector from "../voucher/TemplateSelector";
import ClientInfoForm from "../voucher/ClientInfoForm";
import TravelInformation from "../voucher/TravelInformation";
import HotelInformation from "../voucher/HotelInformation";
import PreviewCard from "../voucher/PreviewCard";
import ActionButtons from "../voucher/ActionButtons";

function VoucherModel() {
  const [formData, setFormData] = useState({
    templateId: "1",
    clientName: "",
    travelLocation: "",
    bookingId: "",
    phoneNumber: "",
    emailAddress: "",
    personalMessage: "",
    travelType: "Adventure",
    flights: [{ pnrNumber: "", destination: "", departure: "", return: "" }],
    hotel: {
      hotelName: "",
      bookingNumber: "",
      checkInDate: "",
      checkOutdate: "",
    },
  });

  const handleInputChange = (section, field, value, index = null) => {
    if (section === "root") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else if (section === "flights" && index !== null) {
      const updatedFlights = [...formData.flights];
      updatedFlights[index] = { ...updatedFlights[index], [field]: value };
      setFormData((prev) => ({ ...prev, flights: updatedFlights }));
    } else if (section === "hotel") {
      setFormData((prev) => ({
        ...prev,
        hotel: { ...prev.hotel, [field]: value },
      }));
    }
  };

  const addFlight = () => {
    setFormData((prev) => ({
      ...prev,
      flights: [
        ...prev.flights,
        { pnrNumber: "", destination: "", departure: "", return: "" },
      ],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Left Column - Forms */}
          {/* <TemplateSelector 
            selectedTemplate={formData.templateId}
            onSelectTemplate={(id) => handleInputChange('root', 'templateId', id)}
          /> */}

          <ClientInfoForm formData={formData} onChange={handleInputChange} />

          <TravelInformation
            flights={formData.flights}
            travelType={formData.travelType}
            onChange={handleInputChange}
            onAddFlight={addFlight}
          />

          <HotelInformation
            hotel={formData.hotel}
            onChange={handleInputChange}
          />

          <div className="mt-6">
            <button className="btn-primary">Apply Changes</button>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Right Column - Preview and Actions */}
          <div className="sticky top-8 space-y-4">
            <PreviewCard formData={formData} />
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherModel;
