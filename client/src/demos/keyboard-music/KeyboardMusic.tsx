import React, { useEffect, useState } from "react";
import Tones from "./Tones";
import { compact } from "lodash";

const KeyboardMusic = () => {
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    const addKey = (e: KeyboardEvent) => {
      const newKey = e.key;
      if (!keys.includes(newKey)) {
        setKeys([...keys, newKey]);
      }
    };
    const removeKey = (e: KeyboardEvent) => {
      const oldKey = e.key;
      setKeys(keys.filter(key => key !== oldKey));
    };
    window.addEventListener("keydown", addKey);
    window.addEventListener("keyup", removeKey);
    return () => {
      window.removeEventListener("keydown", addKey);
      window.removeEventListener("keyup", removeKey);
    };
  });
  return (
    <>
      <div>{keys}</div>
      <div>
        <Tones freqs={compact(keys.map(getFreqFromKey))} />
      </div>
    </>
  );
};

export default KeyboardMusic;

const getFreqFromKey = (key: string) => {
  return mapKeyToFreq[key] || null;
};

const mapKeyToFreq: { [key: string]: number } = {
  a: 440,
  s: 440 * 1.1,
  d: 440 * 1.2,
  f: 440 * 1.3
};
