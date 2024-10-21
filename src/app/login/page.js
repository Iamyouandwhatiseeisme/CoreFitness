"use client";
import {  useUser } from '../components/UserProvider/UserProvider';
import './index.css'
export default function LoginPage() {
    const { user, setUser } = useUser();
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const username = formData.get('userName');
        const password = formData.get('password');

        const response = await fetch('/api/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              username, 
              password,
              expiresInMins: 2
              }),
            credentials: 'include', 
        });

        if (response.ok) {
            const body = await response.json();
            
           var authedUser = {
                userName: body.username,
                email: body.email,
                lastName: body.lastName,
                gender: body.gender,
                image: body.image,
            }
            await setUser(authedUser);
            
            window.location.href = '/' 
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div className='login-page'>
            <h1>Welcome to Mushroom Kingdom</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <input className='login-input' type="name" name="userName" placeholder="Username" required />
                <input className='login-input' type="password" name="password" placeholder="Password" required />
                <button className='login-button' type="submit">Log in</button>
                <div className='forgotten-password'>Forgotten password?</div>
                <div className='horizontal-divider'></div>
                <button type='button' className='create-account-button'>Create New Account</button>
            </form>

        </div>
    );
}
