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
    let osc = audioContext.createOscillator();
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

const audioContext = new AudioContext();

const masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = 0.5;

let osc = audioContext.createOscillator();
osc.connect(masterGainNode);

// Types

type Waveform = "sine" | "square" | "triangle" | "sawtooth";
