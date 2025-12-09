import React from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'


// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css'
import Airdrop from './Airdrop';
import { SignMessage } from './SignMessage';

// Airdrop
function App() {
  // create your own rpc url? Alchemy
  return (
    <div style={{ backgroundColor: "black", color: "#00ff00", fontFamily: "monospace", padding: "20px", minHeight: "100vh" }}>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <Airdrop />
            <SignMessage />
            <WalletDisconnectButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App