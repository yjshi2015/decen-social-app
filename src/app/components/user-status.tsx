import { useReadContract, useSendTransaction, useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { lineaSepolia } from "thirdweb/chains";
import { client } from "../client";

import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function UserStatus() {
    const account = useActiveAccount();

    const [newStatus, setNewStatus] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const characterDecoration = characterCount >= 140 ? styles.characterCountOver : styles.characterCountUnder;

    const contract = getContract({
        client,
        address: STATUS_CONTRACT_ADDRESS,
        chain: lineaSepolia,
    });

    const { data, isLoading } = useReadContract({
        contract,
        method: "function getStatus(address _user) public view returns (string memory)",
        params: [account?.address ?? ""],
    });

    const { mutateAsync: sendTransaction } = useSendTransaction();

    const onClick = async () => {
        const pts = prepareContractCall({
          contract,
          method: "function setStatus(string memory _status)",
          params: [newStatus],
        });
        await sendTransaction(pts);
        setIsStatusModalOpen(false);
        setNewStatus("");
    };

    return (
        <div className={styles.userContainer} style={{ maxWidth: "500px" }}>
            {/* 展示当前账户的状态 */}
            {!isLoading && data && (
                <div>
                    <p className={styles.statusText}>{data}</p>
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
                        
                        <button onClick={onClick}>Update Status</button>
                    </div>
                </div>
            )}
        </div>
    )
};