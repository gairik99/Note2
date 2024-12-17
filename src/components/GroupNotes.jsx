import React, { useEffect, useState } from 'react'
import { useNote } from '../context/noteContext';
import { toast } from 'react-toastify';

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
            toast.success('Note has created')
        }
        else {
            toast.warning('Note should have atleast one character')
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
        <div
            style={{
                width: "100%",
                height: "92%",
                background: "#f5f5f4",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "72.6vh",
                    overflowY: "auto",
                    padding: "0.5rem",
                }}
            >
                {groupNote.length > 0 ? (
                    groupNote.map(({ note, date, time }, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "1rem",
                                borderRadius: "5px",
                                margin: "1rem 1rem",
                                boxShadow: "0 0 10px rgba(17, 233, 100, 0.2)",
                                background: "#fafafa",
                                color: "#262626",
                                position: "relative", // Allows positioning of child elements
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                wordBreak: "break-word", // Handle long text gracefully
                                maxWidth: "100%", // Prevent overflow
                                minHeight: "10vh", // Ensure adequate height
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.2rem",
                                    marginBottom: "0.5rem",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                    padding: '1rem',
                                }}
                            >
                                {note}
                            </p>
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "0.5rem",
                                    right: "0.5rem",
                                    fontSize: "0.8rem",
                                    color: "#555",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                }}
                            >
                                <span>{date}</span>
                                <span>•</span>
                                <span>{time}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "2rem",
                            color: "#999",
                            fontSize: "1.2rem",
                        }}
                    >
                        No notes available
                    </p>
                )}
            </div>

            <textarea
                style={{
                    height: "18.6vh",
                    width: "100%",
                    border: "12px solid blue",
                    borderRadius: "5px",
                    padding: "0.5rem 0.5rem",
                    fontSize: "1rem",
                    boxSizing: "border-box", // Ensure proper padding calculations
                }}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                value={notes.note || ""}
                placeholder="Enter your Note ..."
            ></textarea>
            <button
                style={{
                    color: "white",
                    height: "1.5rem",
                    width: "1.5rem",
                    background: notes?.note?.length > 0 ? 'blue' : "grey",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "2.5vh",
                    right: "2rem", // Adjust button placement
                    cursor: "pointer",
                }}
                onClick={handleCreateNote}
            >
                &gt;
            </button>

            {/* Media Queries */}
            <style>
                {`
            @media (max-width: 768px) {
                textarea {
                    width: 90%; /* Adjust width for smaller screens */
                    height: 20vh; /* Adjust height for usability */
                }
                button {
                    bottom: 1rem;
                    right: 1rem;
                }
            }
            `}
            </style>
        </div>
    )
};
export default GroupNotes;