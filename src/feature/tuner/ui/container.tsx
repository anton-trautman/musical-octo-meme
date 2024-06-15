import { useCallback, useState } from "react";
import { ToggleButton } from "./toggle-button";
import { Detector } from "./detector";
import { Wrapper } from '../styled';

const Tuner = () => {
  const [start, setStart] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setStart((start) => !start);
  }, []);

  return (
    <Wrapper>
      <h1>Note Detection</h1>
      <Detector start={start} />

      <ToggleButton onClick={onClick} isPlay={start} />
    </Wrapper>
  );
};

export default Tuner;
