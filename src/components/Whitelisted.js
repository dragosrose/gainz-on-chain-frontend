import React from 'react';

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

class Whitelisted{
    constructor() {
         const whitelist = ['0xb9147eB2344F41d26aFc7DDc30C38de1EE44279A',
        '0xDF51D597ea63F17c570A4340733BE70BD6530a5c',
        '0x9384CDAdeb2fFaaCE76f8dcb1fBA5EC738F27A47'];

         const leafNodes = whitelist.map(addr => keccak256(addr));
         this.merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});

    }


}

export default Whitelisted;