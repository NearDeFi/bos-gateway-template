import type { EIP1193Provider } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
import { init, useConnectWallet } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

import icon from '@/assets/images/near_social_icon.svg';

const polygonIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" xml:space="preserve">
    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-457.234" y1="2294.878" x2="2120.766" y2="713.878" gradientTransform="matrix(1 0 0 -1 0 2497.89)">
      <stop offset="0" stop-color="#a229c5"/>
      <stop offset="1" stop-color="#7b3fe4"/>
    </linearGradient>
    <path d="M1250 2500c688 0 1250-563 1250-1250C2500 562 1937 0 1250 0 562 0 0 563 0 1250c0 688 563 1250 1250 1250z" fill="url(#a)"/>
    <path d="m1612 1520 354-204c19-11 30-31 30-53V855c0-22-12-42-30-53l-354-204c-19-11-42-11-61 0l-354 204c-19 11-30 31-30 53v730l-248 143-248-143v-286l248-143 164 94v-192l-133-77c-9-5-20-8-30-8-11 0-21 3-30 8l-354 204c-19 11-30 31-30 53v408c0 22 12 42 30 53l354 204c19 11 42 11 61 0l354-204c19-11 30-31 30-53V916l4-3 244-141 248 143v286l-248 143-163-94v192l133 77c19 11 42 11 61 0l-2 1z" fill="#fff"/>
  </svg>
`

const web3onboardKey = 'web3-onboard:connectedWallets';

const wcV1InitOptions = {
  qrcodeModalOptions: {
    mobileLinks: ['metamask', 'argent', 'trust'],
  },
  connectFirstChainId: true,
};

const walletConnect = walletConnectModule(wcV1InitOptions);
const ledger = ledgerModule();
const injected = injectedModule();

// initialize Onboard
export const onboard = init({
  wallets: [injected, walletConnect, ledger],
  chains: [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://rpc.ankr.com/eth',
    },
    {
      id: 5,
      token: 'ETH',
      label: 'Goerli - Ethereum Testnet',
      rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    },
    {
      id: 1101,
      token: 'ETH',
      label: 'Polygon zkEVM',
      rpcUrl: 'https://zkevm-rpc.com',
      color: '#7b3fe4',
      icon: polygonIcon,
    },
    {
      id: 1442,
      token: 'ETH',
      label: 'zkEVM Testnet',
      rpcUrl: 'https://testnet-zkevm.polygonscan.com',
      color: '#7b3fe4',
      icon: polygonIcon,
    },
  ],
  appMetadata: {
    name: 'NEAR',
    icon: icon.src,
    description: 'NEAR - BOS',
  },
  theme: 'dark',
  containerElements: {
    // connectModal: '#near-social-navigation-bar',
    // accountCenter: "#near-social-web3-account",
  },
});

type EthersProviderContext = {
  provider?: EIP1193Provider;
  useConnectWallet: typeof useConnectWallet;
};

const defaultEthersProviderContext: EthersProviderContext = { useConnectWallet };

export const useEthersProviderContext = singletonHook(defaultEthersProviderContext, () => {
  const [{ wallet }] = useConnectWallet();
  const [ethersProvider, setEthersProvider] = useState(defaultEthersProviderContext);

  useEffect(() => {
    (async () => {
      if (typeof localStorage === 'undefined') return;

      const walletsSub = onboard.state.select('wallets');

      // TODO: do we need to unsubscribe?
      // const { unsubscribe } = walletsSub.subscribe((wallets) => {
      walletsSub.subscribe((wallets) => {
        const connectedWallets = wallets.map(({ label }) => label);
        localStorage.setItem(web3onboardKey, JSON.stringify(connectedWallets));
      });

      const previouslyConnectedWallets = JSON.parse(localStorage.getItem(web3onboardKey) || '[]');

      if (previouslyConnectedWallets) {
        // You can also auto connect "silently" and disable all onboard modals to avoid them flashing on page load
        await onboard.connectWallet({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (!wallet) return;

    setEthersProvider({
      provider: wallet.provider,
      useConnectWallet,
    });
  }, [wallet]);

  return ethersProvider;
});
