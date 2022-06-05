/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';

//components
import Icon from '../components/Icon';
import NoNFTS from '../components/No-NFTs';

import { nftaddress, nftmarketaddress } from "../config";

import NFT from '../abi/NFT.json'
import Market from '../abi/NFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.infura.io/v3/dd69e3a95b884508acf4888dec62d415"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (


    <div className='flex flex-col items-center justify-center mb-4'>
    <h1 className='p-4 text-2xl font-bold border-b border-opacity-50 md:text-3xl border-secondary-dark'>Welcome To NFT marketPlace</h1>
    <div className='flex items-center justify-center overflow-hidden'>
      <div className="grid grid-cols-1 gap-6 py-4 normal-case md:grid-cols-2 xl:grid-cols-3">
        {
          nfts.length === 0 ?
            <div className=' col-span-full'>
              <NoNFTS title={'loading NFTs...'} />
            </div>
            : nfts.map((nft, i) => (
              <div key={i} style={{ 'min-height': '30rem' }} className="flex flex-col items-center justify-center overflow-hidden border border-opacity-50 shadow w-96 border-secondary-dark rounded-xl">
                <div className='flex items-center justify-center justify-end w-full px-3 py-3 border-b border-opacity-50 border-secondary-dark'>
                  <Icon extraStyle=' flex-row-reverse' icon={< AiOutlineHeart size='24' className='mr-1 opacity-50 cursor-pointer text-secondary-dark' />} text={'0'} />
                </div>
                <div className='flex flex-col items-center justify-center justify-between w-full h-full p-2 '>
                  <img className='w-full rounded-md min-h-1/2' src={nft.image} alt='Asset picture' />
                  <div className="w-full py-4">

                    <p title={nft.owner} className='overflow-hidden text-sm opacity-50 text-secondary-dark overflow-ellipsis whitespace-nowrap'>Created by {nft.owner}</p>

                    <div className='flex items-center justify-center justify-between w-full py-1 text-xl font-bold'>
                      <p title={nft.name} className='w-3/4 overflow-hidden text-secondary-dark overflow-ellipsis whitespace-nowrap'>{nft.name}</p>
                      <Icon extraStyle='text-xl flex-row-reverse' icon={< FaEthereum size='16' className='text-sideColor' />} text={nft.price} />
                    </div>

                    <p className='text-sm opacity-50 noOverflowText-2lines text-secondary-dark ' title={nft.description} >{nft.description}</p>

                  </div>
                  <button className="relative w-full px-12 py-2 font-bold text-white transition duration-200 bg-purple-600 hover:bg-purple-900 rounded-t-md buttonBright" onClick={() => buyNft(nft)}>Buy Now</button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  </div>
  );
}
