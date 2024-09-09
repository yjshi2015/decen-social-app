import { useContractEvents } from "thirdweb/react";
import { getContract, prepareEvent } from "thirdweb";
import { lineaSepolia } from "thirdweb/chains";
import { client } from "../client";

import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import EventCard from "./eventCard";
import React from "react";
import styles from '../styles/Home.module.css';

export default function StatusEvents() {

    const contract = getContract({
        client,
        address: STATUS_CONTRACT_ADDRESS,
        chain: lineaSepolia,
    });

    const statusUpdateEvent = prepareEvent({
        signature: "event StatusUpdated(address indexed user, string newStatus, uint64 timestamp)",
    });

    const {
        data: statusEvents,
        isLoading: isStatusEventsLoading,
    } = useContractEvents({
        contract,
        events: [statusUpdateEvent],
    });

    return (
        <div className={styles.container} style={{ maxWidth: "500px" }}>
            {!isStatusEventsLoading && statusEvents && (
                statusEvents.slice(0, 30).map((event, index) => (
                    <EventCard
                        key={index}
                        walletAddress={event.args.user}
                        newStatus={event.args.newStatus}
                        timeStamp={event.args.timestamp}
                    />
                ))
            )}
        </div>
    )
};