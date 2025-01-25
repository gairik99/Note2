import { useEffect, useState } from "react";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";

const NavBar = ({ id }) => {
    let { group } = useGroup();
    let { setModal } = useModal();
    let { user } = useAuth(); // Get user from context
    const [newGroup, setNewGroup] = useState({});

    useEffect(() => {
        const nGroup = group?.find(({ _id }) => _id == id);
        setNewGroup(() => nGroup);
    }, [id]);

    return (
        <div style={{
            height: '8vh',
            background: '#1E3A8A', // Dark blue background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
            borderBottom: '2px solid #1E40AF', // add a border at the bottom for separation
        }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {newGroup && (
                    <>
                        <div style={{
                            background: newGroup.color || '#4C51BF', // Default color if no color
                            height: '6.4vh',
                            width: '8%',
                            border: "3px solid white",
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '1.4rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            {newGroup?.sname?.toUpperCase()}
                        </div>
                        <p style={{
                            marginLeft: '1rem',
                            color: 'white',
                            fontSize: '2rem', // Increased font size for fname
                            fontWeight: '700', // Bold font for emphasis
                            alignSelf: "center",
                        }}>
                            {newGroup.fname}
                        </p>
                    </>
                )}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem', // Adds spacing between buttons
            }}>
                {!user?.token ?
                    <>
                        <button style={{
                            padding: '0.5rem 1.5rem',
                            background: '#ECFEFF',
                            color: '#1E293B',
                            border: '2px solid #1E40AF',
                            borderRadius: '0.5rem',
                            fontWeight: "bold",
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            hover: {
                                background: '#1E40AF', // Darker color on hover
                                color: 'white',
                            }
                        }} onClick={() => setModal((prevModal) => ({
                            ...prevModal, signinModal: true
                        }))}>
                            Sign In
                        </button>
                        <button style={{
                            padding: '0.5rem 1.5rem',
                            background: '#ECFEFF',
                            color: '#1E293B',
                            fontWeight: "bold",
                            border: '2px solid #1E40AF',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            hover: {
                                background: '#1E40AF',
                                color: 'white',
                            }
                        }} onClick={() => setModal((prevModal) => ({
                            ...prevModal, signupModal: true
                        }))}>
                            Sign Up
                        </button>
                    </>
                    :
                    <>
                        {/* User Name Section */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '1rem', // Adjusted font size for username
                            fontWeight: '500',
                        }}>
                            <span style={{
                                marginRight: '0.8rem', // Space between username and sign out button
                                fontSize: '1.2rem',
                            }}>
                                Welcome, {user?.userName || 'User'}
                            </span>
                        </div>

                        {/* Sign Out Button */}
                        <button style={{
                            padding: '0.5rem 1.5rem',
                            background: '#ECFEFF',
                            color: '#1E293B',
                            fontWeight: "bold",
                            border: '2px solid #1E40AF',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            hover: {
                                background: '#1E40AF',
                                color: 'white',
                            }
                        }} onClick={() => setModal((prevModal) => ({
                            ...prevModal, signoutModal: true
                        }))}>
                            Sign Out
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default NavBar;