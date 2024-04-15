import React, { useState } from 'react';
import './Signup.css'; // Import your CSS file
import HeadingComp from './HeadingComp'; // Import HeadingComp component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('https://todo-backend-pgz7.onrender.com/api/v1/signin', inputs)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    const userData = response.data.user;
                    if (userData && userData._id) {
                        localStorage.setItem('user', JSON.stringify(userData));
                        localStorage.setItem('token', response.data.token);
                        sessionStorage.setItem('id', userData._id);
                        alert(response.data.message);
                        navigate('/todo');
                        setInputs({ email: '', password: '' });
                        
                        // Reload the page after successful sign-in
                        window.location.reload();
                    } else {
                        console.log('No _id found in response data.user');
                    }
                }
            })
            .catch((error) => {
                console.error('Error signing in:', error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(error.response.data.message);
                } else if (error.request) {
                    console.log(error.request);
                    alert('No response from server. Please try again later.');
                } else {
                    console.log('Error message:', error.message);
                    alert('Error occurred. Please try again later.');
                }
            });
    };
    
    return (
        <div className="signin">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card">
                            <img src="https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg" alt="Signin" className="card-img-top1" />
                            <div className="card-body">
                                <HeadingComp first="Sign" second="In" />
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className="form-control my-3"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        onChange={handleChange}
                                        value={inputs.email}
                                    />
                                    <input
                                        className="form-control my-3"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your Password"
                                        onChange={handleChange}
                                        value={inputs.password}
                                    />
                                    <button className="btn btn-primary btn-block my-3 animated-button" type="submit">
                                        SignIn
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
