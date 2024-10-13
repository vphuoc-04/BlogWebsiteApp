const AdminDashboard = ({
    // User metrics
    user,
    timeMessage
}) => {
    return (
        <div className = "AdminDashboard">
            <div className = "Metrics">
                <div className = "User">
                    <p>User</p>
                    <div className = "Count">{ user.length }</div>
                    <div className = "Time">{ timeMessage }</div>
                </div>
            </div>
        </div>
    );
}

export { AdminDashboard };
