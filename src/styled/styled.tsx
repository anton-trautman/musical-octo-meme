import styled from "styled-components";

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

export const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
