import { ed25519 } from "@noble/curves/ed25519.js";import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing!");
      return;
    }

    const message = document.getElementById("message").value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Message signature invalid!");
      return;
    }
    alert(`Message signature: ${bs58.encode(signature)}`);
  };

  return (
    <div style={{ border: "1px solid #00ff00", padding: "15px", marginTop: "20px" }}>
      <h2>Signing a message</h2>
      <input id="message" type="text" placeholder="Message" />
      <button onClick={onClick}>Sign Message</button>
    </div>
  );
}