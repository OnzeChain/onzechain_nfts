

// others
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex-col w-screen capitalize flexCenter bg-secondary text-primary '>
            <div className='flex-col-reverse items-start justify-between w-screen p-4 m-4 mt-0 mb-6 flexCenter max-w-7xl text-primary md:flex-row'>
                <div>
                    <p className='font-semibold'>&#169; ONZECHAIN MARKETPLACE</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;