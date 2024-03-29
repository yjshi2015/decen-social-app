import { useContract, useContractEvents } from "@thirdweb-dev/react"
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import EventCard from "./eventCard";
import React from "react";

export default function StatusEvents() {
    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: statusEvents,
        isLoading: isStatusEventsLoading,
    } = useContractEvents(
        contract,
        "StatusUpdated",
        {
            subscribe: true,
        }
    );

    return (
        <div>
            {!isStatusEventsLoading && statusEvents && (
                statusEvents.slice(0, 30).map((event, index) => (
                    <EventCard
                        key={index}
                        walletAddress={event.data.user}
                        newStatus={event.data.newStatus}
                        timeStamp={event.data.timestamp}
                    />
                ))
            )}
        </div>
    )
};