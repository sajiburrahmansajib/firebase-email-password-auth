import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';

const auth = getAuth(app)

const LoginForm = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false)

    const handleRegister = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        console.log(email, password)
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Provide at least two Upper Case character')
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password length at least 6 ')
            return;
        }
        if (!/(?=.*[!@#$&%*])/.test(password)) {
            setPasswordError('Password Must have at least one special case letter ')
            return;
        }
        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                setSuccess(true)
                console.log(user)
                form.reset();
                verifyEmail()
                setUserName(name)
            })
            .catch(error => {
                console.error('error', error)
                setPasswordError(error.message)
                setSuccess(false)
            })

    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Email Verification sent , Check your email')
            })
            .catch(error => {
                console.error('error', error)
            })
    }

    const setUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('Set user name success')
            })
            .catch(error => {
                console.error('error', error)
            })
    }
    return (
        <div>
            <h1 className='mb-4 text-primary'>Register hare !!!</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <h5 className='text-danger'>{passwordError}</h5>
                {
                    success && <p className='text-success'> User Successfully Created</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p className='text-success'> <small>Already have an Account ? Please <Link to='/login'>Log In</Link></small></p>
        </div>
    );
};

export default LoginForm;