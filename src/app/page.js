"use client";

import styles from "./page.module.css";
import Reservation from "./components/reservation/page";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "2vw",
          zIndex: "999",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={styles.logoContainer}
      >
        <Image
          src="/assets/jda_logo.png"
          alt="logo JDA"
          width={200}
          height={200}
        />
        <span className={styles.slogan}>
          Evader vous <br />
          et explorer
        </span>
      </div>

      <div className={styles.triangle}></div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Réserver maintenant</span>
        <div className={styles.arrows}>
          <div className={styles.arrow}></div>
          <div className={styles.arrow}></div>
          <div className={styles.arrow}></div>
        </div>
      </div>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }} className={styles.image}>
        <Image
          src="/assets/welcome_bg.png"
          alt="welcome_bg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <Reservation />
    </div>
  );
}
