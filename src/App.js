import { Provider, createClient } from 'wagmi'
import Profile from "./components/Profile";
import Dapp from "./components/Dapp";

const client = createClient({
    autoConnect: true,
})

function App() {
    return (
        <div className={'container mx-auto px-20 font-mono m-2'}>
            <Provider client={client}>
                <header className={'my-4'}>
                    <Profile></Profile>
                </header>

                <div className={'text-center font-bold text-6xl'}>
                    <p>Gainz on Chain</p>
                </div>

                <main className={'text-center my-4'}>
                    <Dapp></Dapp>
                </main>
            </Provider>
        </div>

    )
}

export default App;