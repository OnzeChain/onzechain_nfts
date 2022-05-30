import Link from 'next/link'
//import QuickLogo from '../assets/images/fulllogo_transparent_nobuffer.png'
import { useTheme } from 'next-themes'

const Header = ({ }) => {
    const { theme, setTheme } = useTheme()
    return (
        <div className='w-screen px-8 py-3 text-sm border-b border-opacity-50 flexCenter border-secondary '>
            <div className='justify-between w-screen mx-auto flexCenter max-w-7xl'>
                
                {/* <Link to='/'>
                    <img src={QuickLogo} alt='QuickLogo' height={60} />
                </Link> */}
                
                <nav id='nav' className="w-auto p-2 bg-transparent border-b md:bg-secondary md:w-4/6">
                    <div className="justify-around hidden m-3 flexCenter text-primary md:flex ">
                        <Link href="/">
                            <a className="nav-Link">
                                Explore
                            </a>
                        </Link>
                        <Link href="/create-asset">
                            <a className="nav-Link">
                                Mint
                            </a>
                        </Link>
                        <Link href="/my-assets">
                            <a className="nav-Link">
                                My NFTs
                            </a>
                        </Link>
                        <Link href="/dashboard">
                            <a className="nav-Link">
                                Account Dashboard
                            </a>
                        </Link>
                    </div>
                </nav>
                <header className='justify-between flexCenter'>
                <button
          className="px-4 py-2 mt-16 font-semibold text-white bg-black rounded-md dark:text-black dark:bg-white"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          Change Theme
        </button>
                </header>
            </div>
        </div>
    )
}

const dropNav = () => {
    const nav = document.getElementById('sideNav');
    nav.style.width = '100%';
}


export default Header;