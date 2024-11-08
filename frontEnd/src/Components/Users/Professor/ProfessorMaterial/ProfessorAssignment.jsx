import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function ProfessorAssignment() {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [manualGrade, setManualGrade] = useState('');
    const [instructions, setInstructions] = useState('');
    const [dueDateOption, setDueDateOption] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleGradeChange = (e) => {
        const selectedGrade = e.target.value;
        setGrade(selectedGrade);
        if (selectedGrade !== 'select') {
            setManualGrade('');
        }
    };
    const handleManualGradeChange = (e) => setManualGrade(e.target.value);
    const handleInstructionsChange = (e) => setInstructions(e.target.value);
    const handleDueDateOptionChange = (e) => setDueDateOption(e.target.value);
    const handleDueDateChange = (e) => setDueDate(e.target.value);
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const path = window.location.pathname;
        const classString = path.split("/");
        const classID = classString[classString.length - 1];

        if (!title || !grade || (grade === 'select' && !manualGrade) || !instructions || (dueDateOption === 'calendar' && !dueDate) || !pdfDocument) {
            setError('Please fill in all fields and upload a PDF document.');
            return;
        }
        setError('');

        const formData = new FormData();
        formData.append("title", title);
        formData.append("grade", grade === 'select' ? manualGrade : grade);
        formData.append("instruction", instructions);
        formData.append("deadline", dueDateOption === 'calendar' ? dueDate : null);
        formData.append("class_id", classID);
        formData.append("pdfDocument", pdfDocument);

        try {
            const response = await axios.post('http://localhost:3000/uploadAssignment', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success("Assignment uploaded successfully!");
        } catch (err) {
            console.error("Error uploading assignment:", err);
            setError("An error occurred while uploading the assignment. Please try again.");
        }
    };

    return (
        <>
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
                <ToastContainer />
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                    <center>
                        <h1 className="text-3xl font-bold mb-6 text-blue-700">Create Assignment</h1>
                    </center>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="space-y-4">
                        <input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="text" 
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter title" 
                        />
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={grade}
                            onChange={handleGradeChange}
                        >
                            <option value="">Select grade</option>
                            <option value="select">Select manually</option>
                            <option value="Ungraded">Ungraded</option>
                        </select>
                        {grade === 'select' && (
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={manualGrade}
                                onChange={handleManualGradeChange}
                                placeholder="Enter grade (number)"
                            />
                        )}
                        <textarea
                            rows={5} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={instructions}
                            onChange={handleInstructionsChange}
                            placeholder="Enter instructions" 
                        />
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dueDateOption}
                            onChange={handleDueDateOptionChange}
                        >
                            <option value="">Select due date option</option>
                            <option value="no_due_date">No Due Date</option>
                            <option value="calendar">Select Calendar</option>
                        </select>
                        {dueDateOption === 'calendar' && (
                            <input 
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dueDate}
                                onChange={handleDueDateChange}
                            />
                        )}
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-blue-600">Upload PDF</h2>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handlePdfDocumentChange} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Assign
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
