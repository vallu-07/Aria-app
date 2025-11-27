import React, { useState } from 'react'
import { loginUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = {
            email, password
        }

        try {
            const response = await loginUser(loginData);
            console.log(response);
            if (response === 'adminHome') {
                // Redirect or do something specific for admin
                navigate('/admin')
                console.log('Redirecting to adminHome');
            } else if (response === 'customerHome') {
                localStorage.setItem('userEmail', loginData.email);
                navigate('/customer')
                console.log('Redirecting to customerHome');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            setError('Login failed !! Invalid Credentials');
        }
    }


    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 shadow">
                        <h2 className='text-center m-2'>Login</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label htmlFor='email' className='form-label'>User Email:</label>
                                    <input type="text"
                                        placeholder='Enter Email'
                                        name='email'
                                        value={email}
                                        className={`form-control`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor='password' className='form-label'>Password:</label>
                                    <input type="password"
                                        placeholder='Enter Password'
                                        name='password'
                                        value={password}
                                        className={`form-control`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-success' onClick={handleLogin} value='SUBMIT FORM'>Login</button>
                                </div>
                            </form>
                            {error && <div>{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login