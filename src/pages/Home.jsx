import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useModal } from "../context/modalContext";
import CreateGroupModal from "../components/CreateGroupModal";
import NavBar from "../components/NavBar";
import CreateSignUpModal from "../components/CreateSignUpModal";
import CreateSignInModal from "../components/CreateSignInModal";
import CreateSignoutModal from "../components/CreateSignoutModal";
import "./Home.css";

const Home = () => {
    const { modal } = useModal();

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="main-content"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <Sidebar />
                <motion.div
                    className="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <NavBar />
                    {/* Word "Note" moving all around the page */}
                    <motion.div
                        className="moving-note"
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: [0, 300, -300, 500, -500, 400, 0],
                            y: [0, -300, 200, -400, 300, 400, 0],
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.2, 1, 0.8, 1]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ willChange: "transform" }}
                    >
                        <img src="icon.jpg" alt="Note" style={{ height: '30vh', width: "20vw", borderRadius: "10%" }} />
                    </motion.div>
                </motion.div>
            </motion.div>

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
            {modal.signupModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignUpModal />
                </motion.div>
            )}
            {modal.signinModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignInModal />
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
        </motion.div>
    );
};

export default Home;