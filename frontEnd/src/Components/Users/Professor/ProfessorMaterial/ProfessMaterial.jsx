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
        if (!title || !instructions || !pdfDocument) {
            setError('Please fill in all fields and upload a PDF document.');
            return;
        }
        setError('');

        console.log('Title:', title);
        console.log('Instructions:', instructions);
        console.log('PDF Document:', pdfDocument);
    };

    return (
        <>
            <main className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
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
