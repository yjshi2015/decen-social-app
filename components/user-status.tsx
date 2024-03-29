import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead, useDisconnect } from "@thirdweb-dev/react";
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { truncateAddress } from "../utils/truncateAddress";

export default function UserStatus() {
    const address = useAddress();
    const disconnect = useDisconnect();
    const [newStatus, setNewStatus] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const characterDecoration = characterCount >= 140 ? styles.characterCountOver : styles.characterCountUnder;

    const { contract } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: myStatus,
        isLoading: isMyStatusLoading,
    } = useContractRead(contract, "getStatus", [address]);

    if (!address) {
        return (
            <div>
                <ConnectWallet
                    modalSize="compact"
                />
                <p>Please connect your wallet.</p>
            </div>
        );
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.statusHeader}>
                {/* 展示当前账户地址 */}
                <Link href={`/account/${address}`} style={{ color: "white" }}>
                    <p className={styles.connectedAddress}>{truncateAddress(address!)}</p>
                </Link>
                {/* 推出登陆按钮 */}
                <button
                    className={styles.logoutButton}
                    onClick={() => disconnect()}
                >Logout</button>
            </div>

            {/* 展示当前账户的状态 */}
            {!isMyStatusLoading && myStatus && (
                <div>
                    <p className={styles.statusText}>{myStatus}</p>
                </div>
            )}

            <button
                className={styles.updateButton}
                onClick={() => setIsStatusModalOpen(true)}
            >Update</button>

            {isStatusModalOpen && (
                <div className={styles.statusModalContainer}>
                    <div className={styles.statusModal}>
                        <div className={styles.statusModalHeader}>
                            <p>New Status:</p>
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                            >Close</button>
                        </div>
                        <textarea
                            value={newStatus}
                            onChange={(e) => {
                                setNewStatus(e.target.value)
                                setCharacterCount(e.target.value.length)
                            }}
                            placeholder="Enter your status"
                        />
                        <div className={styles.characterCountContainer}>
                            <p className={characterDecoration}>{characterCount}/140</p>
                        </div>
                        <Web3Button
                            className={styles.statusModalButton}
                            contractAddress={STATUS_CONTRACT_ADDRESS}
                            action={(contract) => contract.call(
                                "setStatus",
                                [newStatus]
                            )}
                            isDisabled={characterCount === 0 || characterCount > 140}
                            onSuccess={() => {
                                setIsStatusModalOpen(false);
                                setNewStatus("");
                            }}
                        >Update Status</Web3Button>
                    </div>
                </div>
            )}
        </div>
    )
};