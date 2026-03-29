import { useState,useEffect } from 'react'

function App(){
    const [notes,setNotes]=useState([]);
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const API_URL=import.meta.env.VITE_API_URL

    const fetchNotes=async()=>{
        try{
            const response =await fetch(`${API_URL}/api/notes`)
            const data=await response.json()
            setNotes(data)
        }catch(err){
            console.error("Connection Failed :",err)
        }
    }

    useEffect(()=>{
        fetchNotes();  
    },[])

const handleAddNote=async ()=>{
    if(!title || !description){
        return alert("Fill both fields")
    }
    try{
        const response=await fetch(`${API_URL}/api/notes`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({title,description})
        })
        if(response.ok){
            setTitle('')
            setDescription('')
            fetchNotes();
        }}catch(err){
            console.log("error :",err)
            }
    }

    return(
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui' }}>
        <h1 style={{ 
            textAlign: 'center',
            color: '#1a1a1a',
            marginBottom: '30px' 
            }}>🧠 Brain Dump</h1>
        <hr style={{ border: '0', borderTop: '1px solid #ddd', marginBottom: '30px' }}/>
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px' 
      }}>
            <input 
            type="text"
            placeholder='Note title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{padding:'10px'}}
            />
            <textarea 
            placeholder="What's on your mind"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={{padding:'10px',minHeight:'80px'}}
            />
            <button 
            onClick={handleAddNote}
            style={{ 
                  padding: '14px', 
                  background: '#7a4caf', 
                  color: 'white', 
                  border: 'none', 
                  cursor: 'pointer', 
                  borderRadius: '10px', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  transition: 'background 0.3s'
                }}
            >Dump</button>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #ddd', marginBottom: '30px' }} />
        <div className='notes-list'>
          {notes.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888' }}>No thoughts dumped yet...</p>
          ) : (
              notes.map((note) => (
                  <div key={note._id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      borderLeft: '6px solid #7a4caf',
                      transition: 'transform 0.2s'
                  }}>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#1a1a1a' }}>{note.title}</h3>
                      <p style={{ color: '#4a4a4a', lineHeight: '1.6', margin: '0' }}>{note.description}</p>
                      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#999' }}>
                          {new Date(note.time).toLocaleString()}
                      </div>
                  </div>
              ))
          )}
      </div>
    </div>
    )
}


export default App