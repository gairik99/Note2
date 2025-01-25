import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNote } from "../context/noteContext";
import { useAuth } from "../context/authContext";

const GroupNotes = ({ id }) => {
    const { note, setNote } = useNote();
    const { user } = useAuth();
    const [notes, setNotes] = useState({});
    const [groupNote, setGroupNote] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setNotes({ groupId: id });
        const newNotes = note?.filter(({ groupId }) => id == groupId);
        setGroupNote(newNotes);
    }, [id, note]);

    const handleInputChange = (e) => {
        let val = e.target.value;
        setNotes((prevNotes) => ({ ...prevNotes, note: val }));
    };
    const handleCreateNote = async () => {
        if (notes.note?.trim().length > 0) {
            const date = new Date();
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "short" });
            const year = date.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;

            // Format for time
            const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
            const formattedTime = new Date().toLocaleTimeString("en-US", timeOptions);

            const newNote = {
                ...notes,
                date: formattedDate,
                time: formattedTime,
            };
            setLoading(true);
            try {
                const response = await axios.patch(
                    "https://note2-backend.onrender.com/api/v1/users/addNote",
                    newNote,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`, // Ensure authentication if required
                        },
                    }
                );
                // console.log(response);
                if (response.data.status == "ok") {
                    // const { noteId } = response.data;

                    // Add the new note with the returned _id to state
                    // setNote((prev) => [...prev, { ...newNote, _id: noteId }]);
                    setNote((prevNote) => [...prevNote, response.data.data]);
                    console.log(response.data);
                    toast.success("Note has been created");
                } else {
                    toast.error(response.data.message || "Failed to add note");
                }
            } catch (error) {
                // console.error("Error adding note:", error);
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong while adding the note"
                );
            }
            finally {
                setLoading(false); // End loading effect
            }
        } else {
            toast.warning("Note should have at least one character");
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
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
                    groupNote.map(({ _id, note, date, time }) => (
                        <div
                            key={_id}
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
                                    padding: "1rem",
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
                    background: loading ? 'grey' : notes?.note?.length > 0 ? 'blue' : "grey",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "2.5vh",
                    right: "2rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={handleCreateNote}
                disabled={loading}
            >
                {loading ? (
                    <div className="spinner" style={{
                        border: "2px solid #fff",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        width: "1rem",
                        height: "1rem",
                        animation: "spin 0.8s linear infinite"
                    }}></div>
                ) : (
                    '>'
                )}
            </button>

            <style>
                {`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `}
            </style>
        </div>
    );
};
export default GroupNotes;
