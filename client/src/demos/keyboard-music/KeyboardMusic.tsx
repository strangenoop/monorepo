import React, { useEffect, useState } from "react";
import Tones from "./Tones";
import { compact } from "lodash";

const KeyboardMusic = () => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  useEffect(() => {
    const addKey = ({ key }: KeyboardEvent) => {
      if (!keys.has(key)) {
        setKeys(keys => new Set(keys).add(key));
      }
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

const multiplier = 2 ** (1 / 12);
const root = 440;

const fq = (distanceFromRoot: number) => {
  // Say the key is 3 units away from the root.
  // We want to multiply the root frequency by the multiplier 3 times.
  // == (((R * M) * M) * M)
  // == R * (M * M * M)
  // == R * (M ** 3)
  // QUESTION: how does it work for negative distances?
  return root * multiplier ** distanceFromRoot;
};

const piano = {
  b3: 246.9417,
  c4: 261.6256,
  d4: 293.6648,
  e4: 329.6276,
  f4: 349.2282,
  g4: 391.9954,
  as4: fq(1),
  a4: fq(0),
  b4: 493.8833,
  c5: 523.2511,
  d5: 587.3295,
  e5: 659.2551
};

const mapKeyToFreq: { [key: string]: number } = {
  a: piano.c4,
  s: piano.d4,
  d: piano.e4,
  f: piano.f4,
  g: piano.g4,
  h: piano.a4,
  j: piano.b4,
  k: piano.c5,
  l: piano.d5,
  ";": piano.e5
};
