import React, {FC, ReactNode} from 'react';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
// eslint-disable-next-line import/no-unresolved
import {createAppKit} from '@reown/appkit/react';
import {mainnet, arbitrum, optimism} from 'viem/chains';
import siweConfig from './siweConfig';

const queryClient = new QueryClient();

const projectId = '858fe7c1b740043cb35051384b89859b';

const metadata = {
    name: 'Sticknet',
    description: 'Secure Social Storage',
    url: 'https://sticknet.org',
    icons: [
        'https://firebasestorage.googleapis.com/v0/b/stiiick-1545628981656.appspot.com/o/sticknet-small.png?alt=media&token=145ee059-7a0f-42b4-b03e-7547a0429411',
    ],
};

const networks = [mainnet, arbitrum, optimism];

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum],
    projectId,
    metadata,
    features: {
        email: false,
        socials: [],
        analytics: true,
    },
    siweConfig,
});

const AppKitProvider: FC<{children: ReactNode}> = ({children}) => {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
};

export default AppKitProvider;
