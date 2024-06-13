import "./App.css";

import styled from "styled-components";
import { FlexBoxCol } from "./components/styled/styled";
import { Tuner } from "./feature/tuner";

import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <Tuner />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
