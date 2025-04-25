import { useState } from "react";
import axios from "axios";

function VoucherModel() {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [summary, setSummary] = useState("");
  const [individualExtractions, setIndividualExtractions] = useState({});

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
    setSummary("");
    setIndividualExtractions({});

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
        "http://10.57.1.249:8000/upload-multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmitSuccess(true);
      setSummary(response.data.summary);
      // setIndividualExtractions(response.data.individual_extractions);
    } catch (error) {
      setSubmitError(error.message || "Failed to submit the files");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF or Image Files
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Selected Files</h3>
              <ul className="space-y-2">
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
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Uploading..." : "Submit"}
            </button>
          </div>

          {submitError && (
            <p className="mt-4 text-red-600 text-sm">{submitError}</p>
          )}

          {submitSuccess && (
            <p className="mt-4 text-green-600 text-sm">
              Files submitted and summarized successfully.
            </p>
          )}
        </form>
      </div>

      {summary && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {Object.keys(individualExtractions).length > 0 && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Extracted Text (Per File)</h3>
          {Object.entries(individualExtractions).map(([filename, text], idx) => (
            <div key={idx} className="mb-6">
              <h4 className="font-bold text-blue-600">{filename}</h4>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded mt-2">
                {text}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VoucherModel;
