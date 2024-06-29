import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 352px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
`;

export const NoteWrapper = styled.div`
  min-height: 108px;
  background: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 24px;
  font-weight: 800;
  color: white;
`;

export const ButtonTuner = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 50%;
  padding: 40px;
  margin-top: 40px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.1s linear;
  &:hover {
    opacity: 0.8;
  }
`;

export const TunerContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

export const TunerDisplay = styled.div`
  width: 300px;
  height: 150px;
  margin: 20px auto;
  border-radius: 150px 150px 0 0;
  position: relative;
  overflow: hidden;

  background: linear-gradient(90deg, #e1dada, #bdcad9) !important;
`;

export const TunerScale = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

export const ScaleMark = styled.div`
  width: 1px;
  height: 10px;
  background-color: #333;
  position: relative;
`;

export const ScaleMarkTitle = styled.span`
  position: absolute;
  color: black;
  font-size: 10px;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
`;

export const TunerNeedle = styled.div<{ rotation: number; color: string }>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 2px;
  height: 130px;
  background-color: ${(p) => p.color};
  transform-origin: bottom center;
  transform: translateX(-50%);
  rotate: ${(p) => `${p.rotation}deg`};
  transition: transform 0.3s ease-out, color 0.1s linear;
  will-change: transform;
`;

export const NoteTitle = styled.div<{ color: string }>`
  position: absolute;
  left: 50%;
  bottom: -10;
  z-index: 10;
  font-size: 42px;
  transform: translateX(-50%);
  color: ${(p) => p.color};
`;
