import React from 'react'
import { useNavigate } from 'react-router-dom'

function Entry() {

    const navigate = useNavigate()

    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 bg-light shadow">
                        <div className="card-body text-center">
                            <h1 className='lead display-4'>Welcome to PlayForYou Music App</h1>
                            <h2><strong>Get Started</strong></h2>
                            <div className='d-grid gap-2'>
                                <button className='btn btn-success rounded-pill p-3' onClick={() => {
                                    navigate("/register")
                                }} >Sign Up</button>
                                <button className='btn btn-success rounded-pill p-3' onClick={() => {
                                    navigate("/login")
                                }} >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Entry