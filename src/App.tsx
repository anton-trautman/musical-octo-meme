import "./App.css";
import { AppContainer, FlexBoxCol, StyledApp } from "./styled/styled";
import { Tuner } from "./feature/tuner";

import "@twa-dev/sdk";

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
