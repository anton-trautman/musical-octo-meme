import { useState, useEffect, useRef, useCallback } from "react";
import {
  autoCorrelate,
  centsOffPitch,
  findClosestNote,
  generateNotesFrequencies,
  getColor,
  getNeedleRotation,
} from "../utils";
import {
  NoteTitle,
  ScaleMark,
  ScaleMarkTitle,
  TunerDisplay,
  TunerNeedle,
  TunerScale,
} from "../styled";

import { ToggleButton } from "@/shared/ui/toggle-button";
import { ComponentContainer } from "@/shared/styled";

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

  // const bufferArrayRef = useRef();

  const update = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
      const detectedPitch = autoCorrelate(
        dataArrayRef.current,
        audioContextRef.current!.sampleRate
      );

      if (detectedPitch == null) {
        return;
      }

      const { closestNote: note, closestFreq: freq } = findClosestNote(
        detectedPitch,
        notesFrequenciesRef.current
      );
      const _cents = centsOffPitch(detectedPitch, freq);

      setPitch(detectedPitch);
      setClosestNote(note);
      setCents(_cents);
    }
    animationFrameRef.current = requestAnimationFrame(update);
  }, [dataArrayRef?.current]);

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
    setCents(0);
  };

  return (
    <ComponentContainer>
      <TunerDisplay>
        <TunerScale>
          {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((mark) => (
            <ScaleMark key={mark}>
              <ScaleMarkTitle>{mark}</ScaleMarkTitle>
            </ScaleMark>
          ))}
        </TunerScale>

        <TunerNeedle
          rotation={getNeedleRotation(cents)}
          color={getColor(cents)}
        />

        <NoteTitle color={getColor(cents)}>{closestNote}</NoteTitle>
      </TunerDisplay>
      <div>Current pitch: {pitch ? pitch.toFixed(2) : "N/A"} Hz</div>
      <div>Cents: {isNaN(cents) ? 0 : cents}</div>
      <ToggleButton active={isActive} onClick={toggleTuner} />
    </ComponentContainer>
  );
};

export default GuitarAutotuner;
//
// const LOCAL_BUFFER_MAX_LENGHT = 10;
//
// const normalizePitch = () => {
//   let localBuffer: number[] = [];
//   let result = 0;
//
//   const update = (pitch: number) => {
//     const minPitch = 1;
//
//     if (!localBuffer.length && pitch < minPitch) {
//       return 0;
//     }
//
//     localBuffer.push(pitch);
//
//     if (localBuffer.length >= LOCAL_BUFFER_MAX_LENGHT) {
//       localBuffer.shift();
//     }
//
//     const sum = localBuffer.reduce((acc, item) => item + acc, 0);
//
//     console.log({ sum });
//     console.log({ localBuffer });
//
//     result = Math.max(sum, 1) / (localBuffer.length || 1);
//     return;
//   };
//
//   return {
//     update,
//     value: result,
//   };
// };
