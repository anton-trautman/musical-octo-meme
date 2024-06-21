import "./App.css";
import { AppContainer, FlexBoxCol, StyledApp } from "./styled/styled";
import { Tuner } from "./feature/tuner";

import "@twa-dev/sdk";
import StyledThemeProvider from "./provider/theme";

function App() {
  return (
    <StyledThemeProvider>
      <StyledApp>
        <AppContainer>
          <FlexBoxCol>
            <Tuner />
          </FlexBoxCol>
        </AppContainer>
      </StyledApp>
    </StyledThemeProvider>
  );
}

export default App;
