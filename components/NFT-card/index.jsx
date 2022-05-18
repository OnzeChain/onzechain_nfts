// icons 
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';

// components
import Icon from '../Icon';

const NFTcard = ({ key, likes, image, owner, name, price, description }) => {
    return (
        <div key={key} style={{ 'min-height': '28rem' }} className="flex-col overflow-hidden border border-opacity-50 shadow w-96 border-secondary-dark rounded-xl flexCenter">
            <div className='justify-end w-full px-3 py-3 border-b border-opacity-50 border-secondary-dark flexCenter'>
                <Icon extraStyle=' flex-row-reverse' icon={< AiOutlineHeart size='24' className='mr-1 opacity-50 cursor-pointer text-secondary-dark' />} text={likes} />
            </div>
            <div className='flex-col justify-between w-full h-full p-2 flexCenter'>
                <img className='w-full rounded-md min-h-1/2' src={image} alt='Asset picture' />
                <div className="w-full py-4">
                    <p title={owner} className='text-sm opacity-50 text-secondary-dark noOverflowText'>Created by {owner}</p>

                    <div className='justify-between w-full py-1 text-xl font-bold flexCenter'>
                        <p title={name} className='w-3/4 text-secondary-dark noOverflowText'>{name}</p>
                        <Icon extraStyle='text-xl flex-row-reverse' icon={< FaEthereum size='16' className='text-sideColor' />} text={price} />
                    </div>

                    <p className='text-sm opacity-50 noOverflowText-2lines text-secondary-dark ' title={description} >{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NFTcard;