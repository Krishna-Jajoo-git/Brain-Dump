import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import toast from 'react-hot-toast';

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchMyNotes = async () => {
        try {
            // This calls your /api/notes/me route (which uses the auth middleware)
            const data = await apiRequest('/api/notes/me');
            setNotes(data);
        } catch (err) { } 
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchMyNotes();
    }, []);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!title || !description) return toast.error("Fill both fields!");

        try {
            await apiRequest('/api/notes', {
                method: 'POST',
                body: JSON.stringify({ 
                    title, 
                    description,
                    fax_number: "" // The Honeypot (Security)
                })
            });
            
            toast.success("Thought Dumped!");
            setTitle('');
            setDescription('');
            fetchMyNotes(); // Refresh my private list
        } catch (err) { }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Sure want to delete?")) return;
        try {
            await apiRequest(`/api/notes/${id}`, { method: 'DELETE' });
            toast.success("Memory Erased.");
            fetchMyNotes();
        } catch (err) { }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ color: '#ffffff', textAlign: 'center' }}>📓 My Private Brain Dump</h1>

            {/* --- YOUR ORIGINAL FORM (Moved here) --- */}
            <form onSubmit={handleAddNote} style={formStyle}>
                <input 
                    type="text" placeholder="Note title" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle} 
                />
                <textarea 
                    placeholder="What's on your mind?" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ ...inputStyle, minHeight: '80px' }}
                />
                <button type="submit" style={btnStyle}>Dump</button>
            </form>

            <hr style={{ border: '0', borderTop: '1px solid #323232', margin: '40px 0' }} />

            {/* --- LIST OF MY NOTES --- */}
            <div className='my-notes-list'>
                {loading ? <p>Syncing thoughts...</p> : 
                 notes.length === 0 ? <p>Your private vault is empty.</p> :
                 notes.map((note) => (
                    <div key={note._id} style={noteCardStyle}>
                        <div style={actionRow}>
                             <Link to={`/edit/${note._id}`} style={editBtn}>Edit</Link>
                             <button onClick={() => handleDelete(note._id)} style={deleteBtn}>Delete</button>
                        </div>
                        <h3 style={{ color: '#d4d4d4', margin: '0 0 10px 0' }}>{note.title}</h3>
                        <p style={{ color: '#b0b0b0' }}>{note.description}</p>
                    </div>
                 ))
                }
            </div>
        </div>
    );
};

// --- Your Signature Styles ---
const formStyle = { background: '#282727', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '6px solid #8f7b22', borderTop: '6px solid #8f7b22' };
const inputStyle = { padding: '12px', background: '#0d0d0d', border: '1px solid #323232', color: 'white', borderRadius: '8px', outline: 'none' };
const btnStyle = { padding: '14px', background: '#8f7b22', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };
const noteCardStyle = { background: '#282727', padding: '20px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid #8f7b22' };
const actionRow = { display: 'flex', justifyContent: 'flex-end', gap: '10px' };
const editBtn = { background: '#8f7b22', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center' };
const deleteBtn = { background: 'none', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' };

export default MyNotes;