import React from 'react'
import { useNavigate } from 'react-router-dom';
import homeImage from "./homeImage.png"
export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <main class="flex justify-center align-center mt-12 p-8">
                <div class="max-w-lg">
                    <h1 class="text-6xl font-bold text-gray-900">Smooth journey with powerful management</h1>
                    <p class="text-gray-700 mt-10">Unlock your academic potential with a smart platform designed to streamline your studies and enhance your productivity effortlessly!.</p>
                    <div class="mt-6 flex items-center space-x-4">
                        <button class="bg-purple-600 text-white px-4 py-2 rounded">Get Started Now!</button>
                        <div>
                            <p class="text-gray-700">Join us now</p>
                            <a href="#" class="text-purple-600">Best Management tool</a>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={homeImage} style={{ width: "400px", height: "400px" }} alt="perons taking mock interview" />
                </div>
            </main>
        </div>
    );
}
