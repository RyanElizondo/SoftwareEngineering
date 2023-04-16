import withNavBar from "@/components/withNavBar";

/**
 * Provides customers a description of our cafe, values, and company
 * @returns {JSX.Element}
 * @constructor
 */
function AboutUs() {
    return (
        <div className="page">
            <h1 className={"about-us-title"}>About Us </h1>
            <h5 className={"about-us-desc"}>
                Expresso Cafe is a cozy and welcoming coffee shop located in the heart of the city. We are a family-owned business with a passion for serving the finest quality coffee and baked goods.

                Our coffee beans are carefully selected from the best farms around the world and roasted to perfection to bring out their unique flavors. We offer a wide range of coffee beverages, from classic espresso drinks to creative and innovative recipes. Our skilled baristas will craft the perfect cup of coffee just for you, every time.

                In addition to our coffee, we also serve a selection of delicious baked goods, made fresh daily in our own kitchen. Our menu features a variety of pastries, cakes, and sandwiches that are perfect for breakfast, lunch, or a quick snack on the go.

                At Expresso Cafe, we believe that a great coffee experience is about more than just the coffee. It's about creating a warm and friendly environment where everyone feels welcome. Our cozy and inviting space is the perfect place to relax, catch up with friends, or get some work done. We strive to create a community of coffee lovers who share our passion for quality and hospitality.

                We look forward to welcoming you to our cafe and sharing our love for coffee with you.
            </h5>
        </div>
    )
}

export default withNavBar(AboutUs);
