import React, { useEffect, useState } from 'react'
import { useNote } from '../context/noteContext';


const GroupNotes = ({ id }) => {
    const { note, setNote } = useNote();
    const [notes, setNotes] = useState({});
    const [groupNote, setGroupNote] = useState([]);

    useEffect(() => {
        setNotes({ key: id });
        const newNotes = note?.filter(({ key }) => id === key);
        setGroupNote(newNotes);
    }, [id, note]);

    const handleInputChange = (e) => {
        let val = e.target.value;
        setNotes((prevNotes) => ({ ...prevNotes, note: val }))
    }
    const handleCreateNote = () => {
        if (notes.note?.trim().length > 0) {
            const date = new Date();
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            // ......format for time.....
            const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
            const formattedTime = new Date().toLocaleTimeString('en-US', timeOptions);
            const newNote = {
                ...notes,
                date: formattedDate,
                time: formattedTime,
            };

            setNote((prev) => [...prev, newNote]);
            setNotes({ ...notes, note: '' });
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline in textarea
            handleCreateNote();
        }
    };
    // let newNotes = note?.filter(({ key }) => id == key)
    // setGroupNote(newNotes);
    // console.log('..............')
    // console.log('id', id);
    // console.log('notes', notes);
    // console.log('note', note);
    // console.log('groupNote', groupNote);

    return (
        < div style={{ width: '100%', height: '92%', background: '#f5f5f4', position: 'relative' }}>
            <div style={{ width: '70vw', height: '76vh', overflowY: 'auto', }}>
                {groupNote.length > 0 ? (
                    groupNote.map(({ note, date, time }, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '0.4rem',
                                borderRadius: '5px',
                                height: '18vh',
                                margin: '1.4rem',
                                boxShadow: '0 0 10px rgba(17, 233, 100, 0.2)',
                                background: '#fafafa',
                                color: '#262626',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <p style={{ padding: '0.5rem', fontSize: '1.2rem', flex: 1 }}>{note}</p>
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    color: '#555',
                                    margin: '0.5rem',
                                    textAlign: 'right',
                                }}
                            >
                                {date} • {time}
                            </p>
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '2rem',
                            color: '#999',
                            fontSize: '1.2rem',
                        }}
                    >
                        No notes available
                    </p>
                )}
            </div>

            <textarea style={{ height: '16vh', width: '70vw', border: '0.8rem solid blue', borderRadius: '5px 5px 5px 5px', position: 'fixed', padding: '0.5rem', }} onChange={handleInputChange} onKeyDown={handleKeyPress} value={notes.note || ''} placeholder='Enter your Note ...'>
            </textarea>
            <button
                style={{
                    color: "white",
                    height: "1.5rem",
                    width: "1.5rem",
                    background: "grey",
                    borderRadius: "50%",
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '95%'
                }}
                onClick={handleCreateNote}
            >
                &gt;
            </button>

        </div >
    )
};
export default GroupNotes;