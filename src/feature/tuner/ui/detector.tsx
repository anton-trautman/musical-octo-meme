import { useEffect, useState } from "react";
import { autoCorrelate, frequencyToNoteNumber, noteStrings } from "..";
import { NoteWrapper, Text } from "../styled";
import { noteNumberToFrequency } from "../utils";

const audioContext = new window.AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
// const buffer = new Float32Array(bufferLength);
const dataArray = new Uint8Array(bufferLength);

const trashhold = 0.2;

export function Detector({ start }: { start: boolean }) {
  const [note, setNote] = useState<{
    name: string | null;
    frequency: number | null;
  }>({
    name: null,
    frequency: 0,
  });

  const [difference, setDifference] = useState<number | null>(null);

  const [siblingNotes, setSiblings] = useState<{
    prev: number | null;
    target: number | null;
    next: number | null;
  }>({
    prev: null,
    target: null,
    next: null,
  });
  //
  //   const getMic = useCallback(async () => {
  //     return await navigator.mediaDevices.getUserMedia({ audio: true });
  //   }, []);
  //
  //   const updateData = useCallback(async () => {
  //     if (audioContext.state === "suspended") {
  //       audioContext.resume();
  //     }
  //     // } else {
  //     //   audioContext.suspend();
  //     //   return;
  //     // }
  //
  //     try {
  //       const stream = await getMic();
  //       const source = audioContext.createMediaStreamSource(stream);
  //       source.connect(analyser);
  //
  //       const detectPitch = () => {
  //         analyser.getByteTimeDomainData(dataArray);
  //         const buffer = new Float32Array(bufferLength);
  //         for (let i = 0; i < bufferLength; i++) {
  //           buffer[i] = (dataArray[i] - 128) / 128.0;
  //         }
  //         const autocorrelation = autoCorrelate(buffer, audioContext.sampleRate);
  //
  //         if (autocorrelation !== -1) {
  //           const detectedPitch = Math.round(autocorrelation);
  //           // setPitch(detectedPitch);
  //           const detectedNote = frequencyToNoteNumber(detectedPitch);
  //           const noteName = noteStrings[detectedNote % 12];
  //           setNote({ name: noteName, frequency: detectedPitch });
  //           const targetFrequency = noteNumberToFrequency(detectedNote);
  //           const diff = detectedPitch - targetFrequency;
  //           setDifference(diff);
  //         }
  //
  //         requestAnimationFrame(detectPitch);
  //       };
  //       //       analyser.getByteTimeDomainData(dataArray);
  //       //
  //       //       for (let i = 0; i < bufferLength; i++) {
  //       //         buffer[i] = (dataArray[i] - 128) / 128;
  //       //       }
  //       //       const autocorrelation = autoCorrelate(buffer, audioContext.sampleRate);
  //       //
  //       //       if (autocorrelation !== -1) {
  //       //         const detectedPitch = parseFloat(autocorrelation.toFixed(2));
  //       //         const detectedNote = frequencyToNoteNumber(detectedPitch);
  //       //
  //       //         const targetFrequency = noteNumberToFrequency(detectedNote);
  //       //         const diff = detectedPitch - targetFrequency;
  //       //         setDifference(diff);
  //       //         console.log({ detectedNote });
  //       //
  //       //         const noteName = noteStrings[detectedNote % 12];
  //       //         setNote(() => ({
  //       //           name: noteName,
  //       //           frequency: detectedPitch,
  //       //         }));
  //       //       }
  //       // return;
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }, [start]);

  useEffect(() => {
    if (start && audioContext.state !== "running") {
      audioContext.resume();
    } else {
      audioContext.suspend();
      return;
    }

    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          detectPitch();
        })
        .catch((err) => {
          console.log("The following error occurred: " + err);
        });

      // const source = audioContext.createMediaStreamSource(stream);
      // source.connect(analyser);

      const detectPitch = () => {
        analyser.getByteTimeDomainData(dataArray);
        const buffer = new Float32Array(bufferLength);
        for (let i = 0; i < bufferLength; i++) {
          buffer[i] = (dataArray[i] - 128) / 128.0;
        }
        const autocorrelation = autoCorrelate(buffer, audioContext.sampleRate);

        if (autocorrelation !== -1) {
          const detectedPitch = Math.round(autocorrelation);
          // setPitch(detectedPitch);
          const detectedNote = frequencyToNoteNumber(detectedPitch);
          const noteName = noteStrings[detectedNote % 12];

          setNote({ name: noteName, frequency: detectedPitch });
          const targetFrequency = noteNumberToFrequency(detectedNote);

          const prev = noteNumberToFrequency(detectedNote - 1);
          const next = noteNumberToFrequency(detectedNote + 1);

          setSiblings(() => ({
            prev,
            target: targetFrequency,
            next,
          }));

          const diff = detectedPitch - targetFrequency;
          setDifference(diff);
        }

        if (start) {
          requestAnimationFrame(detectPitch);
        }
      };
    } catch (e) {
      console.log("The following error occurred: " + e);
    }
  }, [start]);

  return (
    <NoteWrapper>
      <Text
        style={{
          color:
            difference && Math.abs(difference) > trashhold ? "red" : "green",
        }}
      >
        {note.name || "Start"}
      </Text>
      <Text>{note.frequency || "0"}Hz</Text>

      {difference && <Text>{difference.toFixed(4)} Hz</Text>}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{siblingNotes.prev?.toFixed(2)}</div>
        <div>{siblingNotes.target?.toFixed(2)}</div>
        <div>{siblingNotes.next?.toFixed(2)}</div>
      </div>
    </NoteWrapper>
  );
}
