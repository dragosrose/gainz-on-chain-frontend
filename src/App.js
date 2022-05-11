import UserApp from "./components/UserApp";
import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Info from "./components/Info";
import Whitepaper from "./components/Whitepaper";
function App() {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path={'/'} exact element={<UserApp/>}></Route>
                <Route path={'/about'} element={<Info/>}></Route>
                <Route path={'/whitepaper'} element={Whitepaper}></Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;