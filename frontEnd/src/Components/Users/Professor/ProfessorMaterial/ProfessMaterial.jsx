import React, { useState } from 'react';

export default function ProfessMaterial() {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleInstructionsChange = (e) => setInstructions(e.target.value);
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Check that title, instructions, and at least one file (PDF) is filled
        if (!title || !instructions || !pdfDocument) {
            setError('Please fill in all fields and upload a PDF document.');
            return;
        }
        setError(''); // Clear error if validation passes

        // Handle form submission
        console.log('Title:', title);
        console.log('Instructions:', instructions);
        console.log('PDF Document:', pdfDocument);
    };

    return (
        <>
            <main>
                <center>
                    <h1 style={{ fontSize: "40px" }}>
                        <b>
                            Materials
                        </b>
                    </h1>
                </center>
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <input
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder='Enter title'
                    />
                    <br />
                    <br />
                    <textarea
                        rows={5}
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
                        value={instructions}
                        onChange={handleInstructionsChange}
                        placeholder='Enter description'
                    />
                    <br />
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Add Material</label>
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
                            Post
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
