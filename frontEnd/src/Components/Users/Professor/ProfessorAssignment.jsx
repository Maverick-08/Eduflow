import React from 'react'

export default function ProfessorAssignment() {
    return (
        <>
            <main>
                <center>
                    <h1 style={{fontSize : "40px"}}>
                        <b>
                            Add Assignment
                        </b>
                    </h1>
                </center>
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload Word Document</label>
                            <input type="file" accept=".doc,.docx" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Upload PDF</label>
                            <input type="file" accept=".pdf" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
                    </form>
                </div>
            </main>
        </>
    )
}
