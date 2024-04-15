import React, { useState } from 'react';
import './Signup.css'; // Import your CSS file
import HeadingComp from './HeadingComp'; // Import HeadingComp component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email:"", username:"", password:"" });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const submit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://todo-backend-pgz7.onrender.com/api/v1/register', inputs);
            if (response.status === 200) {
                alert(response.data.message);
                setInputs({ email:"", username:"", password:"" });
                navigate('/signin');
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                alert(errorMessage);
            } else {
                console.error("Error occurred:", error);
                alert("An error occurred. Please try again later.");
            }
        }
    }

    return (
        <div className="signup">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card">
                            <img src="https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg" alt="Signup" className="card-img-top" />
                            <div className="card-body">
                                <HeadingComp first="Sign" second="Up" />
                                <form onSubmit={submit}>
                                    <input className='form-control my-3' type="email" name='email' placeholder='Enter your Email' onChange={change} value={inputs.email}/>
                                    <input className='form-control my-3' type="username" name='username' placeholder='Enter your User Name' onChange={change} value={inputs.username} />
                                    <input className='form-control my-3' type="password" name='password' placeholder='Enter your Password' onChange={change} value={inputs.password}/>
                                    <button className='btn btn-primary btn-block my-3 animated-button' type="submit">SignUp</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
