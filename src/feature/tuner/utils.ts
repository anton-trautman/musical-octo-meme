export const autoCorrelate = (
  buf: Float32Array,
  sampleRate: number
): number => {
  const SIZE = buf.length;

  // Calculate RMS to check for sufficient signal
  const rms = calculateRMS(buf);
  if (rms < 0.01) return -1; // Not enough signal

  // Trim the buffer to remove silence at the start and end
  const trimmedBuffer = trimBuffer(buf, SIZE);
  const trimmedSize = trimmedBuffer.length;

  // Perform autocorrelation
  const correlations = calculateAutocorrelations(trimmedBuffer, trimmedSize);

  // Find the best offset using parabolic interpolation
  const bestOffset = findBestOffset(correlations, trimmedSize);

  return sampleRate / bestOffset;
};

// Calculate Root Mean Square (RMS) of the buffer
const calculateRMS = (buf: Float32Array): number => {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    rms += buf[i] * buf[i];
  }
  return Math.sqrt(rms / SIZE);
};

// Trim the buffer to remove silence at the start and end
const trimBuffer = (buf: Float32Array, SIZE: number): Float32Array => {
  const threshold = 0.2;
  let start = 0,
    end = SIZE - 1;

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < threshold) {
      start = i;
      break;
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < threshold) {
      end = SIZE - i;
      break;
    }
  }

  return buf.slice(start, end);
};

// Perform autocorrelation on the trimmed buffer
const calculateAutocorrelations = (
  buf: Float32Array,
  SIZE: number
): number[] => {
  const correlations = new Array(SIZE).fill(0);

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      correlations[i] += buf[j] * buf[j + i];
    }
  }

  return correlations;
};

// Find the best offset using parabolic interpolation
const findBestOffset = (correlations: number[], SIZE: number): number => {
  let d = 0;
  while (correlations[d] > correlations[d + 1]) d++;

  let maxVal = -1,
    maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (correlations[i] > maxVal) {
      maxVal = correlations[i];
      maxPos = i;
    }
  }

  let T0 = maxPos;

  // Parabolic interpolation for more accurate peak detection
  if (T0 > 0 && T0 < SIZE - 1) {
    const x1 = correlations[T0 - 1];
    const x2 = correlations[T0];
    const x3 = correlations[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 -= b / (2 * a);
  }

  return T0;
};

export const findClosestNote = (
  frequency: number,
  notesFrequencies: { [key: string]: number }
): { closestNote: string; closestFreq: number } => {
  let closestNote = "";
  let closestFreq = 0;
  let minDifference = Infinity;

  for (const [note, freq] of Object.entries(notesFrequencies)) {
    const difference = Math.abs(frequency - freq);
    if (difference < minDifference) {
      minDifference = difference;
      closestNote = note;
      closestFreq = freq;
    }
  }

  return { closestNote, closestFreq };
};

export const centsOffPitch = (
  frequency: number,
  closestFreq: number
): number => {
  return Math.round(1200 * Math.log2(frequency / closestFreq));
};

const A4 = 440;
const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const generateNotesFrequencies = () => {
  const frequencies: { [key: string]: number } = {};

  for (let octave = 0; octave < 9; octave++) {
    for (let i = 0; i < 12; i++) {
      const noteIndex = i - 9;
      const frequency = A4 * Math.pow(2, octave - 4 + noteIndex / 12);
      const noteName = `${noteNames[i]}${octave}`;
      frequencies[noteName] = frequency;
    }
  }

  return frequencies;
};

const colors = {
  success: "#03BF8F",
  error: "#ff244b",
};

export const getNeedleRotation = (cents: number) => {
  // Limit the rotation to -45 to 45 degrees

  if (!cents) {
    return 0;
  }

  return Math.max(-45, Math.min(45, cents));
};

export const getColor = (cents: number) =>
  !cents || Math.abs(cents) < 5 ? colors.success : colors.error;
