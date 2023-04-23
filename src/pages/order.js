import { useSelector } from 'react-redux';
import { selectItems, selectOrderSubtotal, selectOrderTotal, selectOrderTax } from '../features/order/orderSlice'
import OrderItem from '../components/OrderItem'
import Link from 'next/link';
import Head from "next/head";
import { Yanone_Kaffeesatz } from 'next/font/google'

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: '700'});

/**
 * Renders the view order page for customers and retrieves customer's order data from the redux store order slice
 * @returns {JSX.Element}
 * @constructor
 */
export default function Order( ) {
    const currentItems = useSelector(selectItems);
    const noItems = <h2 className="order-title">No items added to order</h2>
    const orderTitle = <h2 className="order-title">Current order</h2>

    const subtotal = useSelector(selectOrderSubtotal);
    const total = useSelector(selectOrderTotal);
    const tax = useSelector(selectOrderTax)

    //render currentItems as a list of orderItems
    return (
        <>
            <Head>

                <title className={yanone.className}>View Order</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                
            </Head>
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
            <Link href="/checkout" className="return-button grow">Place order</Link>
        </div>
</>
    )

}