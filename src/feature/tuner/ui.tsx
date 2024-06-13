import { useCallback, useEffect, useState } from "react";
import { autoCorrelate, frequencyToNoteNumber, noteStrings } from ".";
import { Button } from "../../components/styled/styled";

const audioContext = new window.AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const buffer = new Float32Array(bufferLength);

const Tuner = () => {
  const [start, setStart] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>(null);

  const updateData = useCallback(async () => {
    if (start) {
      audioContext.resume();
    } else {
      audioContext.suspend();
      return;
    }

    try {
      const dataArray = new Uint8Array(bufferLength);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.getByteTimeDomainData(dataArray);
      for (let i = 0; i < bufferLength; i++) {
        buffer[i] = (dataArray[i] - 128) / 128.0;
      }
      const autocorrelation = autoCorrelate(buffer, audioContext.sampleRate);

      if (autocorrelation !== -1) {
        const detectedPitch = Math.round(autocorrelation);
        const detectedNote = frequencyToNoteNumber(detectedPitch);

        const noteName = noteStrings[detectedNote % 12];
        setNote(() => `${noteName} (${detectedPitch} Hz)`);
      }
    } catch (e) {
      console.error(e);
    }
  }, [start]);

  useEffect(() => {
    const intervalId = setInterval(updateData, 100);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [updateData]);

  const onClick = () => {
    setStart((start) => !start);
  };

  return (
    <div>
      <h1>Note Detection</h1>
      <div>
        <p>Detected note: {note}</p>
      </div>

      <Button onClick={onClick}>{start ? "Stop" : "Start"}</Button>
    </div>
  );
};

export default Tuner;
