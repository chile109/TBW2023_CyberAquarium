export type ensDataType = {
  ensName?: string,
  avatarUrl?: string,
  twitter?: string,
  github?: string,
  websiteUrl?: string
  email?: string,
  ethAddress?: string,
}

export type nftsData ={
  identifier: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
}

export type Trait = {
  trait_type: string;
  display_type: null; 
  max_value: null;    
  value: string;
};

export type NFT = {
  identifier?: string;
  collection?: string;
  contract?: string;
  token_standard?: string;
  name?: string;
  description?: string;
  image_url?: string;
  metadata_url?: string;
  opensea_url?: string;
  owners?: { address: string; quantity: number };
  updated_at?: string;
  is_disabled?: boolean;
  is_nsfw?: boolean;
  traits: Trait[];
};

export type NFTData = {
  nfts: NFT[];
};

export type aquariumDataType = {
  nft: NFT;
}