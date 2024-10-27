import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import connectJs from "../../connect";
import axios from "axios";
import {useSetRecoilState} from 'recoil';
import {userAtom} from '../../state/user';

const Login = () => {

    const { backEndLink } = connectJs;
    const setUserAtom = useSetRecoilState(userAtom);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`${backEndLink}/auth`, {
                email, password
            }, {
                withCredentials: true,
            })
            setUserAtom({...response.data,isAuthenticated:true});
            navigate("/");
        }
        catch (error) {
            console.log("error", error);
        }
        
    };

    return (
        <div className="flex items-start p-10 justify-center  bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
                    Login
                </button>
                <div className='flex items-center justify-center mt-4'>
                    New user ? Sign Up here
                </div>
                <button onClick={() => { navigate("/signup") }} className="mt-4 w-full bg-purple-600 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Login;