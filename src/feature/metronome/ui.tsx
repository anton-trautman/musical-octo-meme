import React, { useState, useEffect, useRef } from "react";
import { ComponentContainer } from "../../shared/styled";
import { ToggleButton } from "../../shared/ui/toggle-button";
import {
  Beat,
  VisualMetronome,
  Control,
  Button,
  SmallButton,
  Label,
  Input,
  Select,
} from "./styled";

const TIME_SIGNATURES = [
  "2/4",
  "3/4",
  "4/4",
  "3/8",
  "5/8",
  "6/8",
  "5/4",
  "7/8",
];

function Metronome() {
  const [tempo, setTempo] = useState(120);
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);

  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const tapTempoTimesRef = useRef<number[]>([]);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setCurrentBeat(0); // Reset the beat when tempo or time signature changes
      startMetronome();
    } else {
      stopMetronome();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, tempo, timeSignature]);

  const startMetronome = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentBeat(0);
    const intervalMs = 60000 / tempo;
    timerRef.current = window.setInterval(() => {
      setCurrentBeat((prevBeat) => {
        const newBeat = (prevBeat + 1) % getBeatsPerMeasure();
        playClick(newBeat === 0); // Pass true if it's the first beat
        return newBeat;
      });
    }, intervalMs);
  };

  const stopMetronome = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentBeat(0);
  };

  const playClick = (isFirstBeat: boolean) => {
    if (audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        isFirstBeat ? 440 : 880,
        audioContextRef.current.currentTime
      );

      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.setValueAtTime(1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContextRef.current.currentTime + 0.05
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.05);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = parseInt(e.target.value, 10);
    if (!isNaN(newTempo) && newTempo > 0) {
      setTempo(newTempo);
    }
  };

  const handleTimeSignatureChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeSignature(e.target.value);
  };

  const getBeatsPerMeasure = () => {
    return parseInt(timeSignature.split("/")[0], 10);
  };

  const adjustTempo = (amount: number) => {
    setTempo((prevTempo) => Math.max(1, prevTempo + amount));
  };

  const handleTapTempo = () => {
    const now = Date.now();
    tapTempoTimesRef.current.push(now);

    if (tapTempoTimesRef.current.length > 4) {
      tapTempoTimesRef.current.shift();
    }

    if (tapTempoTimesRef.current.length > 1) {
      const intervals = tapTempoTimesRef.current
        .slice(1)
        .map((time, index) => time - tapTempoTimesRef.current[index]);
      const averageInterval =
        intervals.reduce((sum, interval) => sum + interval, 0) /
        intervals.length;
      const newTempo = Math.round(60000 / averageInterval);
      setTempo(newTempo);
    }
  };

  return (
    <ComponentContainer>
      <Button onClick={handleTapTempo}>Tap Tempo</Button>

      <VisualMetronome>
        {Array.from({ length: getBeatsPerMeasure() }).map((_, index) => (
          <Beat
            key={index}
            active={index === currentBeat}
            isFirstBeat={index === 0}
          />
        ))}
      </VisualMetronome>
      <Control>
        <Label htmlFor="tempo">Tempo (BPM):</Label>

        <SmallButton onClick={() => adjustTempo(-5)}>-5</SmallButton>
        <Input
          id="tempo"
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          min="1"
        />
        <SmallButton onClick={() => adjustTempo(5)}>+5</SmallButton>
      </Control>
      <Control
        style={{
          marginTop: "20px",
        }}
      >
        <Label htmlFor="timeSignature">Time Signature:</Label>
        <Select
          id="timeSignature"
          value={timeSignature}
          onChange={handleTimeSignatureChange}
        >
          {TIME_SIGNATURES.map((ts) => (
            <option key={ts} value={ts}>
              {ts}
            </option>
          ))}
        </Select>
      </Control>
      {/* <Button onClick={togglePlayPause}>{isPlaying ? "Stop" : "Start"}</Button> */}

      <ToggleButton active={isPlaying} onClick={togglePlayPause} />
    </ComponentContainer>
  );
}

export default Metronome;
