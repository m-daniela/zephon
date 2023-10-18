import { Link } from "react-router-dom";
import "./App.css";

function App() {

    return (
        <section>
          Vite app home
            <Link to={"login"}>Go to login</Link>
        </section>
    );
}

export default App;
