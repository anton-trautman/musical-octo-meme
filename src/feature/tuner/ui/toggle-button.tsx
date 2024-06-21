// import styled from "styled-components";
// import { useSpring, animated } from "@react-spring/web";
// import { interpolate } from "flubber";

import { ButtonTuner } from "../styled";

const stopPath =
  "M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z";
const playPath =
  "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z";

export function ToggleButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: VoidFunction;
}) {
  //   const animationProps = useSpring({
  //     from: { x: 0 },
  //     to: {
  //       x: 1,
  //     },
  //     config: {
  //       clamp: true, // interpolation function can't go above 1
  //     },
  //   });
  //
  //   const interpolation = active ? forward : reverse;

  return (
    <ButtonTuner onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        height={"100"}
        width={"100"}
      >
        <path d={active ? stopPath : playPath} />
      </svg>
    </ButtonTuner>
  );
}
