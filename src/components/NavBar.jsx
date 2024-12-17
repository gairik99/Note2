import { useEffect, useState } from "react";
import { useGroup } from "../context/groupContext";

const NavBar = ({ id }) => {
    let { group } = useGroup();
    const [newGroup, setNewGroup] = useState({});

    useEffect(() => {
        const nGroup = group[id - 1];
        setNewGroup(() => nGroup);
    }, [id]);

    // console.log(newGroup);
    return (
        <div style={{
            height: '8%',
            background: 'blue',
            display: 'flex',
            alignItems: 'center',
            padding: '0.2%'
        }}>
            <div style={{
                background: newGroup.color,
                height: '90%',
                width: '5%',
                border: "2px solid white",
                borderRadius: '50%',
                color: 'white',
                fontSize: '1.5vw',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                marginLeft: '1rem'
            }}>
                {newGroup?.sname?.toUpperCase()}
            </div>
            <p style={{
                marginLeft: '1rem',
                color: 'white',
                fontSize: '1.4rem',
                flexGrow: 1
            }}>
                {newGroup.fname}
            </p>
        </div>
    )
}

export default NavBar