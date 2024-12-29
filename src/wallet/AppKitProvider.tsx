import React, {FC, ReactNode} from 'react';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
import {createAppKit} from '@reown/appkit/react';
import {mainnet, arbitrum} from 'viem/chains';
import siweConfig from './siweConfig';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = '858fe7c1b740043cb35051384b89859b';

// 2. Create a metadata object - optional
const metadata = {
    name: 'Sticknet',
    description: 'Secure Social Storage',
    url: 'https://sticknet.org',
    icons: [
        'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/sticknet-icon.png?alt=media&token=2b665dae-a63d-4884-a92e-59d5899530dc',
    ],
};

// 3. Set the networks
const networks = [mainnet, arbitrum];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks: [mainnet, arbitrum],
    projectId,
    ssr: true,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum],
    projectId,
    metadata,
    features: {
        email: false,
        socials: [],
        analytics: true, // Optional - defaults to your Cloud configuration
    },
    siweConfig
});

const AppKitProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
};

export default AppKitProvider;
