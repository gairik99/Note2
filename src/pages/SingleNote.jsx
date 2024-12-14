import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import CreateGroupModal from "../components/CreateGroupModal"
import { useModal } from "../context/modalContext"
import GroupNotes from "../components/GroupNotes"
import NavBar from "../components/NavBar"

const SingleNote = () => {
    const { modal } = useModal();
    const { id } = useParams();
    console.log(id);
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <Sidebar />
                <div style={{ width: '70% ', height: '100%', background: 'red', position: 'relative' }} >
                    <NavBar id={id} />
                    <GroupNotes id={id} />
                </div>
            </div>
            {modal && <CreateGroupModal />}
        </div>
    )
}

export default SingleNote