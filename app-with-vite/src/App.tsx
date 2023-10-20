import LeftSideLayout from "./components/layouts/LeftSideLayout";
import MessagesLayout from "./components/layouts/MessagesLayout";
import RightSideLayout from "./components/layouts/RightSideLayout";

function App() {
    return (
        <>
            <LeftSideLayout />
            <MessagesLayout />
            <RightSideLayout />
        </>
    );
}

export default App;
