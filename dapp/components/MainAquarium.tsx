import WrapWalletLink from "./WrapWalletLink";
import SidebarMenu from "./SidebarMenu";
import AquariumBag from "./AquariumBag";
import { useGetNFT } from '../hooks/openSeaApi';
import Image from 'next/image'

// image, address, tba, 
const chain = 'sepolia'
const identifier = '1'
const _address = '0x6CcA2d398B2060DC824ba0Cdaf69a8e8344C329e'

const MainAquarium = () => {
  const { nfts } = useGetNFT(chain, identifier, _address)
  if (nfts === undefined) {
    return null;
  }

  return (
    <main className="...">
      <Image src={nfts.image_url as any} alt={''}
        layout='fill'
        style={{ zIndex: -99 }}
      ></Image>
      <div className="...">
        <WrapWalletLink />
        <AquariumBag />
        <SidebarMenu />
      </div>
    </main>
  )
}

export default MainAquarium