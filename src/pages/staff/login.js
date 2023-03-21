import {useState} from "react";
import { useRouter } from 'next/router';
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
        else {
            alert("Incorrect username or password, please try again!");
        }
    };


    return (
        <div className = "foodprep-order">
            <h1>Login</h1>
            <form onSubmit = {handleFormSubmit}>
                <label1  >
                    Staff/Manager Login:
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
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
                />
            </label>
            <br />
            <button type="Log In">Log In</button>
        </form>
        </div>

    )
}

export default Login;