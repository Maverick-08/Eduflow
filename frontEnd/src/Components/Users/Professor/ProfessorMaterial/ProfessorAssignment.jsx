import React, { useState } from 'react';

export default function ProfessorAssignment() {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [manualGrade, setManualGrade] = useState('');
    const [instructions, setInstructions] = useState('');
    const [dueDateOption, setDueDateOption] = useState(''); // New state for due date option (No Due Date / Select Calendar)
    const [dueDate, setDueDate] = useState(''); // New state for due date value
    const [pdfDocument, setPdfDocument] = useState(null);
    const [error, setError] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleGradeChange = (e) => {
        const selectedGrade = e.target.value;
        setGrade(selectedGrade);
        if (selectedGrade !== 'select') {
            setManualGrade(''); // Reset manual grade if Ungraded or other option is selected
        }
    };
    const handleManualGradeChange = (e) => setManualGrade(e.target.value);
    const handleInstructionsChange = (e) => setInstructions(e.target.value);
    const handleDueDateOptionChange = (e) => setDueDateOption(e.target.value); // Handle due date option change
    const handleDueDateChange = (e) => setDueDate(e.target.value); // Handle due date change
    const handlePdfDocumentChange = (e) => setPdfDocument(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Check that title, grade, instructions, due date, and at least one file (PDF) is filled
        if (!title || !grade || (grade === 'select' && !manualGrade) || !instructions || (dueDateOption === 'calendar' && !dueDate) || !pdfDocument) {
            setError('Please fill in all fields and upload a PDF document.');
            return;
        }
        setError(''); // Clear error if validation passes

        // Handle form submission
        console.log('Title:', title);
        console.log('Grade:', grade === 'select' ? manualGrade : grade);
        console.log('Instructions:', instructions);
        console.log('Due Date Option:', dueDateOption);
        console.log('Due Date:', dueDate); // Log due date
        console.log('PDF Document:', pdfDocument);
    };

    return (
        <>
            <main>
                <center>
                    <h1 style={{ fontSize: "40px" }}>
                        <b>
                            Create Assignment
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
                    {/* Grade Dropdown with manual input option */}
                    <select
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
                        value={grade}
                        onChange={handleGradeChange}
                    >
                        <option value="">Select grade</option>
                        <option value="select">Select manually</option>
                        <option value="Ungraded">Ungraded</option>
                    </select>
                    {/* Manual grade input when "Select manually" is chosen */}
                    {grade === 'select' && (
                        <input
                            type="number"
                            style={{ border: "1px solid gray", width: "100%", padding: "3px", marginTop: "10px" }}
                            value={manualGrade}
                            onChange={handleManualGradeChange}
                            placeholder="Enter grade (number)"
                        />
                    )}
                    <br />
                    <br />
                    <textarea
                        rows={5} 
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }} 
                        value={instructions}
                        onChange={handleInstructionsChange}
                        placeholder='Enter instructions' 
                    />
                    <br />
                    <br />
                    {/* Due Date Option Dropdown */}
                    <select
                        style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
                        value={dueDateOption}
                        onChange={handleDueDateOptionChange}
                    >
                        <option value="">Select due date option</option>
                        <option value="no_due_date">No Due Date</option>
                        <option value="calendar">Select Calendar</option>
                    </select>
                    <br />
                    <br />
                    {/* Conditionally render the calendar input only if "Select Calendar" is selected */}
                    {dueDateOption === 'calendar' && (
                        <input 
                            type="date"
                            style={{ border: "1px solid gray", width: "100%", padding: "3px" }}
                            value={dueDate}
                            onChange={handleDueDateChange}
                        />
                    )}
                    <br />
                    <br />
                    <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
                    <form onSubmit={handleSubmit}>
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
                            Assign
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
