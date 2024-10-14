import moment from "moment"

const FooterComponent = () => {
    return (
        <div className = "FooterComponent">
            <div className = "Social">
                <a href = "https://www.facebook.com/vphuoc.04/"><i class="fa-brands fa-facebook-f"></i></a>
                <a href = "https://www.youtube.com/@vphuoc.04"><i class="fa-brands fa-youtube"></i></a>
                <a href = "https://github.com/vphuoc-04"><i class="fa-brands fa-github"></i></a>
                <a href = "https://www.linkedin.com/in/vphuoc/"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
            <p>© {moment().format("YYYY")} by Van Phuoc. If you need anything, please contact me.</p>
        </div>
    )
}

export { FooterComponent }