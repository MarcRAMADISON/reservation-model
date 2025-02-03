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
          top: "-50px",
          right: "1vw",
          zIndex: "999",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/assets/jda_logo.png"
          alt="logo JDA"
          width={300}
          height={300}
        />
        <span className={styles.slogan}>
          Evader vous <br />
          et explorer
        </span>
      </div>

      <div className={styles.triangle}></div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Réserver maintenant</span>
        <div class={styles.arrows}>
          <div class={styles.arrow}></div>
          <div class={styles.arrow}></div>
          <div class={styles.arrow}></div>
        </div>
      </div>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
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
