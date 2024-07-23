import "@twa-dev/sdk";
import "./App.css";
import {
  AppContainer,
  FlexBoxCol,
  FlexBoxRow,
  StyledApp,
} from "./shared/styled";
import { lazy, Suspense, useState } from "react";
// import { Tuner } from "./feature/tuner";
const Tuner = lazy(() => import("./feature/tuner"));
const Metronome = lazy(() => import("./feature/metronome"));

import StyledThemeProvider from "./provider/theme";

enum AllowedComponents {
  Tuner = "Tuner",
  Metronome = "Metronome",
}

const ComponentsMap = {
  [AllowedComponents.Tuner]: Tuner,
  [AllowedComponents.Metronome]: Metronome,
};

function App() {
  const [activeComponent, setComponent] = useState(AllowedComponents.Tuner);
  const CurrentComponent = ComponentsMap[activeComponent];
  return (
    <StyledThemeProvider>
      <StyledApp>
        <AppContainer>
          <FlexBoxRow>
            {Object.entries(AllowedComponents).map(([key, value]) => (
              <button key={key} onClick={() => setComponent(value)}>
                {value}
              </button>
            ))}
          </FlexBoxRow>

          <FlexBoxCol>
            <h1>{activeComponent}</h1>

            <Suspense fallback={<div>Loading...</div>}>
              <CurrentComponent />
            </Suspense>
          </FlexBoxCol>
        </AppContainer>
      </StyledApp>
    </StyledThemeProvider>
  );
}

export default App;
