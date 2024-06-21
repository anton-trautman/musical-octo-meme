import { useState, useEffect, useRef, useCallback } from "react";
import {
  autoCorrelate,
  centsOffPitch,
  findClosestNote,
  generateNotesFrequencies,
} from "../utils";
import {
  ScaleMark,
  ScaleMarkTitle,
  TunerContainer,
  TunerDisplay,
  TunerNeedle,
  TunerScale,
} from "../styled";

import { ToggleButton } from "./toggle-button";

const GuitarAutotuner = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const streamRef = useRef<MediaStream | null>(null);
  const [pitch, setPitch] = useState<number | null>(null);
  const [closestNote, setClosestNote] = useState<string>("");
  // const [closestFreq, setClosestFreq] = useState<number>(0);
  const [cents, setCents] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Float32Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const notesFrequenciesRef = useRef<{ [key: string]: number }>(
    generateNotesFrequencies()
  );
  const animationFrameRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
      const detectedPitch = autoCorrelate(
        dataArrayRef.current,
        audioContextRef.current!.sampleRate
      );
      if (detectedPitch !== null) {
        setPitch(detectedPitch);
        const { closestNote: note, closestFreq: freq } = findClosestNote(
          detectedPitch,
          notesFrequenciesRef.current
        );
        setClosestNote(note);
        // setClosestFreq(freq);
        setCents(centsOffPitch(detectedPitch, freq));
      }
    }
    animationFrameRef.current = requestAnimationFrame(update);
  }, [dataArrayRef?.current]);

  const getNeedleRotation = () => {
    // Limit the rotation to -45 to 45 degrees
    return Math.max(-45, Math.min(45, cents));
  };

  const toggleTuner = () => {
    if (isActive) {
      stopTuner();
    } else {
      startTuner();
    }
  };

  useEffect(() => {
    return () => {
      stopTuner();
    };
  }, []);

  const startTuner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      dataArrayRef.current = new Float32Array(analyserRef.current.fftSize);
      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      setIsActive(true);
      update();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopTuner = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsActive(false);
    setPitch(null);
    setClosestNote("");
    // setClosestFreq(0);
    setCents(0);
  };

  return (
    <TunerContainer>
      <TunerDisplay>
        <TunerScale>
          {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((mark) => (
            <ScaleMark key={mark}>
              <ScaleMarkTitle>{mark}</ScaleMarkTitle>
            </ScaleMark>
          ))}
        </TunerScale>
        <TunerNeedle
          rotation={getNeedleRotation()}
          color={Math.abs(cents) < 5 ? "green" : "red"}
        />
      </TunerDisplay>
      <div>Current pitch: {pitch ? pitch.toFixed(2) : "N/A"} Hz</div>
      <div
        style={{
          fontSize: "36px",
        }}
      >
        Closest note: {closestNote}
      </div>
      <div>Cents: {isNaN(cents) ? 0 : cents}</div>

      <ToggleButton active={isActive} onClick={toggleTuner} />
    </TunerContainer>
  );
};

export default GuitarAutotuner;
