import { useParams } from "react-router-dom"
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar"
import CreateGroupModal from "../components/CreateGroupModal"
import { useModal } from "../context/modalContext"
import GroupNotes from "../components/GroupNotes"
import NavBar from "../components/NavBar"
import CreateSignInModal from "../components/CreateSignInModal"
import CreateSignUpModal from "../components/CreateSignUpModal"
import CreateSignoutModal from "../components/CreateSignoutModal"

const SingleNote = () => {
    const { modal } = useModal();
    const { id } = useParams();
    // console.log(id);
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <Sidebar id={id} />
                <div style={{ width: '75% ', height: '100%', position: 'relative' }} >
                    <NavBar id={id} />
                    <GroupNotes id={id} />
                </div>
            </div>
            {modal.groupModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateGroupModal />
                </motion.div>
            )}

            {modal.signoutModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignoutModal />
                </motion.div>
            )}
        </div>
    )
}

export default SingleNote