import React from 'react'
export default function Assignments() {
    return (
        <>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-700 text-white p-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Machine Learning (Theory)</h1>
                        <p className="text-lg">2020-2023</p>
                    </div>
                    <img src="https://placehold.co/100x100" alt="Illustration of a book, glasses, and a newspaper" className="w-24 h-24" />
                </div>
                <div className="p-4 flex space-x-4">
                    <div className="w-1/4">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h2 className="font-medium mb-2">Upcoming</h2>
                            <p className="text-purple-600">Woohoo, assignment to submit!</p>
                            <a href="#" className="text-purple-600 mt-2 inline-block">View all</a>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="bg-white shadow rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <input type="text" placeholder="Search Assignments" className="w-full border border-purple-300 rounded-lg p-2" />
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-file-alt text-purple-600"></i>
                                <div>
                                    <p className="font-medium">Aman Singh posted a new assignment: 2018 solutions</p>
                                    <p className="text-purple-600 text-sm">May 28, 2023</p>
                                </div>
                                <i className="fas fa-ellipsis-v text-purple-600 ml-auto"></i>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-file-alt text-purple-600"></i>
                                <div>
                                    <p className="font-medium">Aman Singh posted a new assignment: OBE 2021 solutions</p>
                                    <p className="text-purple-600 text-sm">May 28, 2023</p>
                                </div>
                                <i className="fas fa-ellipsis-v text-purple-600 ml-auto"></i>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-file-alt text-purple-600"></i>
                                <div>
                                    <p className="font-medium">Aman Singh posted a new assignment: Regularization</p>
                                    <p className="text-purple-600 text-sm">Apr 26, 2023</p>
                                </div>
                                <i className="fas fa-ellipsis-v text-purple-600 ml-auto"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}