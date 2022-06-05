
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex flex-col items-center justify-center w-screen capitalize bg-secondary text-primary' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className='flex flex-col-reverse items-start items-center justify-center justify-between w-screen p-4 m-4 mt-0 mb-6 max-w-7xl text-primary md:flex-row'>
                <div>
                    <p className='font-semibold'>&#169; ONZECHAIN MARKETPLACE</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;