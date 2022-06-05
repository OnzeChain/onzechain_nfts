import Link from 'next/link'

// icons
import { AiOutlineClose } from 'react-icons/ai';

// component
import Icon from '../Icon';


// functions

const SideNav = () => {
    return (
        <div id='sideNav' className="fixed top-0 left-0 z-30 flex flex-col items-center justify-start w-0 h-screen overflow-hidden text-lg transition-all text-primary dark:text-sideColor bg-secondary dark:bg-primary">
            <div className="flex items-center justify-center justify-between w-full px-8 py-4 text-base transition-all">
          
                <div onClick={hideNav} className="cursor-pointer " >
                    <Icon icon={< AiOutlineClose size='32' className='' />} text={''} />
                </div>
            </div>
            {/* nav header */}
            <div className="flex flex-col items-center justify-center justify-around m-3 text-xl text-primary">
                <Link href="/">
                    <a onClick={hideNav}  >
                        Home
                    </a>
                </Link>
                <Link href="/create-items">
                    <a onClick={hideNav}  >
                        Sell Digital Asset
                    </a>
                </Link>
                <Link href="/my-assets">
                    <a onClick={hideNav}  >
                        My Digital Assets
                    </a>
                </Link>
                <Link href="/creator-dashboard">
                    <a onClick={hideNav}  >
                        My Dashboard
                    </a>
                </Link>
            </div>
        </div>
    )
}

const hideNav = () => {
    const nav = document.getElementById('fixed top-0 left-0 z-30 flex flex-col items-center justify-start w-0 h-screen overflow-hidden text-lg transition-all text-primary dark:text-sideColor bg-secondary dark:bg-primary');
    nav.style.width = '0%';
}


export default SideNav;