const HomePage = ({
    // Admin
    admin
}) => {
    return (
        <div className = "HomePage">
            <a className = "Name" href = "/">
                { admin.firstname } { admin.lastname }
            </a>
            <div className = "Work">
                { admin.work }
            </div>
        </div>
    )
}

export { HomePage }