import {useAccount, useConnect, useNetwork} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'

function Profile() {
    const account = useAccount();
    const { activeConnector, connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { activeChain } = useNetwork();
    // const web3 = AlchemyWeb3.createAlchemyWeb3('https://eth-rinkeby.alchemyapi.io/v2/UsH6PueRlPIDr11lsg3YIJ8Qs3WUjHUo');
    //
    // const retrieveNFTS = async() => {
    //     return await web3.alchemy.getNfts({
    //         owner: account.data.address,
    //         contractAddresses: ['']
    //     });
    // }



    if (activeConnector) {
        return (
            <div>
                Connected to {account.data.address}
                {activeChain && <div>Connected to {activeChain.name}</div>}

            </div>
        )
    }
    return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile;