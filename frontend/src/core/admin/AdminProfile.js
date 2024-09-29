import { FaCamera } from 'react-icons/fa';

const AdminProfile = ({
    admin,
}) => {
    return (
        <div className = "AdminProfile">
            <div className = "Avatar">
                <label className = "AvatarDisplay">
                    <div className = "AvatarImage">
                        <img src = { admin.avatar } alt = "" />
                    </div>
                    <div className = "CameraIcon">
                        <FaCamera />
                    </div>
                </label>
            </div>
        </div>
    )
}

export { AdminProfile }