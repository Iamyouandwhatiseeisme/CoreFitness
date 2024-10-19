"use client";

import React from 'react';
export default function LoginPage() {
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
          window.location.href = '/' 
        } else {
            console.error('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="name" name="userName" placeholder="emilys" required />
            <input type="password" name="password" placeholder="emilyspass" required />
            <button type="submit">Login</button>
        </form>
    );
}
