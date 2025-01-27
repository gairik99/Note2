import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";


const Sidebar = ({ id }) => {
    const [selectedId, setSelectedId] = useState(id);
    const { group } = useGroup();
    const { setModal } = useModal();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = (id) => {
        setSelectedId(() => id);
    };

    useEffect(() => {
        if (selectedId !== undefined) {
            navigate(`/notes/${selectedId}`);
        }
    }, [selectedId]);

    const handleButtonClick = () => {
        if (user?.token) {
            setModal((prevModal) => ({
                ...prevModal,
                groupModal: true,
            }));
        } else {
            setModal((prevModal) => ({
                ...prevModal,
                signinModal: true,
            }));
        }
    };

    const handleHomePage = () => {
        navigate("/");
    };

    return (
        <div
            style={{
                width: "25%",
                height: "100%",
                position: "relative",
                background: "rgb(239, 240, 231)",
            }}
        >
            {/* Header with image and h1 side by side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center", // Vertically center items
                    justifyContent: "center", // Horizontally center items
                    padding: "1rem",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Optional: Add a border
                }}
            >
                <img
                    src="/icon.jpg"
                    alt="note"
                    style={{
                        width: "50px", // Adjust the size of the image
                        height: "50px", // Adjust the size of the image
                        borderRadius: "50%", // Optional: Make the image circular
                        marginRight: "1rem", // Add space between the image and the heading
                    }}
                />
                <h1
                    style={{
                        color: "#18181b",
                        margin: 0,
                        fontSize: "2rem",
                        cursor: "pointer", // Make it clickable
                    }}
                    onClick={handleHomePage}
                >
                    Note
                </h1>
            </div>

            {/* Group List */}
            <ul
                style={{
                    maxHeight: "calc(100vh - 6rem)", // Adjust height to leave space for header
                    overflowY: "auto", // Enables vertical scrolling
                    padding: "0",
                    margin: "0",
                    listStyle: "none", // Removes default bullet points
                }}
            >
                {user?.token
                    ? group.map(({ _id, sname, fname, color }) => (
                        <li
                            key={_id}
                            style={{
                                margin: "1px",
                                height: "10vh",
                                padding: "0.5rem",
                                display: "flex",
                                alignItems: "center",
                                background:
                                    _id == selectedId
                                        ? "rgba(220, 209, 209, 0.42)"
                                        : "transparent",
                                borderRadius: _id == selectedId ? "0 5% 5% 0" : "",
                                cursor: "pointer",
                                overflow: "hidden",
                            }}
                            onClick={() => handleClick(_id)}
                        >
                            <p
                                style={{
                                    height: "8vh",
                                    width: "4vw",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "5px solid white",
                                    borderRadius: "100%",
                                    background: color,
                                    color: "white",
                                    fontSize: "1.4vw",
                                    fontWeight: "bold",
                                }}
                            >
                                {sname.toUpperCase()}
                            </p>
                            <div
                                style={{
                                    display: "inline-block",
                                    marginLeft: "0.5rem",
                                    padding: "1.2rem",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: id == selectedId ? "#525252" : "",
                                }}
                            >
                                {fname.substring(0, 25)}
                            </div>
                        </li>
                    ))
                    : ""}
            </ul>

            {/* Add Group Button */}
            <button
                style={{
                    color: "white",
                    height: "4rem",
                    width: "4rem",
                    position: "fixed",
                    top: "84vh",
                    left: "20vw",
                    background: "blue",
                    borderRadius: "100%",
                    cursor: "pointer",
                    fontSize: "3.2rem",
                }}
                onClick={handleButtonClick}
            >
                +
            </button>
        </div>
    );
};

export default Sidebar;