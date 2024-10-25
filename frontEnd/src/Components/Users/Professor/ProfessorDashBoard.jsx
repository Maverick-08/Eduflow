import React from 'react'

export default function ProfessorDashBoard() {
    const courses = [
        { title: "Machine Learning (The...", year: "2020-2023", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-gray-700" },
        { title: "Data Mining 2023", year: "", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
        { title: "Data Mining 2023", year: "", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
        { title: "Data Mining 2023", year: "", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
        { title: "Data Mining 2023", year: "", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
        { title: "Data Mining 2023", year: "", teacher: "", image: "https://placehold.co/100x100", bgColor: "bg-purple-600" },
    ];

    const handleAddClass = () => {
        console.log("adding class");
    }
    return (
        <>
            <main className="flex-1 p-6" style={{ height: "100vh" }}>
                <header className="flex items-center justify-start mb-6">
                    <h1 className="text-2xl font-semibold mr-6">Classes</h1>
                    <h1
                        onClick={handleAddClass}
                        style={{
                            "border": "2px solid black",
                            borderRadius: "100px",
                            padding: "0px 10px 4px 10px",
                            cursor: "pointer"
                        }}
                        className="text-2xl font-semibold"
                    >
                        +
                    </h1>

                </header>
                <div className="grid grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className={`p-4 ${course.bgColor} text-white relative`}>
                                <h2 className="text-lg font-semibold">{course.title}</h2>
                                {course.year && <p className="text-sm">{course.year}</p>}
                                <div className="absolute bottom-2 right-2">
                                    {course.image ? (
                                        <img src={course.image} alt="Teacher" className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center">{course.initial}</div>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600">{course.teacher}</p>
                            </div>
                            <div className="flex justify-between p-4 border-t">
                                <i className="fas fa-clipboard text-gray-600"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
