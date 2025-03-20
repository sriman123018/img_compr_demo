import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import imageCompression from "browser-image-compression";
import { IoIosRefresh } from "react-icons/io";
import { toast } from "react-toastify";
import "../App.css";

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageDetails, setImageDetails] = useState({});
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedDetails, setCompressedDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [maxSizeMB, setMaxSizeMB] = useState(0.5); // Default compression size
  const fileInputRef = useRef(null);

  const successToast = () => {
    toast.success("Downloading...!", {
      position: "bottom-right",
      autoClose: 3000, // Closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light", // Change to 'dark' for dark theme
    });
  };

  const errorToast = () => {
    toast.error("Canceled...X", {
      position: "bottom-right",
      autoClose: 3000, // Closes after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light", // Change to 'dark' for dark theme
    });
  };

  const handleCompress = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true); // Show spinner for 1.5 sec

    setTimeout(async () => {
      try {
        const file = fileInputRef.current.files[0];
        const options = {
          maxSizeMB,
          maxWidthOrHeight: 800, // Resize if necessary
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const compressedSrc = URL.createObjectURL(compressedFile);

        setCompressedImage(compressedSrc);
        setCompressedDetails({
          name: compressedFile.name,
          size: (compressedFile.size / 1024).toFixed(2) + " KB",
          type: compressedFile.type,
        });

        setLoading(false);
        setShowModal(true); // Show modal after compression
      } catch (error) {
        console.error("Compression error:", error);
        alert("Failed to compress image!");
        setLoading(false);
      }
    }, 1000); // Show spinner for 1.5 sec
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageDetails({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type,
          width: img.width,
          height: img.height,
        });
      };

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    successToast();
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed_" + imageDetails.name;
    link.click();
    setShowModal(false);
  };

  return (
    <div className="container mt-2 d-flex flex-column align-items-center">
      <div
        className="border text-center shadow-lg"
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          borderRadius: "10px",
          borderStyle: "dashed",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <p style={{ marginTop: "30%" }}>
            <MdOutlineFileUpload size={150} />
            <p>Click and upload</p>
          </p>
        )}

        <button
          className="Reset"
          onClick={() => {
            setImage(null);
          }}
        >
          {image && <IoIosRefresh />}
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        className="form-control mt-3"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />

      {imageDetails.name && (
        <table className="table m-4 table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{imageDetails.name}</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{imageDetails.size}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{imageDetails.type}</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>
                {imageDetails.width} x {imageDetails.height}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Radio Buttons for Compression Size */}
      <div className="mt-2">
        <strong>Choose Compression Size:</strong>
        <div className="d-flex gap-3 mt-2">
          {[0.1, 0.5, 1, 2].map((size) => (
            <div key={size}>
              <input
                type="radio"
                id={`size${size}`}
                name="compressionSize"
                value={size}
                checked={maxSizeMB === size}
                onChange={() => setMaxSizeMB(size)}
              />
              <label htmlFor={`size${size}`} className="ms-1">
                {size}MB
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        className="btn btn-primary mt-3 px-5"
        onClick={handleCompress}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Compressing...
          </>
        ) : (
          "Compress"
        )}
      </button>

      {/* Modal for Compressed Image */}
      {showModal && (
        <div
          className="modal d-flex justify-content-center align-items-center shadow-lg"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="bg-white p-4 rounded"
            style={{ width: "400px", textAlign: "center" }}
          >
            <h5>Compressed Image</h5>
            <img
              src={compressedImage}
              alt="Compressed"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                marginBottom: "10px",
                objectFit: "contain",
              }}
            />
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{compressedDetails.name}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{compressedDetails.size}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{compressedDetails.type}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-success m-2" onClick={handleDownload}>
              Download
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                setShowModal(false);
                errorToast();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
