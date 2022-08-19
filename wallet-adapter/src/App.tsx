// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import './App.css';
import { Wallet, WalletProvider } from '@mysten/wallet-adapter-react';
import { SuiWalletAdapter } from '@mysten/wallet-adapter-sui-wallet';
import { WalletWrapper } from '@mysten/wallet-adapter-ui';
import { TestButton } from './TestButton';

function App() {
  const supportedWallets: Wallet[] = [
    {
      adapter: new SuiWalletAdapter()
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
         <WalletProvider supportedWallets={supportedWallets}>
          <TestButton/>
          <WalletWrapper/>
        </WalletProvider>
      </header>
    </div>
  );
}

export default App;
