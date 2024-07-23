import{p as e,j as o}from"./index-CX97m7FH.js";const s=e.button`
  background-color: ${t=>t.disabled?"#6e6e6e":"var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 50%;
  padding: 40px;
  margin-top: 40px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.1s linear, transform 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(1.1);
  }
`,n="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z",a="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z";function i({active:t,onClick:r}){return o.jsx(s,{onClick:r,children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",height:"100",width:"100",children:o.jsx("path",{d:t?n:a})})})}export{i as T};
