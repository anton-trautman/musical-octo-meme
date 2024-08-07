import styled from "styled-components";

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const StyledApp = styled.div`
  background-color: ${(p) => p.theme.bgColor};
  color: ${(p) => p.theme.textColor};
  margin: 0;
  /*
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  } */
  min-height: 100vh;
  padding: 20px 20px;
`;

export const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const ComponentContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
`;
