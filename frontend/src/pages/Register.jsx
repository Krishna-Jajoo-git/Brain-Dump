import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../api'; 
import ReCAPTCHA from "react-google-recaptcha";
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [captchaToken, setCaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) return toast.error("Please verify you are human!");

        try {
            // Using the apiRequest helper we just built!
            await apiRequest('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ 
                    ...formData, 
                    captchaToken,
                    fax_number: "" // The Honeypot: Bot Trap
                })
            });

            toast.success("Account created! Welcome, Krishna.");
            navigate('/login'); // Redirect to Login page
        } catch (err) {
            // Error is already toasted by apiRequest!
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ color: '#ffffff', textAlign: 'center', margin: '0 0 20px 0' }}>🚀 Join Brain Dump</h2>
                
                <input 
                    type="text" placeholder="Username" required
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    style={inputStyle} 
                />
                <input 
                    type="email" placeholder="Email" required
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={inputStyle} 
                />
                <input 
                    type="password" placeholder="Password (min 6 chars)" required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    style={inputStyle} 
                />

                {/* HONEYPOT (Hidden) */}
                <input type="text" name="fax_number" style={{ display: 'none' }} tabIndex="-1" />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        theme="dark"
                    />
                </div>

                <button type="submit" style={btnStyle}>Sign Up</button>
                <p style={{ color: '#b0b0b0', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{color: '#8f7b22', textDecoration: 'none'}}>Login</Link>
                </p>
            </form>
        </div>
    );
};


const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' };

const formStyle = { 
    background: '#282727', 
    padding: '30px', 
    borderRadius: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px', 
    width: '100%', 
    maxWidth: '400px', 
    borderLeft: '6px solid #8f7b22',
    borderTop: '6px solid #8f7b22',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};

const inputStyle = { 
    padding: '12px', 
    background: '#0d0d0d', 
    border: '1px solid #323232', 
    color: '#ffffff', 
    borderRadius: '8px',
    outline: 'none',
    colorScheme: 'dark'
};

const btnStyle = { 
    padding: '14px', 
    background: '#8f7b22', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '1rem'
};

export default Register;