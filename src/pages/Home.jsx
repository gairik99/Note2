import Sidebar from "../components/Sidebar"
import { useModal } from "../context/modalContext"
import CreateGroupModal from "../components/CreateGroupModal";
import NavBar from "../components/NavBar";
import CreateSignUpModal from "../components/CreateSignUpModal";
import CreateSignInModal from "../components/CreateSignInModal";
import CreateSignoutModal from "../components/CreateSignoutModal";

const Home = () => {
    const { modal } = useModal();
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <Sidebar />
                <div style={{ width: '75%', height: '100%', overflow: 'hidden' }}>
                    <NavBar />
                    <img
                        src="home.png"
                        alt="home"
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </div>
            {modal.groupModal && <CreateGroupModal />}
            {modal.signupModal && <CreateSignUpModal />}
            {modal.signinModal && <CreateSignInModal />}
            {modal.signoutModal && <CreateSignoutModal />}
        </div>
    )
}

export default Home