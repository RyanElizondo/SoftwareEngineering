import withNavBar from "@/components/withNavBar";

/**
 * Provides customers a description of our cafe, values, and company
 * @returns {JSX.Element}
 * @constructor
 */
function AboutUs() {
    return (
        <div className="page">
            <h1 className={"about-us title"}>About Us - Expresso Cafe</h1>
            <h5>The most delicious coffee ever. Order now and earn points to get donuts and stuff like that</h5>
        </div>
    )
}

export default withNavBar(AboutUs);
