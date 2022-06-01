/* eslint-disable @next/next/no-img-element */
// icons 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';

//components
import Icon from '../components/Icon';
import NoNFTS from '../components/No-NFTs';

// others
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { useTheme } from 'next-themes'
import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'


export default function Home() {
  const { theme, setTheme } = useTheme()
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded'); //set loaded later

  useEffect(() => {
    loadNFTs();
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/dd69e3a95b884508acf4888dec62d415")
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    // map all the items to get the tkon URI to get the META data from the token
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
        likes: meta.data.likes,
      }

      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
      value: price
    })

    await transaction.wait();
    loadNFTs()
  }
  if (loadingState === 'loaded' && !nfts.length) return (<NoNFTS title={'no items in market right now...'} />)

  return (
    <div className="bg-white dark:bg-black">
    <div className='flex-col mb-4 flexCenter'>
      <h1 className='p-4 text-2xl font-bold border-b border-opacity-50 md:text-3xl border-secondary-dark'>Welcome To NFT marketPlace</h1>
      <div className='overflow-hidden flexCenter'>
        <div className="grid grid-cols-1 gap-6 py-4 normal-case md:grid-cols-2 xl:grid-cols-3">
          {
            nfts.length === 0 ?
              <div className=' col-span-full'>
              </div>
              : nfts.map((nft, i) => (
                <div key={i} style={{ 'min-height': '30rem' }} className="flex-col overflow-hidden border border-opacity-50 shadow w-96 border-secondary-dark rounded-xl flexCenter">
                  <div className='justify-end w-full px-3 py-3 border-b border-opacity-50 border-secondary-dark flexCenter'>
                    <Icon extraStyle=' flex-row-reverse' icon={< AiOutlineHeart size='24' className='mr-1 opacity-50 cursor-pointer text-secondary-dark' />} text={'0'} />
                  </div>
                  <div className='flex-col justify-between w-full h-full p-2 flexCenter '>
                    <img className='w-full rounded-md min-h-1/2' src={nft.image} alt='Asset picture' />
                    <div className="w-full py-4">

                      <p title={nft.owner} className='text-sm opacity-50 text-secondary-dark noOverflowText'>Created by {nft.owner}</p>

                      <div className='justify-between w-full py-1 text-xl font-bold flexCenter'>
                        <p title={nft.name} className='w-3/4 text-secondary-dark noOverflowText'>{nft.name}</p>
                        <Icon extraStyle='text-xl flex-row-reverse' icon={< FaEthereum size='16' className='text-sideColor' />} text={nft.price} />
                      </div>

                      <p className='text-sm opacity-50 noOverflowText-2lines text-secondary-dark ' title={nft.description} >{nft.description}</p>

                    </div>
                    <button className="justify-self-end btn-main" onClick={() => buyNft(nft)}>Buy Now</button>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
    </div>
  )
}
