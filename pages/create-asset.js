import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function createItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (err) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createdItem() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function createSale(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        //creating the item
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        // parse the price
        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        //list the item for sale on the marketplace
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        await transaction.wait()

        // send the uer to the main page
        router.push('/')
    }

    return (
       
        <div className="flex-col w-full mb-4 flexCenter">
            <h1 className='p-4 text-3xl font-bold'>Mint Your NFT</h1>
            <p className='mb-12 text-xs font-semibold text-center md:text-sm'>Create your art and sell.</p>
            <div className="w-11/12 form md:w-3/4 ">
                <label className='bg-white dark:bg-black' name='Asset-name'>
                    Asset name:
                </label>
                <input
                    placeholder="NFT name"
                    name='Asset-name'
                    id='Asset-name'
                    className='bg-white dark:bg-black'
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <label name='Asset-description'
                className='"bg-white dark:bg-black"'>
                    Asset description:
                </label>
                <textarea
                    placeholder="NFT description"
                    className='bg-white dark:bg-black'
                    name='Asset-description'
                    id='Asset-description'
                    style={{ 'minHeight': '25px' }}
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <label name='Asset-price'
                className='bg-white dark:bg-black'>
                    Asset price (ETH):
                </label>
                <input
                    type='number'
                    maxLength='15'
                    step='0.1'
                    min="0"
                    placeholder="e. g: 0.025"
                    name='Asset-price'
                    id='Asset-price'
                    className="bg-white dark:bg-black"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <label name='Asset-file'
                className='bg-white dark:bg-black'>
                    Asset picture:
                </label>
                <input
                    type="file"
                    name="Asset-file"
                    id='Asset-file'
                    className='bg-white dark:bg-black file-input'
                    onChange={onChange}
                />
                {
                    fileUrl && ( 
                        <img className="w-full my-2 rounded-md" src={fileUrl} />
                    )
                }
                <button onClick={createdItem} className="btn-main">
                    Create Digital Asset
                </button>
            </div>
        </div>
      
    )

}