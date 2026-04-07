import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import toast from 'react-hot-toast';

const EditNote = () => {
    const { id } = useParams(); // Grabs the ID from the URL
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // 1. Fetch the existing data to fill the inputs
    useEffect(() => {
        const fetchNote = async () => {
            try {
                // We'll add a 'get single note' logic or filter from all
                const allNotes = await apiRequest('/api/notes/me');
                const noteToEdit = allNotes.find(n => n._id === id);
                if (noteToEdit) {
                    setTitle(noteToEdit.title);
                    setDescription(noteToEdit.description);
                }
            } catch (err) { }
        };
        fetchNote();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await apiRequest(`/api/notes/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description })
            });
            toast.success("Thought Refined!");
            navigate('/my-notes'); // Redirect back home
        } catch (err) { }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleUpdate} style={formStyle}>
                <h2 style={{ color: '#ffffff', textAlign: 'center' }}>📝 Edit Your Thought</h2>
                
                <input 
                    type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle} 
                />
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ ...inputStyle, minHeight: '150px' }}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => navigate('/my-notes')} style={cancelBtn}>Cancel</button>
                    <button type="submit" style={saveBtn}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

// --- Your Signature Styles ---
const containerStyle = { display: 'flex', justifyContent: 'center', paddingTop: '50px' };
const formStyle = { background: '#282727', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '600px', borderLeft: '6px solid #8f7b22' };
const inputStyle = { padding: '15px', background: '#0d0d0d', border: '1px solid #323232', color: 'white', borderRadius: '8px', outline: 'none' };
const saveBtn = { flex: 2, padding: '12px', background: '#8f7b22', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const cancelBtn = { flex: 1, padding: '12px', background: '#323232', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };

export default EditNote;