import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"

export default function ProfessMaterial() {
    const [title, setTitle] = useState("");
    const [instructions, setInstructions] = useState("");
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState("");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleInstructionsChange = (e) => setInstructions(e.target.value);
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const path = window.location.pathname;
        const classString = path.split("/");
        const classID = classString[classString.length - 1];

        if (!title || !instructions || !pdfDocument) {
            setError("Please fill in all fields and upload a PDF document.");
            return;
        }
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("instructions", instructions);
        formData.append("pdfDocument", pdfDocument);
        formData.append("classID", classID);

        try {
            const response = await axios.post(
                "http://localhost:3000/uploadMaterial",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Material uploaded successfully!");
            // navigate(`ProfessorView/professorTask/${classID}`)
        } 
        catch (err) {
            console.error("Error uploading material:", err);
            setError("An error occurred while uploading the material. Please try again.");
        }
    };

    return (
        <>
            <main className="flex justify-center items-top bg-gray-50 p-3">
                <ToastContainer />
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                    <center>
                        <h1 className="text-3xl font-bold text-blue-700 mb-6">
                            Upload Materials
                        </h1>
                    </center>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <input
                            className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            rows={5}
                            className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                            value={instructions}
                            onChange={handleInstructionsChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Add Material (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handlePdfDocumentChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
