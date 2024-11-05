import React, { useState } from 'react';

export default function ProfessMaterial() {
    const [wordDocument, setWordDocument] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState('');

    const handleWordDocumentChange = (e) => setWordDocument(e.target.files[0]);
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Ensure at least one file is selected
        if (!wordDocument && !pdfDocument) {
            setError('Please upload at least one document (PDF or Word).');
            return;
        }
        setError(''); // Clear error if validation passes

        // Handle form submission
        console.log('Word Document:', wordDocument);
        console.log('PDF Document:', pdfDocument);
        // Here, you would typically upload the data to a server or perform other actions
    };

    return (
        <>
            <main>
                <center>
                    <h1 style={{ fontSize: "40px" }}>
                        <b>
                            Add Material
                        </b>
                    </h1>
                </center>
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload Word Document</label>
                            <input 
                                type="file" 
                                accept=".doc,.docx" 
                                onChange={handleWordDocumentChange} 
                                className="w-full px-3 py-2 border rounded-lg" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload PDF</label>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handlePdfDocumentChange} 
                                className="w-full px-3 py-2 border rounded-lg" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
