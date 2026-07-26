// A guaranteed-never-empty fallback for ZAPP. If the AI can't build a kid's
// idea after all retries (flaky model / dropped network), we never send them
// away with nothing. Instead they get a calm, honest neon rainbow sketchpad
// to play with while the builder "wakes up" — and a clear way to try their
// real idea again. Safety BLOCKS never get this (a deliberate "no" stays a no).
//
// Kept tiny and dependency-free so it ALWAYS works: single file, no network,
// Web Audio for a soft tone, finger painting, clear button. COPPA-clean.

export function buildFallbackHtml(idea) {
  const esc = (s) => String(s || '').replace(/[<>&"']/g, (c) => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const safeIdea = esc(idea).slice(0, 80) || 'my idea';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>${safeIdea} · ZAPP</title>
<style>
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { margin:0; width:100vw; height:100dvh; overflow:hidden; background:#0a0a0f; color:#fff; font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif; display:flex; flex-direction:column; user-select:none; }
  #bar { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.08); }
  #bar h1 { font-size:14px; font-weight:800; margin:0; color:#c4b5fd; max-width:62vw; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  #bar button { font-size:12px; font-weight:800; padding:8px 14px; border-radius:10px; border:1px solid rgba(167,139,250,0.5); background:rgba(167,139,250,0.15); color:#c4b5fd; }
  #pad { flex:1; position:relative; touch-action:none; cursor:crosshair; }
  canvas { position:absolute; inset:0; width:100%; height:100%; display:block; }
  #hint { position:absolute; top:50%; left:0; right:0; transform:translateY(-50%); text-align:center; font-size:14px; color:rgba(255,255,255,0.3); pointer-events:none; transition:opacity .4s; font-weight:600; }
  .disclaimer { position:absolute; bottom:8px; left:0; right:0; text-align:center; font-size:10px; opacity:0.4; pointer-events:none; }
</style>
</head>
<body>
<div id="bar"><h1>${safeIdea}</h1><button onclick="clearPad()">clear</button></div>
<div id="pad">
  <canvas id="c"></canvas>
  <div id="hint">draw with your finger &#127752;</div>
  <div class="disclaimer">An AI friend helped make this &mdash; it can be wrong. Check with a grown-up if it matters.</div>
</div>
<script>
var c=document.getElementById('c'),x=c.getContext('2d'),pad=document.getElementById('pad'),hint=document.getElementById('hint');
function rs(){var d=devicePixelRatio||1;c.width=pad.clientWidth*d;c.height=pad.clientHeight*d;x.setTransform(d,0,0,d,0,0);}rs();addEventListener('resize',rs);
var hue=0,drawing=false,prev=null,actx=null;
function tone(){try{if(!actx)actx=new (window.AudioContext||window.webkitAudioContext)();var o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=260+Math.random()*420;g.gain.value=0.05;o.connect(g);g.connect(actx.destination);o.start();o.stop(actx.currentTime+0.09);}catch(e){}}
function p(e){var r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function down(e){drawing=true;hint.style.opacity=0;prev=p(e);tone();}
function mv(e){if(!drawing)return;var cur=p(e),col='hsl('+(hue%360)+',90%,65%)';x.strokeStyle=col;x.lineWidth=7;x.lineCap='round';x.shadowBlur=16;x.shadowColor=col;x.beginPath();x.moveTo(prev.x,prev.y);x.lineTo(cur.x,cur.y);x.stroke();prev=cur;hue+=5;}
function up(){drawing=false;}
pad.addEventListener('pointerdown',down);pad.addEventListener('pointermove',mv);pad.addEventListener('pointerup',up);pad.addEventListener('pointerleave',up);pad.addEventListener('pointercancel',up);
function clearPad(){x.clearRect(0,0,c.width,c.height);hint.style.opacity=1;}
</script>
</body></html>`;
}