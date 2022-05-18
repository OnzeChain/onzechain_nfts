import Link from 'next/link'


// functions

const SideNav = () => {
    return (
        <div id='sideNav' className="sideNav">
            <div className="justify-between w-full px-8 py-4 text-base transition-all flexCenter">
                {/* nav close btn */}
            </div>
            {/* nav header */}
            <div className="sideNav-Links">
                <Link href="/">
                    <a onClick={hideNav}  >
                        Explore
                    </a>
                </Link>
                <Link href="/create-asset">
                    <a onClick={hideNav}  >
                        Mint
                    </a>
                </Link>
                <Link href="/my-assets">
                    <a onClick={hideNav}  >
                        My NFTs
                    </a>
                </Link>
                <Link href="/dashboard">
                    <a onClick={hideNav}  >
                        Account Dashboard
                    </a>
                </Link>
            </div>
        </div>
    )
}

const hideNav = () => {
    const nav = document.getElementById('sideNav');
    nav.style.width = '0%';
}


export default SideNav;