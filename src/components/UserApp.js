import { Provider, createClient } from 'wagmi'
import Profile from "./Profile";
import Dapp from "./Dapp";

const client = createClient({
    autoConnect: true,
})

function UserApp() {
    return (
        <div className={'container mx-auto px-20 font-mono m-2'}>
            <Provider client={client}>
                <div className={'text-center my-8'}>
                    <p className={'font-bold text-6xl'}>Gainz on Chain</p>
                    <p className={'text-2xl my-2'}>-- User Application --</p>
                </div>

                <header className={'my-4'}>
                    <Profile></Profile>
                </header>


                <main className={'text-center my-4'}>
                    <Dapp></Dapp>
                </main>
            </Provider>
        </div>

    )
}

export default UserApp;