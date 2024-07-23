import{p as c,r as a,j as n,C as P}from"./index-CX97m7FH.js";import{T as z}from"./toggle-button-B2qhEZFq.js";const F=c.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`,N=c.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 15px;
  background-color: ${s=>s.active?s.isFirstBeat?"var(--tg-theme-button-color)":"green":"#ccc"};

  transform: ${s=>s.active?"scale(2)":"scale(1)"};

  transition: background-color 0.2s ease, transform 0.1s linear;
`,T=c.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,v=c.label`
  margin-right: 10px;
`,V=c.input`
  height: 40px;
  font-size: 24px;
  text-align: center;
`,G=c.select`
  width: 100%;
  height: 40px;
  font-size: 24px;
  text-align: center;
`,C=c.button`
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
`,j=c(C)`
  /* padding: 20px; */
  font-size: 20px;
`,_=["2/4","3/4","4/4","3/8","5/8","6/8","5/4","7/8"];function D(){const[s,m]=a.useState(120),[g,y]=a.useState("4/4"),[u,S]=a.useState(!1),[b,p]=a.useState(0),i=a.useRef(null),r=a.useRef(null),l=a.useRef([]);a.useEffect(()=>(r.current=new AudioContext,()=>{r.current&&r.current.close()}),[]),a.useEffect(()=>(u?(p(0),w()):B(),()=>{i.current&&clearInterval(i.current)}),[u,s,g]);const w=()=>{i.current&&clearInterval(i.current),p(0);const t=6e4/s;i.current=window.setInterval(()=>{p(e=>{const o=(e+1)%h();return I(o===0),o})},t)},B=()=>{i.current&&clearInterval(i.current),p(0)},I=t=>{if(r.current){const e=r.current.createOscillator();e.type="sine",e.frequency.setValueAtTime(t?440:880,r.current.currentTime);const o=r.current.createGain();o.gain.setValueAtTime(1,r.current.currentTime),o.gain.exponentialRampToValueAtTime(.001,r.current.currentTime+.05),e.connect(o),o.connect(r.current.destination),e.start(),e.stop(r.current.currentTime+.05)}},M=()=>{S(!u)},k=t=>{const e=parseInt(t.target.value,10);!isNaN(e)&&e>0&&m(e)},R=t=>{y(t.target.value)},h=()=>parseInt(g.split("/")[0],10),f=t=>{m(e=>Math.max(1,e+t))},A=()=>{const t=Date.now();if(l.current.push(t),l.current.length>4&&l.current.shift(),l.current.length>1){const e=l.current.slice(1).map((d,x)=>d-l.current[x]),o=e.reduce((d,x)=>d+x,0)/e.length,E=Math.round(6e4/o);m(E)}};return n.jsxs(P,{children:[n.jsx(C,{onClick:A,children:"Tap Tempo"}),n.jsx(F,{children:Array.from({length:h()}).map((t,e)=>n.jsx(N,{active:e===b,isFirstBeat:e===0},e))}),n.jsxs(T,{children:[n.jsx(v,{htmlFor:"tempo",children:"Tempo (BPM):"}),n.jsx(j,{onClick:()=>f(-5),children:"-5"}),n.jsx(V,{id:"tempo",type:"number",value:s,onChange:k,min:"1"}),n.jsx(j,{onClick:()=>f(5),children:"+5"})]}),n.jsxs(T,{style:{marginTop:"20px"},children:[n.jsx(v,{htmlFor:"timeSignature",children:"Time Signature:"}),n.jsx(G,{id:"timeSignature",value:g,onChange:R,children:_.map(t=>n.jsx("option",{value:t,children:t},t))})]}),n.jsx(z,{active:u,onClick:M})]})}export{D as default};
