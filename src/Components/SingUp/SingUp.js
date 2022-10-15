import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';

const auth = getAuth(app);

const SingUp = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const handleLogin = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setSuccess(true)
            })
            .catch(error => {
                console.error('error', error)
                setSuccess(false)
            })
    }
    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please Enter your email that you want to reset password')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Email has sent please , check your email')
            })
            .catch(error => {
                console.error('error', error)
            })

    }
    const handleResetPassword = (event) => {
        const email = event.target.value;
        console.log(email)
        setUserEmail(email)
    }
    return (
        <div>
            <h3 className='text-success mb-3 mt-3'>Log in hare</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input onBlur={handleResetPassword} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Enter your email" required></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Enter your password" required></input>
                    {
                        success && <p className='text-success mt-2'>Successfully Log In</p>
                    }
                </div>
                <button className=' btn btn-success' type="submit">Log In</button>
            </form>

            <p className='text-danger'> <small> New to this website ? Please <Link to='/singUp'>Register</Link></small></p>
            <p>Forget Password ?<button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset Password</button> </p>
        </div>
    );
};

export default SingUp;