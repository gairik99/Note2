import React from "react";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";
import { useGroup } from "../context/groupContext";
import { useNote } from "../context/noteContext";
import { useNavigate } from "react-router-dom";

const CreateSignoutModal = () => {
    const { setModal } = useModal();
    const { setUser, user } = useAuth();
    const { setGroup } = useGroup();
    const { setNote } = useNote();
    const navigate = useNavigate();
    const handleClick = () => {
        setModal((prevModal) => ({
            ...prevModal,
            signoutModal: false,
        }));
    };
    const handleButtonClick = () => {
        setUser({ token: "", userName: "" });
        setGroup([]);
        setNote([]);
        setModal((prevModal) => ({
            ...prevModal,
            signoutModal: false,
            signinModal: true,
        }));
        navigate("/");
    };
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5, // Ensure it's higher than other elements
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "72%",
                    width: "25%", // Use relative width
                    background: "#ffffff",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem", // Increased padding for more space
                    boxSizing: "border-box",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
                }}
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to the backdrop
            >
                <p style={{ fontSize: '1.1rem', color: '#555' }}>
                    Are you sure you want to sign out, <strong style={{ color: '#0047FF' }}>{user?.userName}</strong>?
                </p>
                <button
                    style={{
                        marginTop: "1rem",
                        height: "3rem",
                        width: "40%",
                        fontSize: "1rem",
                        background: "blue",
                        color: "white",
                        borderRadius: "1rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#0044cc")} // Hover effect
                    onMouseOut={(e) => (e.target.style.background = "blue")} // Revert hover effect
                    onClick={handleButtonClick}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default CreateSignoutModal;
