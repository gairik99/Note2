import { useEffect, useState } from "react";
import { useGroup } from "../context/groupContext";

const NavBar = ({ id }) => {
    let { group } = useGroup();
    const [newGroup, setNewGroup] = useState({});

    useEffect(() => {
        const nGroup = group[id - 1];
        setNewGroup((prev) => nGroup);
    }, [id]);

    console.log(newGroup);
    return (
        <div style={{
            height: '8%',
            background: 'blue',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem'
        }}>
            <div style={{
                background: newGroup.color,
                height: '90%',
                width: '5%',
                borderRadius: '50%',
                color: 'white',
                fontSize: '1.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
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