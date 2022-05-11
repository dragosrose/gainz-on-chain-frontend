import {useAccount, useConnect, useNetwork} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import {useEffect, useState} from "react";

var Hand = require('pokersolver').Hand;

let handHeld = [];
let selectedNFT = [];

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
            contractAddresses: ['0x16ad777ac52B1d9681E99802E1099EFD9A59d7e7']
        })).ownedNfts;
    }



    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState('');

    const selectNFT = (props, id) => {
        if (selectedNFT.includes(id)){
            const index = selectedNFT.indexOf(id);
            selectedNFT.splice(index, 1);
            handHeld.splice(index, 1);
        } else {
            if(selected.length >= 5)
                return;
            selectedNFT.push(id);
            const value = props[1].value;
            const suits = props[2].value;

            handHeld.push({key: id, value: [value, suits]})

        }

        setSelected([...selectedNFT]);

    }

    const toSuit = (prop) => {
        switch (prop) {
            case 'Clubs': {
                return 'c'
            }
            case 'Diamonds': {
                return 'd';
            }
            case 'Hearts': {
                return 'h';
            }
            case 'Spades': {
                return 's';
            }
        }
    }

    const toNumber = (prop) => {
        if(prop === '10')
            return 'T';
        return prop;
    }

    const resolveHand = () => {
        var aux = handHeld.map(card => [toNumber(card.value[0]), toSuit(card.value[1])].join(''));
        var hand = Hand.solve(aux);
        console.log(hand.name);
        setStatus(hand.name);
    };

    useEffect(() => {
        async function fetchData() {
            setNfts(await retrieveNFTS());
        }
        fetchData();
    }, [account.data])

    function Card({nft}) {
        return (
            <div>
                <div className={'w-full overflow-hidden flex justify-center items-center'}>
                    <img style={{
                        border: selected.includes(nft.metadata.edition) ? '4px solid green' : '4px solid red',

                    }}
                         onClick={() => selectNFT(nft.metadata.attributes, nft.metadata.edition)}
                         src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                         alt={'nft'}/>
                </div>

                <ul className={'my-4 text-center font-bold'}>
                    <li>Name: {nft.metadata.name}</li>
                    <li>Id: {nft.metadata.edition}</li>

                </ul>
            </div>
        );
    }

    if (activeConnector) {
        return (
            <div className={'text-neutral-200 m-8'}>
                <p>Connected to {account.data.address}</p>
                {activeChain && <div>Connected to {activeChain.name}</div>}
                <div className={'grid grid-cols-4 gap-4 my-4'}>
                    {nfts && nfts.map((nft, key) =>

                        <Card nft={nft} state={selected}></Card>

                        )
                    }
                </div>

                <button className={'text-black'} onClick={resolveHand}>
                    Check Hand
                </button>

                <p className={'text-green-600'}>{status}</p>

            </div>
        )
    }
    return <button onClick={() => connect()}>Connect Wallet</button>
}



export default Profile;