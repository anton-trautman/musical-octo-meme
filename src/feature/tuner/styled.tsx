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
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
`;
