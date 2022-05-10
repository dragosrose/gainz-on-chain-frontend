import React, {useEffect, useState} from 'react';
import {useContract, useNetwork, useSigner, useSignMessage} from "wagmi";
import contractABI from "../contracts/contractABI.json"
import Whitelisted from "./Whitelisted";
import {formatEther, parseEther, verifyMessage} from "ethers/lib/utils";
import {ethers} from "ethers";
import keccak256 from "keccak256";

function Dapp() {
    const whitelist = new Whitelisted();
    let tree = whitelist.merkleTree;

    // console.log(tree.getHexRoot());
    const account = useSigner();
    let address;
    if(account.data) {
        address = account.data.getAddress();
    }

    // useProvider() method exceeded request rate, working with only injected provider.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { activeChain } = useNetwork();

    const contract = useContract({
        addressOrName: '0x141482F609578d29F009DAE6A542395Fa1f332e2',
        contractInterface: contractABI.abi,
        signerOrProvider: account.data || provider
    });

    const [status, setStatus] = useState('');

    const [quantity, setQuantity] = useState(0);
    const [proof, setProof] = useState([]);
    const [price, setPrice] = useState(0.02);

    const getProof = async() => {
        setProof(tree.getHexProof(keccak256(await address)));
    }

    const getWhitelistStatus = async () => {
        return await contract.getOnlyWhitelisted();
    }

    // TURBEZ
    const mint = async() => {
        if(proof.length === 0){
            await getProof();

        } else {
            console.log(proof);
            const tx = await contract.mint(quantity, proof, {value: parseEther(price.toString())});
            await tx.wait();
            setStatus("You have succesfully minted.");
        }
    }


    if(account.data && activeChain.id === 4)
        return (
            <div className={'flex flex-col space-y-4'}>
                <div>
                    <button className={'p-4'} onClick={mint}>Mint</button>
                    <input type={'number'} placeholder={'0'} min={0} max={5} className={'p-2 text-center'}
                    onChange={(event) => {setQuantity(event.target.value)}}/>
                </div>

                <div>
                    <p className={'text-green-600'}>{status}</p>
                </div>

            </div>
        );

    return (
        <div>
            <p>Please switch to Rinkeby.</p>
        </div>
    );
}

export default Dapp;