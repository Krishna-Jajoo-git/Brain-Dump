import { useState, useEffect } from 'react';
import { apiRequest } from '../api';
import toast from 'react-hot-toast';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get user info from localStorage to check permissions
    const currentUserId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    const fetchAllNotes = async () => {
        try {
            const data = await apiRequest('/api/notes');
            setNotes(data);
        } catch (err) {
            // Error is already toasted by apiRequest!
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this thought?")) return;
        try {
            await apiRequest(`/api/notes/${id}`, { method: 'DELETE' });
            toast.success("Note deleted!");
            fetchAllNotes(); // Refresh the list
        } catch (err) { }
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading the Brain Dump...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#ffffff', marginBottom: '30px' }}>🌐 Global Brain Dump</h1>
            <hr style={{ border: '0', borderTop: '1px solid #323232', marginBottom: '30px' }} />

            <div className='notes-list'>
                {notes.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#b0b0b0' }}>The void is empty. No thoughts yet.</p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} style={noteCardStyle}>
                            {/* 🛠️ PERMISSION CHECK: Only show buttons if Owner or Admin */}
                            {(currentUserId === note.user?._id || userRole === 'admin') && (
                                <div style={actionButtonsContainer}>
                                    <button onClick={() => handleDelete(note._id)} style={deleteBtnStyle}>Delete</button>
                                </div>
                            )}

                            <h3 style={titleStyle}>{note.title}</h3>
                            <p style={descStyle}>{note.description}</p>
                            
                            <div style={footerStyle}>
                                <span>✍️ {note.user?.username || 'Anonymous'}</span>
                                <span>📅 {new Date(note.time).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// --- Using Your Signature Styles ---
const noteCardStyle = {
    background: '#282727', padding: '25px', borderRadius: '12px',
    marginBottom: '20px', borderLeft: '6px solid #8f7b22',
    borderBottom: '2px solid #323232', position: 'relative'
};

const titleStyle = { margin: '0 0 10px 0', color: '#d4d4d4', fontSize: '1.4rem' };
const descStyle = { color: '#b0b0b0', lineHeight: '1.6', margin: '0 0 15px 0' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8f7b22', borderTop: '1px solid #323232', paddingTop: '10px' };
const actionButtonsContainer = { position: 'absolute', top: '15px', right: '15px' };
const deleteBtnStyle = { background: '#8f7b22', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' };

export default Home;