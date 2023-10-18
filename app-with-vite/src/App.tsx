import { Link } from "react-router-dom";
import { useAuthContext } from "./utils/hooks";
// import "./App.css";

function App() {
    const {logout} = useAuthContext();
    return (
        <section>
            <p>Vite app home</p>
            <Link to={"login"}>Go to login</Link>
            <button onClick={logout}>Logout</button>
        </section>
    );
}

export default App;
