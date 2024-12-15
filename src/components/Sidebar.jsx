import { useNavigate } from "react-router-dom";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useState, useEffect } from "react";


const Sidebar = ({ id }) => {
    const [selectedId, setSelectedId] = useState(id);
    const { group } = useGroup();
    const { setModal } = useModal();
    const navigate = useNavigate();
    const handleClick = (id) => {
        setSelectedId(() => id);
        // navigate(`/notes/${selectedId}`);
    };
    useEffect(() => {
        if (selectedId !== undefined) {
            navigate(`/notes/${selectedId}`);
        }
    }, [selectedId]);
    const handleButtonClick = () => {
        setModal(() => true);
    };
    const handleHomePage = () => {
        navigate('/')
    }
    return (
        <div
            style={{
                width: "30%",
                height: "100%",
                position: "relative",
            }}
        >
            <h1
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#18181b',
                    margin: 0,
                    height: '4rem',
                    textAlign: 'center',
                    fontSize: '2rem'
                }}
                onClick={handleHomePage}
            >
                Pocket Note
            </h1 >
            <ul style={{
                maxHeight: "calc(100vh - 6rem)", // Adjust height to leave space for header
                overflowY: "auto", // Enables vertical scrolling
                padding: "0",
                margin: "0",
                listStyle: "none", // Removes default bullet points
            }}>
                {group.map(({ id, sname, fname, color }) => (
                    <li
                        key={id}
                        style={{
                            margin: "1px",
                            height: "5rem",
                            padding: "0.5rem",
                            display: "flex",
                            background: id == selectedId ? "#f0f8ff" : "transparent",
                            borderRadius: id == selectedId ? "0 5% 5% 0" : "",
                            cursor: "pointer",
                            overflow: "hidden",

                        }}
                        onClick={() => handleClick(id)}
                    >
                        <p
                            style={{
                                height: "8vh",
                                width: "8vh",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: "1px solid white",
                                borderRadius: "100%",
                                background: color,
                                color: "white",
                                fontSize: '1.4vw',
                                fontWeight: 'bold'
                            }}
                        >
                            {sname.toUpperCase()}
                        </p>{" "}
                        <div
                            style={{
                                display: "inline-block",
                                marginLeft: "0.5rem",
                                padding: "1.2rem",
                                fontSize: "1rem",
                                fontWeight: 'bold',
                                color: '#18181b'
                            }}
                        >
                            {fname.substring(0, 25)}
                        </div>
                    </li>
                ))}
            </ul>
            <button
                style={{
                    color: "white",
                    height: "4rem",
                    width: "4rem",
                    position: "fixed",
                    top: "90%",
                    left: "20%",
                    background: "blue",
                    borderRadius: "100%",
                    cursor: 'pointer',
                    fontSize: '3.2rem'
                }}
                onClick={handleButtonClick}
            >
                +
            </button>
        </div>
    );
};

export default Sidebar;
