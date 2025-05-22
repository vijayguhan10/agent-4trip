import { useState, useRef, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api from "../../../utils/axios";

function VoucherModel() {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [summary, setSummary] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [Logo, setLogo] = useState("");
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/agent/profile");
        const data = response.data;
        console.log(data);
        setLogo(data.data.logo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setSummary(null);
    setResponseData(null);

    if (files.length === 0) {
      setSubmitError("Please upload at least one file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axios.post(
        "http://10.57.1.79:8000/upload-multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setSubmitSuccess(true);
      setSummary(response.data.summary);
      setResponseData(response.data);
    } catch (error) {
      setSubmitError(error.message || "Failed to submit the files");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(dataURL, "PNG", 0, 0, width, height);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span className="text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </button>
          {submitError && (
            <p className="mt-4 text-red-600 text-sm">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="mt-4 text-green-600 text-sm">
              Files submitted successfully.
            </p>
          )}
        </form>
      </div>

      {summary && responseData && (
        <>
          <div
            ref={invoiceRef}
            className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg text-gray-800 border border-gray-200"
          >
            <div className="flex flex-col items-center mb-8">
              {Logo && <img src={Logo} alt="Logo" className="h-14 mb-3" />}
              <h2 className="text-2xl font-bold text-blue-600">
                Travel & Hotel Invoice
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Generated Summary for Booking
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Trip Overview
              </h3>
              <p>{summary.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Traveler Info
                </h4>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {summary.traveler_info[0]?.full_name}
                </p>
                <p>
                  <span className="font-semibold">Companions:</span>{" "}
                  {summary.traveler_info[0]?.companions?.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Booking Details
                </h4>
                <p>
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {summary.accommodation_details[0]?.booking_id}
                </p>
                <p>
                  <span className="font-semibold">Guests:</span>{" "}
                  {summary.accommodation_details[0]?.guests}
                </p>
                <p>
                  <span className="font-semibold">Stay:</span>{" "}
                  {summary.accommodation_details[0]?.stay}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">
                Hotel Details
              </h4>
              <p>
                <span className="font-semibold">Hotel:</span>{" "}
                {summary.accommodation_details[0]?.hotel}
              </p>
              <p>
                <span className="font-semibold">Room Type:</span>{" "}
                {summary.accommodation_details[0]?.room_type}
              </p>
              <p className="font-semibold mt-2">Amenities:</p>
              <ul className="list-disc ml-6">
                {summary.accommodation_details[0]?.key_amenities?.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Cost Summary</h4>
              <p>
                <span className="font-semibold">Travel Total:</span> ₹
                {summary.cost_summary?.transportation}
              </p>
              <p>
                <span className="font-semibold">Accommodation Total:</span> ₹
                {summary.cost_summary?.accommodation}
              </p>
             
              <p className="mt-2 font-bold text-lg text-blue-700">
                Grand Total: ₹{summary.cost_summary?.total_trip_cost}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">
                Travel Details
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "Date",
                        "Mode",
                        "Train/Flight",
                        "Route",
                        "Seat",
                        "Time",
                        "Fare",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.travel_details?.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.mode_of_transport}</td>
                        <td className="px-4 py-2">
                          {item.train_or_flight_number}
                        </td>
                        <td className="px-4 py-2">{item.route}</td>
                        <td className="px-4 py-2">{item.seat}</td>
                        <td className="px-4 py-2">{item.time}</td>
                        <td className="px-4 py-2">{item.fare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={downloadPDF}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VoucherModel;
