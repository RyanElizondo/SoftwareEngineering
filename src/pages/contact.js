import withNavBar from "@/components/withNavBar";

function contact() {
    return(
        <div className="page">
            <h3>Email: expresso.swe@gmail.com</h3>
            <h3>Phone: (123)-456-7890</h3>
        </div>
    )
}

export default withNavBar(contact);