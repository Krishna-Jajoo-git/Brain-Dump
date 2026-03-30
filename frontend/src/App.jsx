import { useState,useEffect } from 'react'

function App(){
    const [notes,setNotes]=useState([]);
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [Update,setUpdate]=useState(null);
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
        document.body.style.margin='0'
        document.body.style.backgroundColor='#000000'
        fetchNotes();  
    },[])

const handleAddNote=async ()=>{
    if(!title || !description){
        return alert("Fill both fields")
    }
    const url = Update?`${API_URL}/api/notes/${Update}`:`${API_URL}/api/notes`;
    const method=Update?'PUT':'POST'
    try{
        const response=await fetch(url,{
            method:method,
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({title,description})
        })
        if(response.ok){
            setTitle('')
            setDescription('')
            setUpdate(null)
            fetchNotes();
        }}catch(err){
            console.log("error :",err)
            }
    }

    const handleDelete=async (id)=>{
        if(!window.confirm("Sure want to delete"))
            return;
        try{
            const response=await fetch(`${API_URL}/api/notes/${id}`,{method : 'DELETE',})
            if(response.ok){
                fetchNotes();
            }
            else{
                console.log("Unable to find note")
            }
        }catch(err){
            console.log("Error detected : ",err)
        }
    }

    const handleUpdate=async (note)=>{
        setUpdate(note._id)
        setTitle(note.title)
        setDescription(note.description)
        window.scrollTo({top:0,behavior:'smooth'})
    }

    return(
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', padding: '40px 20px', 
        fontFamily: 'system-ui' 

    }}>
        <h1 style={{ 
            textAlign: 'center',
            color: '#ffffff',
            marginBottom: '30px' 
            }}>🧠 Brain Dump</h1>
        <hr style={{ border: '0', borderTop: '1px solid #323232', marginBottom: '30px' }}/>
        <div style={{ 
          background: '#282727', 
          padding: '25px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '6px solid #8f7b22',
          borderTop: '6px solid #8f7b22',
          gap: '15px' 
      }}>
            <input 
            type="text"
            placeholder='Note title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
                padding:'10px',
                background:'#0d0d0d',
                color:'#ffffff',
                border:"1px solid #323232",
                transition: 'border-color 0.3s, box-shadow 0.3s',
                //outline:'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 8px #8f7b22'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
            <textarea 
            placeholder="What's on your mind"
            color='white'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={{
                padding:'10px',
                minHeight:'80px',
                background:'#0d0d0d',
                color:'#ffffff',
                border:"1px solid #323232",
                transition: 'border-color 0.3s, box-shadow 0.3s',
                //outline:'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 8px #8f7b22'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
            <button 
            onClick={handleAddNote}
            style={{ 
                  padding: '14px', 
                  background: '#8f7b22', 
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
        <hr style={{ border: '0', borderTop: '1px solid #323232', marginBottom: '30px' }} />
        <div className='notes-list'>
          {notes.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#ffffff' }}>No thoughts dumped yet...</p>
          ) : (
              notes.map((note) => (
                  <div key={note._id} style={{
                      background: '#282727',
                      padding: '40px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                      borderLeft: '6px solid #8f7b22',
                      borderBottom: '6px solid #8f7b22',
                      transition: 'transform 0.2s',
                      position:'relative'
                  }}>
                        <button onClick={()=>handleUpdate(note)}
                            style={{
                                position:'absolute',
                                top:"10px",
                                left:"15px",
                                border:'none',
                                background: '#8f7b22',
                                borderRadius: '10px',
                                color: '#ffffff',
                                fontSize: '1.0rem',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                
                            }}
                            title="Update Note"
                        >
                            Edit
                        </button>
                        <button onClick={()=>handleDelete(note._id)}
                            style={{
                                position:'absolute',
                                top:"10px",
                                right:"15px",
                                border:'none',
                                background: '#8f7b22',
                                borderRadius: '10px',
                                color: '#ffffff',
                                fontSize: '1.0rem',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                
                            }}
                            title="Delete Note"
                        >
                            Delete
                        </button>
                      <h3 style={{ margin: '0 0 8px 0', 
                        fontSize: '1.25rem', 
                        color: '#d4d4d4' ,
                        overflowWrap:'break-word',
                        wordBreak:'break-all'
                        }}>
                            {note.title}
                        </h3>
                      <p style={{ 
                        color: '#b0b0b0', 
                        lineHeight: '1.6', 
                        margin: '0' ,
                        overflowWrap:'break-word',
                        wordBreak:'break-all'
                        }}>
                            {note.description}
                        </p>
                      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#d6d6d6' }}>
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