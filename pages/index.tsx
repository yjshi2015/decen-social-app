import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import UserStatus from "../components/user-status";
import StatusEvents from "../components/statusEvents";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        
        <div className="{styles.statusContainer}">
          <UserStatus/>
        </div>
        {/* 增加状态流组件 */}
        <h3>Status Feed:</h3>
        <StatusEvents />
      </div>
    </main>
  );
};

export default Home;
