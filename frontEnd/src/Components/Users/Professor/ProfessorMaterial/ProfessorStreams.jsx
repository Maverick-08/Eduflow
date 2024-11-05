import React from 'react'

export default function ProfessorStreams() {
    return (
        <div>
            <header class="bg-blue-600 text-white p-6 flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">AI Practical Group A</h1>
                    <p class="text-lg">2020-2023</p>
                </div>
                <img src="https://placehold.co/100x100" alt="Illustration of books and headphones" class="w-24 h-24"/>
            </header>
            <div class="flex p-6">
                <aside class="w-1/4 bg-white p-4 rounded-lg shadow-md">
                    <h2 class="text-lg font-bold">Upcoming</h2>
                    <p class="text-gray-500">Woohoo, no work due soon!</p>
                    <a href="#" class="text-blue-600 mt-4 block">View all</a>
                </aside>
                <main class="w-3/4 ml-6">
                    <div class="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
                        <div class="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 font-bold text-xl">A</div>
                        <input type="text" placeholder="Announce something to your class" class="ml-4 w-full p-2 border border-gray-300 rounded-lg"/>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-file-alt text-blue-600"></i>
                            <p class="ml-2 font-bold">Sugandha Gupta posted a new assignment: Guidelines: Q18</p>
                        </div>
                        <p class="text-gray-500">Apr 6, 2023</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-file-alt text-blue-600"></i>
                            <p class="ml-2 font-bold">Sugandha Gupta posted a new assignment: Guidelines: Q16 and 17</p>
                        </div>
                        <p class="text-gray-500">Mar 28, 2023</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-file-alt text-blue-600"></i>
                            <p class="ml-2 font-bold">Sugandha Gupta posted a new assignment: Guidelines: Q8 and 14</p>
                        </div>
                        <p class="text-gray-500">Mar 23, 2023</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-file-alt text-blue-600"></i>
                            <p class="ml-2 font-bold">Sugandha Gupta posted a new assignment: Guidelines: Q9, 10 and 11 (concatenate, reverse and ...)</p>
                        </div>
                        <p class="text-gray-500">Mar 16, 2023</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
