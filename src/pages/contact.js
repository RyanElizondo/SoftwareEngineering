import withNavBar from "@/components/withNavBar";

function contact() {
    return(
        <div className="page">
            <h3 className= "Email2" >Email: expresso.swe@gmail.com</h3>
            <h3 className="Phone2">Phone: (123)-456-7890</h3>
            <h3 className="FeedBack2">How was our service?</h3>
            <a className="link09" href="https://forms.gle/54L3foPYYGBV3cWv6 " target="_blank" rel="noopener noreferrer">Please Provide Feedback</a>
        </div>
    )
}

export default withNavBar(contact);
