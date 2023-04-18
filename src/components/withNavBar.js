import NavBar from "@/components/NavBar";

const withNavBar = (Component) => (props) => {
    return(
        <>
            <NavBar />
            <Component {...props} />
        </>
    )
}

export default withNavBar;