import { loadMenu } from '../lib/load-menu';
import Submenu from '../components/Submenu';
import Link from 'next/link';
import Head from 'next/head';
import withNavBar from '../components/withNavBar';
import { useState } from 'react';
import {useSelector} from "react-redux";
import {selectNumItems} from "../features/order/orderSlice";

/**
 * Page for customers to view and customize their order. Dynamically generates based on MongoDB "menu" collection
 * @param menu object retrieved from MongoDB.
 * @returns {JSX.Element}
 * @constructor
 */
function Menu({ menu }) {
    console.log(menu);
    const numItems = useSelector(selectNumItems);

    const submenus = menu.submenus;
    const [searchQuery, setSearchQuery] = useState('');
    const initializeSubmenuState = () => {
        let initialState = {};
        submenus.forEach( (submenu) => {
            initialState[submenu.name] = false;
        } )
        return initialState;
    };

    const updateVisibility = (submenuName, value) => {
        setVisibleSubmenus({
            ...visibleSubmenus,
            [submenuName]: value
        })
    }

    const [visibleSubmenus, setVisibleSubmenus] = useState(initializeSubmenuState());

    const getFilteredSubmenus = () => {
        const filteredSubmenus = submenus.map((submenu) => {
            const filteredItems = submenu.items.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return {
                name: submenu.name,
                items: filteredItems,
            };
        })

        filteredSubmenus.forEach(
            (submenu) => {
                if(!visibleSubmenus[submenu.name] && searchQuery.length > 0) {
                    updateVisibility(submenu.name, true)
                }
            }
        );
        return filteredSubmenus;
    }

    const hideAllSubmenus = () => {
        setVisibleSubmenus(initializeSubmenuState())
    }

    const handleSearchQuery = (e) => {
        //hide submenus if searchQuery is deleted
        if(e.target.value === "") hideAllSubmenus();

        //update state
        setSearchQuery(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Create Order</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"
                />
            </Head>
            <div className="menu-flex">
                <Link href="/order" className="view-order-button grow">
                    {`View Order ${ numItems > 0 ? `(${numItems})` : ""}`}
                </Link>
                <input className= "search-bar"
                    type="text"
                    placeholder="Search Item..."
                    value={searchQuery}
                    onChange={handleSearchQuery}
                />
                <div className="menu-holder menu-flex">
                    {getFilteredSubmenus().map((submenu, index) => (
                        <Submenu
                            name={submenu.name}
                            items={submenu.items}
                            key={index}
                            visibleState={visibleSubmenus[submenu.name]}
                            updateVisibleState={updateVisibility}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const menu = await loadMenu();
    return { props: { menu } };
}

export default withNavBar(Menu);
