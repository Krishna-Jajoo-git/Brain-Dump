import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../api'; 
import ReCAPTCHA from "react-google-recaptcha";
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!captchaToken) return toast.error("Please complete the CAPTCHA");

        try {
            // 1. Send the login request
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password, captchaToken })
            });

            // 2. SUCCESS: Store the 'ID Card' in LocalStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.id); // Important for Owner checks!
            localStorage.setItem('role', data.role); // Important for Admin checks!

            toast.success(`Welcome back, ${data.username}!`);
            
            // 3. Redirect to the Home feed
            navigate('/');
            window.location.reload(); // Refresh to update the Navbar state
        } catch (err) {
            // Errors are handled by our apiRequest toast!
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleLogin} style={formStyle}>
                <h2 style={{ color: '#ffffff', textAlign: 'center', margin: '0 0 20px 0' }}>🔐 Access Brain Dump</h2>
                
                <input 
                    type="email" placeholder="Email Address" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle} 
                />
                <input 
                    type="password" placeholder="Password" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle} 
                />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        theme="dark"
                    />
                </div>

                <button type="submit" style={btnStyle}>Login</button>
                
                <p style={{ color: '#b0b0b0', textAlign: 'center', fontSize: '0.9rem' }}>
                    New here? <Link to="/register" style={{color: '#8f7b22', textDecoration: 'none'}}>Create Account</Link>
                </p>
            </form>
        </div>
    );
};

// --- Styles (Matching your Register page) ---
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' };
const formStyle = { 
    background: '#282727', padding: '30px', borderRadius: '16px', 
    display: 'flex', flexDirection: 'column', gap: '15px', 
    width: '100%', maxWidth: '400px', 
    borderRight: '6px solid #8f7b22', borderBottom: '6px solid #8f7b22',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};
const inputStyle = { padding: '12px', background: '#0d0d0d', border: '1px solid #323232', color: '#ffffff', borderRadius: '8px', outline: 'none', colorScheme: 'dark' };
const btnStyle = { padding: '14px', background: '#8f7b22', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };

export default Login;