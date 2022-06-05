/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
// /* eslint-disable @next/next/no-img-element */


import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Container = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} style={{ overflowX: 'scroll', width: '500px' }}>
        {props.children}
      </div>
    )
  })

  const NoNFTSs = () => {
    const lazyRoot = React.useRef(null)
  
    return (
      <Container ref={lazyRoot}>
          
        <Image lazyRoot={lazyRoot} src="/grayscale_transparent_nobuffer.png" width="500" height="500" />
                <p className='mt-4 text-base font-bold'>try creating your own?
                 <Link href='/create-items'>
                     <a className='text-sm underline text-sideColor-light'> create digital asset</a>
                 </Link>
             </p>
      </Container>
    )
  }

  export default NoNFTSs;