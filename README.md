# onzechain_nfts
# Developement
For developers looking to contribute or modify the code, or view the example use the following commands:


  git clone https://github.com/OnzeChain/onzechain_nfts.git
  
  cd onzechain_nfts
  
  yarn install
  
  create file config.js and update with 
  
   export const nftaddress = ''
   
   export const nftmarketaddress = ''
   
  Create .secrete file and add your private key
  
  create .env file and update with 
  
  NEXT_PUBLIC_WORKSPACE_URL="infra_url"
  
  create another file .appId and update with infra ID
  
  yarn run dev
