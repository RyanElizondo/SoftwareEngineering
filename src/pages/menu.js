import { loadMenu } from '../lib/load-menu';
import Submenu from '../components/Submenu';
import Link from 'next/link';
import Head from 'next/head';
import withNavBar from '@/components/withNavBar';
import { useState } from 'react';

function Menu({ menu }) {
    const submenus = menu.submenus;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSubmenus = submenus.map((submenu) => {
        const filteredItems = submenu.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return {
            name: submenu.name,
            items: filteredItems,
        };
    });

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
                    View Order
                </Link>
                <input className= "search-bar"
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="menu-holder menu-flex">
                    {filteredSubmenus.map((submenu, index) => (
                        <Submenu name={submenu.name} items={submenu.items} key={index} />
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
