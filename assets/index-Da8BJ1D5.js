import{p as f,r as a,j as u,C as N}from"./index-CX97m7FH.js";import{T}from"./toggle-button-B2qhEZFq.js";const k=(t,e)=>{const r=t.length;if(q(t)<.01)return-1;const s=z(t,r),n=s.length,c=S(s,n),l=D(c,n);return e/l},q=t=>{const e=t.length;let r=0;for(let o=0;o<e;o++)r+=t[o]*t[o];return Math.sqrt(r/e)},z=(t,e)=>{let o=0,s=e-1;for(let n=0;n<e/2;n++)if(Math.abs(t[n])<.2){o=n;break}for(let n=1;n<e/2;n++)if(Math.abs(t[e-n])<.2){s=e-n;break}return t.slice(o,s)},S=(t,e)=>{const r=new Array(e).fill(0);for(let o=0;o<e;o++)for(let s=0;s<e-o;s++)r[o]+=t[s]*t[s+o];return r},D=(t,e)=>{let r=0;for(;t[r]>t[r+1];)r++;let o=-1,s=-1;for(let c=r;c<e;c++)t[c]>o&&(o=t[c],s=c);let n=s;if(n>0&&n<e-1){const c=t[n-1],l=t[n],p=t[n+1],d=(c+p-2*l)/2,h=(p-c)/2;d&&(n-=h/(2*d))}return n},$=(t,e)=>{let r="",o=0,s=1/0;for(const[n,c]of Object.entries(e)){const l=Math.abs(t-c);l<s&&(s=l,r=n,o=c)}return{closestNote:r,closestFreq:o}},B=(t,e)=>Math.round(1200*Math.log2(t/e)),G=440,O=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],P=()=>{const t={};for(let e=0;e<9;e++)for(let r=0;r<12;r++){const o=r-9,s=G*Math.pow(2,e-4+o/12),n=`${O[r]}${e}`;t[n]=s}return t},w={success:"#03BF8F",error:"#ff244b"},X=t=>t?Math.max(-45,Math.min(45,t)):0,j=t=>!t||Math.abs(t)<5?w.success:w.error;f.div`
  width: 100%;
  max-width: 352px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
`;f.div`
  min-height: 108px;
  background: transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;f.p`
  font-size: 24px;
  font-weight: 800;
  color: white;
`;f.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;const E=f.div`
  width: 300px;
  height: 150px;
  margin: 20px auto;
  border-radius: 150px 150px 0 0;
  position: relative;
  overflow: hidden;

  background: linear-gradient(90deg, #e1dada, #bdcad9) !important;
`,H=f.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`,U=f.div`
  width: 1px;
  height: 10px;
  background-color: #333;
  position: relative;
`,V=f.span`
  position: absolute;
  color: black;
  font-size: 10px;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
`,_=f.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 2px;
  height: 130px;
  background-color: ${t=>t.color};
  transform-origin: bottom center;
  transform: translateX(-50%);
  rotate: ${t=>`${t.rotation}deg`};
  transition: transform 0.3s ease-out, color 0.1s linear;
  will-change: transform;
`,J=f.div`
  position: absolute;
  left: 50%;
  bottom: -10;
  z-index: 10;
  font-size: 42px;
  transform: translateX(-50%);
  color: ${t=>t.color};
`,K=()=>{const[t,e]=a.useState(!1),r=a.useRef(null),[o,s]=a.useState(null),[n,c]=a.useState(""),[l,p]=a.useState(0),d=a.useRef(null),h=a.useRef(null),m=a.useRef(null),x=a.useRef(null),C=a.useRef(P()),g=a.useRef(null),b=a.useCallback(()=>{if(h.current&&m.current){h.current.getFloatTimeDomainData(m.current);const i=k(m.current,d.current.sampleRate);if(i==null)return;const{closestNote:y,closestFreq:A}=$(i,C.current),F=B(i,A);s(i),c(y),p(F)}g.current=requestAnimationFrame(b)},[m==null?void 0:m.current]),R=()=>{t?v():M()};a.useEffect(()=>()=>{v()},[]);const M=async()=>{try{const i=await navigator.mediaDevices.getUserMedia({audio:!0});r.current=i,d.current=new AudioContext,h.current=d.current.createAnalyser(),h.current.fftSize=2048,m.current=new Float32Array(h.current.fftSize),x.current=d.current.createMediaStreamSource(i),x.current.connect(h.current),e(!0),b()}catch(i){console.error("Error accessing microphone:",i)}},v=()=>{g.current&&cancelAnimationFrame(g.current),x.current&&x.current.disconnect(),d.current&&d.current.close(),r.current&&r.current.getTracks().forEach(i=>i.stop()),e(!1),s(null),c(""),p(0)};return u.jsxs(N,{children:[u.jsxs(E,{children:[u.jsx(H,{children:[-50,-40,-30,-20,-10,0,10,20,30,40,50].map(i=>u.jsx(U,{children:u.jsx(V,{children:i})},i))}),u.jsx(_,{rotation:X(l),color:j(l)}),u.jsx(J,{color:j(l),children:n})]}),u.jsxs("div",{children:["Current pitch: ",o?o.toFixed(2):"N/A"," Hz"]}),u.jsxs("div",{children:["Cents: ",isNaN(l)?0:l]}),u.jsx(T,{active:t,onClick:R})]})},W=K;export{W as default};
