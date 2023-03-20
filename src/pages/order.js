import { useSelector } from 'react-redux';
import { selectItems } from '../features/order/orderSlice'
import OrderItem from '../components/OrderItem'
import Link from 'next/link';

/**
 * Renders the view order page for customers and retrieves customer's order data from the redux store order slice
 * @returns {JSX.Element}
 * @constructor
 */
export default function Order( ) {
    const currentItems = useSelector(selectItems);
    const noItems = <h2 className="order-title">No items added to order</h2>
    const orderTitle = <h2 className="order-title">Current order</h2>

    let subtotal = 0;
    currentItems.forEach( item => subtotal += (item.price))

    subtotal = subtotal.toFixed(2);
    const total = (subtotal * 1.06).toFixed(2);
    const tax = (total - subtotal).toFixed(2);

    //render currentItems as a list of orderItems
    return (
        <div className="order page">
            {currentItems === undefined || currentItems.length === 0 ? noItems : orderTitle}
            <div className="order-holder">
                {currentItems === undefined
                    ? null : currentItems.map( (item, index) => (<OrderItem key={index} item={item}/>))}
            </div>
            <div className="order-details">
                <h5 className="order-detail">{`Subtotal: $${subtotal}`}</h5>
                <h5 className="order-detail">{`Tax: $${tax}`}</h5>
                <h5 className="order-detail">{`Total: $${total}`}</h5>
            </div>
            <Link href="/menu" className="return-button grow">Back to menu</Link>
            {/*TODO replace the below hyperlink reference to redirect to the stripe page */}
            <Link href="/checkout" className="return-button grow">Place order</Link>
        </div>

    )

}