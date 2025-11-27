import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../services/UserService'

function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [address, setAddress] = useState('')

    const [msg, setMsg] = useState('')

    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        role: '',
        address: ''
    })

    const Register = async (e) => {
        e.preventDefault();
        const user = {
            username, email, password, gender, role, address
        };

        if (validateForm()) {
            try {
                const response = await createUser(user);
                console.log(response.data);
                setMsg(response.data);
                navigate("/login");
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                setMsg(error.response ? error.response.data : error.message);
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (username.trim()) {
            errorsCopy.username = '';
        } else {
            errorsCopy.username = "Username is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        if (password.trim()) {
            errorsCopy.password = '';
        } else {
            errorsCopy.password = "Password is required";
            valid = false;
        }

        if (gender.trim()) {
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = "Gender is required";
            valid = false;
        }

        if (role.trim()) {
            errorsCopy.role = '';
        } else {
            errorsCopy.role = "Role is required";
            valid = false;
        }

        if (address.trim()) {
            errorsCopy.address = '';
        } else {
            errorsCopy.address = "Address is required";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className='text-center m-2'>Register Here</h2>
                        <div className="card-body">
                            <form onSubmit={Register} method='post'>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Username:</label>
                                    <input type="text"
                                        placeholder='Enter Username'
                                        name='firstName'
                                        value={username}
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        required
                                    />
                                    {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>User Email:</label>
                                    <input type="text"
                                        placeholder='Enter Email'
                                        name='lastName'
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Password:</label>
                                    <input type="password"
                                        placeholder='Enter Password'
                                        name='password'
                                        value={password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Gender:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="gender"
                                            value='male'
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Male                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input class="form-check-input" type="radio" name="gender"
                                            value='female'
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Female
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input class="form-check-input" type="radio" name="gender"
                                            value='other'
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Other
                                        </label>
                                    </div>
                                    {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Role:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                                            value='admin'
                                            onChange={(e) => setRole(e.target.value)}
                                            disabled
                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                                            value='customer'
                                            onChange={(e) => setRole(e.target.value)}

                                        />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Customer
                                        </label>
                                    </div>
                                    {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Address:</label>
                                    <textarea
                                        rows="3"
                                        placeholder='Enter Address'
                                        name='address'
                                        value={address}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-success' type='submit' value='SUBMIT FORM'>Submit</button>
                                </div>
                            </form>
                        </div>
                        {msg && <h6 className="text-center border border-dark p-2 rounded text-danger">{msg}</h6>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register