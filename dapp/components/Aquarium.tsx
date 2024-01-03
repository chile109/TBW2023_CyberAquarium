import React, { useState, useEffect } from 'react';
import Fish from './Fish';

interface AquariumProps {
  nfts: { id: number; image: string }[];
}

const Aquarium: React.FC<AquariumProps> = ({ nfts }) => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }
    };

    // 初次設定 dimensions
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const waterLayers = [-1, -10, -20, -30, -40, -50, -60];

  return (
    <div>
      {waterLayers.map((zIndex, index) => (
        <div key={index} className='water' style={{ ...dimensions, zIndex }}></div>
      ))}
      {typeof window !== 'undefined' &&
        nfts.map((nft) => <Fish key={nft.id} image={nft.image_preview_url} />)}
    </div>
  );
};

export default Aquarium;
