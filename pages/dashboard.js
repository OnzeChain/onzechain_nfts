//components
import NFTcard from '../components/NFT-card';
import NoNFTS from '../components/No-NFTs';

// others
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function Dashboard() {
    const [nfts, setNfts] = useState([]);
    const [sold, setSold] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded'); //set loaded later

    useEffect(() => {
        loadNFTs();
    }, [])

    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const data = await marketContract.fetchItemsCreated()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                // likes: i.likes,
            }
            return item
        }))
        /* create a filtered array of items that have been sold */
        const soldItems = items.filter(i => i.sold)
        setSold(soldItems)
        setNfts(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <NoNFTS title={'No assets created right now...'} />
    )

    return (
        <div className="">
            <div className='flex-col mb-4 flexCenter'>
                <h1 className='p-4 text-2xl font-bold border-b border-opacity-50 md:text-3xl border-secondary-dark'>Here's your created NFTs</h1>
                <div className='overflow-hidden flexCenter'>
                    <div className="grid grid-cols-1 gap-6 py-4 normal-case md:grid-cols-2 xl:grid-cols-3">
                        {
                            nfts.map((nft, i) => (
                                <NFTcard key={i} likes={'0'} image={nft.image} owner={nft.owner} name={nft.name} price={nft.price} description={nft.description} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                Boolean(sold.length) && (
                    <div className="">
                    <div className='flex-col flexCenter'>
                        <h1 className='p-4 text-2xl font-bold border-b border-opacity-50 md:text-3xl border-secondary-dark'>Here's your sold NFTs</h1>
                        <div className='overflow-hidden flexCenter'>
                            {
                                sold.map((nft, i) => (
                                    <NFTcard key={i} likes={'0'} image={nft.image} owner={nft.owner} name={nft.name} price={nft.price} description={nft.description} />
                                ))
                            }
                        </div>
                    </div>
                    </div>
                )
            }
        </div>
    )
}