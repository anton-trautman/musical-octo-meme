import styled from "styled-components";

export const VisualMetronome = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const Beat = styled.div<{ active: boolean; isFirstBeat: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 15px;
  background-color: ${(props) =>
    props.active
      ? props.isFirstBeat
        ? "var(--tg-theme-button-color)"
        : "green"
      : "#ccc"};

  transform: ${(props) => (props.active ? "scale(2)" : "scale(1)")};

  transition: background-color 0.2s ease, transform 0.1s linear;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  margin-right: 10px;
`;

export const Input = styled.input`
  height: 40px;
  font-size: 24px;
  text-align: center;
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  font-size: 24px;
  text-align: center;
`;

export const Button = styled.button`
  background-color: var(--tg-theme-button-color);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;

  transition: opacity 0.1s linear, transform 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(1.1);
  }
`;

export const SmallButton = styled(Button)`
  /* padding: 20px; */
  font-size: 20px;
`;
