import {useAccount, useConnect, useNetwork} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import {useEffect, useState} from "react";

function Profile() {
    const account = useAccount();
    const [nfts, setNfts] = useState();

    const { activeConnector, connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { activeChain } = useNetwork();
    const web3 = createAlchemyWeb3('https://eth-rinkeby.alchemyapi.io/v2/UsH6PueRlPIDr11lsg3YIJ8Qs3WUjHUo');

    const retrieveNFTS = async() => {
        return (await web3.alchemy.getNfts({
            owner: account.data.address,
            contractAddresses: ['0x141482F609578d29F009DAE6A542395Fa1f332e2']
        })).ownedNfts;
    }

    useEffect(() => {
        async function fetchData() {
            setNfts(await retrieveNFTS());
        }
        fetchData();
    }, [])

    if (activeConnector) {
        return (
            <div>
                Connected to {account.data.address}
                {activeChain && <div>Connected to {activeChain.name}</div>}
                <div className={'grid grid-cols-4 gap-4'}>
                    {nfts && nfts.map(nft =>
                       <button className={'flex justify-center'}>
                           <div>
                               <img
                                   className={'w-2/3'}
                                   src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                                   alt={'nft'}/>
                               <ul>
                                   <li>Name: {nft.metadata.name}</li>
                                   <li>Token Id: {nft.metadata.edition}</li>
                               </ul>
                           </div>

                        </button>)
                    }
                </div>

            </div>
        )
    }
    return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile;