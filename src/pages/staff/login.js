import {useState} from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
const Login = () => {
    const router = useRouter();

    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [loggedIn, setLoggedIn ] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (username === "foodprepEX" && password === "expresso123") {
            setLoggedIn(true)
            router.push('/staff/foodprep/orders')
        }
        else if (username === "manager" && password === "manager123"){
            setLoggedIn(true)
            router.push('/staff/manager/inventory')
        }
        else {
            alert("Incorrect username or password, please try again!");
        }
    };


    return (
        <>
            <Head>

                <title>Staff Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
            </Head>


        <div className = "foodprep-order">

            <h1>Staff login</h1>
            <form onSubmit = {handleFormSubmit}>
                <label1  >
                    Staff Login:
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="login-input"
                    />
                </label1>
                <br />
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="pass-input"
                />
            </label>
            <br />
            <button type="Log In">Log In</button>
        </form>

        </div>
    </>
    )
}

export default Login;
