import { useSelector } from 'react-redux';
import selectItems from '../features/order/orderSlice'
import OrderItem from '../components/OrderItem'

/**
 * Renders the view order page for customers and retrieves customer's order data from the redux store order slice
 * @returns {JSX.Element}
 * @constructor
 */
export default function Order( ) {
    const currentItems = useSelector(selectItems);

    //render currentItems as a list
    return (
        <div className="order-holder flex-container">
            {currentItems.map( (item, index) => (<OrderItem key={index} item={item}/>))}
        </div>
    )

}