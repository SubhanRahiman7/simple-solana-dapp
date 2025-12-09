import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction
} from "@solana/web3.js";


export default function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        if (!wallet.publicKey) return alert("Connect wallet");

        let to = document.getElementById("to").value;
        let amount = Number(document.getElementById("amount").value);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        await wallet.sendTransaction(transaction, connection);
        alert("Sent SOL");
    }

    async function sendAirdropToUser() {
        if (!wallet.publicKey) return alert("Connect wallet");

        let amount = Number(document.getElementById("publicKey").value);

        await connection.requestAirdrop(
            wallet.publicKey,
            amount * LAMPORTS_PER_SOL
        );

        alert("Airdropped SOL");
    }

    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML =
                "SOL Balance: " + balance / LAMPORTS_PER_SOL;
        }
    }

    return (
        <div style={{ border: "1px solid #00ff00", padding: "15px", marginTop: "20px" }}>
            <h2>Airdrop section</h2>
            <input id="publicKey" type="text" placeholder="Amount" />
            <button onClick={sendAirdropToUser}>Airdrop Amount</button>
            <h2>Balance section</h2>
            <p id="balance">SOL Balance:</p>
            <button onClick={getBalance}>get balance</button>
            <br />
            <h2>Send Amount to someone</h2>
            <input id="to" type="text" placeholder="To" />
            <input id="amount" type="text" placeholder="Amount" />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}
