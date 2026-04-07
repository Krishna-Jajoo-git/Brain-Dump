import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, User, Globe, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    
    // 1. Logic: Check if the 'ID Card' (Token) exists in memory
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear(); // Wipe the memory
        toast.success("Logged out. See you soon, Krishna!");
        navigate('/login');
        window.location.reload(); // Refresh to reset the Navbar state
    };

    return (
        <nav style={navStyle}>
            {/* LOGO SECTION */}
            <Link title="Global Feed" to="/" style={logoStyle}>
                <Brain size={28} color="#8f7b22" />
                <span style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#ffffff' }}>Brain Dump</span>
            </Link>

            {/* NAVIGATION LINKS */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link title="Global Feed" to="/" style={linkStyle}><Globe size={20} /> Feed</Link>

                {token ? (
                    // SHOW THESE IF LOGGED IN
                    <>
                        <Link title="My Private Vault" to="/my-notes" style={linkStyle}>
                            <PlusCircle size={20} /> My Notes
                        </Link>
                        <div style={userBadge}>
                            <User size={16} /> {username}
                        </div>
                        <button onClick={handleLogout} style={logoutBtn} title="Logout">
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    // SHOW THESE IF LOGGED OUT
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={registerBtn}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

// --- Professional Dark/Gold Styles ---
const navStyle = {
    position: 'sticky', top: 0, zIndex: 1000,
    background: 'rgba(13, 13, 13, 0.9)', // Semi-transparent black
    backdropFilter: 'blur(10px)', // The "Glass" effect
    borderBottom: '1px solid #323232',
    padding: '15px 40px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};

const logoStyle = { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' };
const linkStyle = { color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' };
const userBadge = { background: '#1a1a1a', padding: '5px 12px', borderRadius: '20px', color: '#8f7b22', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #323232' };
const logoutBtn = { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const registerBtn = { background: '#8f7b22', color: 'white', padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' };

export default Navbar;