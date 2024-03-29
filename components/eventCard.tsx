import Link from "next/link";
import styles from "../styles/Home.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { BigNumber } from "ethers";

type EventCardProps = {
    walletAddress: string;
    newStatus: string;
    timeStamp: BigNumber;
};

export default function EventCard(props: EventCardProps) {
    // 将 BigNumber 类型的时间戳转换为 JavaScript 的 Date 对象
    const date = new Date(props.timeStamp.toNumber() * 1000);

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventHeader}>
                {/* 设置账户地址的链接 */}
                <Link href={`account/${props.walletAddress}`} style={{ color: "white" }}>
                    {/* 通过截取地址，以便更友好地展示 */}
                    <p className={styles.connectedAddress}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
            </div>
            <p style={{ fontSize: "16px"}}>{props.newStatus}</p>
        </div>
    );
};