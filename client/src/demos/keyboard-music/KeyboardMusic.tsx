import React, { useEffect, useState } from "react";
import Tones from "./Tones";
import { compact } from "lodash";

const KeyboardMusic = () => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  useEffect(() => {
    const addKey = ({ key }: KeyboardEvent) => {
      setKeys(keys => new Set(keys).add(key));
    };
    const removeKey = ({ key }: KeyboardEvent) => {
      setKeys(keys => {
        const nextKeys = new Set(keys);
        nextKeys.delete(key);
        return nextKeys;
      });
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
        <Tones freqs={compact([...keys].map(getFreqFromKey))} />
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
