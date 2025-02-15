import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use React Router for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Trim input values to avoid unnecessary spaces
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Basic input validation
        if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
            alert('Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
            alert('Please enter a valid email.');
            setLoading(false);
            return;
        }

        if (trimmedPassword.length < 6) {
            alert('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            console.log('Registering with:', { trimmedUsername, trimmedEmail, trimmedPassword });

            const response = await fetch('http://localhost:8000/authenication/register', {
                method: 'POST',
                body: JSON.stringify({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Registration failed:', data);
                alert(`Error: ${data.message || 'Registration failed'}`);
                return;
            }

            console.log('Registration successful:', data);
            alert('Registration successful! Redirecting to login...');

            navigate('/login'); // Redirect user to login page
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;

