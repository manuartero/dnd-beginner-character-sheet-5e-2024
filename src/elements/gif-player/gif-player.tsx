import { useState } from "react";
import styles from "./gif-player.module.css";

type GifPlayerProps = {
  src: string;
  alt?: string;
};

export function GifPlayer({ src, alt = "" }: GifPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.container}>
      {!loaded && <div className={styles.placeholder}>Loading…</div>}
      <img
        src={src}
        alt={alt}
        className={styles.gif}
        style={{
          opacity: loaded ? 1 : 0,
          position: loaded ? "static" : "absolute",
        }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
