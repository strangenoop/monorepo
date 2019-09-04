import React, { useEffect } from "react";

const Tones = ({
  waveform = "sine",
  freqs
}: {
  waveform?: Waveform;
  freqs: number[];
}) => {
  return (
    <>
      {freqs.map((freq, i) => (
        <Tone key={freq + i} waveform={waveform} freq={freq} />
      ))}
    </>
  );
};

export default Tones;

const Tone = ({ waveform, freq }: { waveform: Waveform; freq: number }) => {
  useEffect(() => {
    let osc = audioCtx.createOscillator();
    osc.connect(masterGainNode);
    osc.type = waveform;
    osc.frequency.value = freq;
    osc.start();
    return () => {
      osc.stop();
    };
  });
  return <>{freq}</>;
};

// Setup

const audioCtx = new AudioContext();

const masterGainNode = audioCtx.createGain();
masterGainNode.connect(audioCtx.destination);

// Types

type Waveform = "sine" | "square" | "triangle" | "sawtooth";
