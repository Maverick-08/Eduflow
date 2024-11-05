import React, { useState } from 'react';

export default function ProfessorAssignment() {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [wordDocument, setWordDocument] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleGradeChange = (e) => setGrade(e.target.value);
    const handleWordDocumentChange = (e) => setWordDocument(e.target.files[0]);
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Check that title, grade, and at least one file is filled
        if (!title || !grade || (!wordDocument && !pdfDocument)) {
            setError('Please fill in all fields and upload at least one document (PDF or Word).');
            return;
        }
        setError(''); // Clear error if validation passes

        // Handle form submission
        console.log('Title:', title);
        console.log('Grade:', grade);
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
                            Add Assignment
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
                    <input 
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }} 
                        type="text" 
                        value={grade}
                        onChange={handleGradeChange}
                        placeholder='Enter grade' 
                    />
                    <br />
                    <br />
                    <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
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
