import Sidebar from "../components/Sidebar"
import { useModal } from "../context/modalContext"
import CreateGroupModal from "../components/CreateGroupModal";

const Home = () => {
    const { modal } = useModal();
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <Sidebar />
                <div style={{ width: '70%', height: '100%', background: 'red', overflow: 'hidden' }}>
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
            {modal && <CreateGroupModal />}
        </div>
    )
}

export default Home