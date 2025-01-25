import { useState } from "react";
import { useModal } from "../context/modalContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreateSignUpModal = () => {
    const { setModal } = useModal();
    const [inputState, setInputState] = useState({});
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setModal((prevModal) => ({
            ...prevModal,
            signupModal: false,
        }));
    };

    const handleInputChange = (e) => {
        let fieldName = e.target.name;
        let value = e.target.value;

        setInputState((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const validateInput = () => {
        const { name, email, password, confirmPassword } = inputState;

        if (!name.trim()) {
            toast.error("Name is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error("Invalid email address");
            return false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 8 characters long and contain at least one letter, one number, and one special character");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleButtonClick = async () => {
        if (!validateInput()) {
            return;
        }
        setLoading(true);
        const { name, email, password } = inputState;

        try {
            const response = await axios.post(
                "https://note2-backend.onrender.com/api/v1/register",
                {
                    name,
                    email,
                    password,
                }
            );
            console.log(response);
            if (response.data.status == "ok") {
                setModal((prevModal) => ({
                    ...prevModal,
                    signupModal: false,
                }));
                toast.success("User has been created");
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };
    // console.log(group)
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
                    left: "64%",
                    width: "90%", // Use relative width
                    maxWidth: "500px", // Restrict maximum width
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
                <h2 style={{ marginBottom: "1rem", color: "#1e293b" }}>Sign Up</h2>
                <label style={{ width: "100%", marginBottom: "1rem" }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>Name</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        style={{
                            border: "1px solid grey",
                            padding: "0.75rem",
                            borderRadius: "1rem",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={{ width: "100%", marginBottom: "1rem" }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>
                        Email
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        style={{
                            border: "1px solid grey",
                            padding: "0.75rem",
                            borderRadius: "1rem",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={{ width: "100%", marginBottom: "1rem" }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>
                        Password
                    </span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        style={{
                            border: "1px solid grey",
                            padding: "0.75rem",
                            borderRadius: "1rem",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                        onChange={handleInputChange}
                    />
                </label>
                <label style={{ width: "100%", marginBottom: "1rem" }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>
                        Confirm Password
                    </span>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        style={{
                            border: "1px solid grey",
                            padding: "0.75rem",
                            borderRadius: "1rem",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                        onChange={handleInputChange}
                    />
                </label>
                <button
                    style={{
                        marginTop: "1rem",
                        height: "3rem",
                        width: "100%",
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
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default CreateSignUpModal;
