import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";

const CreateGroupModal = () => {
    let colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
    const [val, setVal] = useState({});
    const [selectedColor, setSelectedColor] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setModal } = useModal();
    const { setGroup } = useGroup();
    const { user } = useAuth();
    const handleClick = (e) => {
        setModal((prevModal) => ({
            ...prevModal,
            groupModal: false
        }));
    };
    const handleInputChange = (e) => {
        let v = e.target.value.trim();
        let nm = '';
        let index = Math.floor(Math.random() * (v.length - 1)) + 1;
        if (v[index] == ' ')
            nm = v[0] + v[v.length - 1];
        else
            nm = v[0] + v[index];

        // console.log('index...', index)
        if (v.length < 2) {
            return;
        }
        else {
            setVal({ ...val, fname: v, sname: nm })
        }

    }

    const handleColorClick = (color) => {
        setSelectedColor(color); // Update the selected color
        setVal({ ...val, color: color });
    };

    const handleButtonClick = async () => {
        if (val.sname && val.fname && val.color) {
            setLoading(true);
            try {
                const payload = {
                    fname: val.fname,
                    sname: val.sname,
                    color: val.color,
                    // Generate a unique ID for the group
                };

                const response = await axios.patch(
                    "https://note2-backend.onrender.com/api/v1/users/addGroup",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`, // Pass user token for authentication
                        },
                    }
                );
                // console.log(response);

                if (response.data.status === "ok") {
                    toast.success("Group has been created");
                    setGroup(prevGroup => ([...prevGroup, response.data.data]));
                    setModal((prevModal) => ({ ...prevModal, groupModal: false }));
                } else {
                    toast.error(response.data.message || "Something went wrong");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Network error");
            }
            finally {
                setLoading(false); // Reset loading state
            }
        } else {
            if (!val.fname) {
                toast.warning("Group Name must contain two characters");
            }
            if (!val.color) {
                toast.warning("Group Must have a color");
            }
        }

    }
    // console.log(group)
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5, // Ensure it's higher than other elements
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    width: '90%', // Use relative width
                    maxWidth: '500px', // Restrict maximum width
                    background: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    boxSizing: 'border-box',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to the backdrop
            >
                <h2 style={{ paddingBottom: '1%', fontSize: '1.2rem', textAlign: 'center' }}>Create New Group</h2>
                <label style={{ width: '100%' }}>
                    <span>Group Name</span>
                    <input
                        type="text"
                        placeholder="Enter group name"
                        style={{
                            border: '1px solid grey',
                            padding: '0.5rem',
                            marginLeft: '0.5rem',
                            borderRadius: '1rem',
                            width: '80%',
                            boxSizing: 'border-box',
                        }}
                        onChange={handleInputChange}
                    />

                </label>
                <div style={{ width: '100%', display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.2rem' }}>Choose color</span>
                    {colors.map((color) => (
                        <div
                            key={color}
                            style={{
                                width: '30px',
                                height: '30px',
                                backgroundColor: color,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                boxShadow: '0 0 3px rgba(0,0,0,0.3)',
                                padding: '2px',
                                border: selectedColor === color ? '3px solid black' : '2px solid white',
                            }}
                            onClick={() => handleColorClick(color)}
                        ></div>
                    ))}
                </div>
                <button
                    style={{
                        marginTop: '10%',
                        height: '40px',
                        width: '40%', // Use relative width
                        fontSize: '1rem', // Adjust font size
                        background: 'blue',
                        color: 'white',
                        borderRadius: '1rem',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    );
};

export default CreateGroupModal;
