import React from 'react';

function Info() {
    return (
        <div className={'container mx-auto px-20 font-mono m-2'}>
            <div className={'border-4 border-black border-double text-2xl'}>
                <div className={'text-center'}>
                    <p className={'font-bold text-6xl my-8'}> Start Here </p>
                    <div className={'my-4'}>
                        <p className={'font-bol text-4xl my-4 text-red-700'}>
                            FIRST DECENTRALIZED CASINO
                        </p>
                        <p>
                            Take part in the only online casino that allows their
                            users to own shares of the House (where $CHIPS are deposited/withdrawn
                            during bets/winnings).
                        </p>
                    </div>
                    <div className={'my-8'}>
                        <p className={'font-bol text-4xl my-4 text-red-700'}>
                            ON-CHAIN BETS
                        </p>
                        <p>
                            All seeds generators of our online games are stored on the blockchain.
                        </p>
                    </div>
                    <div className={'my-8'}>
                        <p className={'font-bol text-4xl my-4 text-red-700'}>
                            FIRST STOP: CARD NFTS
                        </p>
                        <p>
                            Before launching our main platform, we invite you to take part
                            in our NFT collection where you can win rewards based on poker
                            combinations.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Info;