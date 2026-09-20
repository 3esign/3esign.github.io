'use strict';

const canvas = document.getElementById('chain-map');
const ctx = canvas.getContext('2d');

const nodes = [
  { label: 'Docs', x: .10, y: .32, color: '#b9ffe3' },
  { label: 'IDL Hashes', x: .28, y: .55, color: '#9ad6ff' },
  { label: 'Pump Create', x: .47, y: .31, color: '#f5c16c' },
  { label: 'HOLLOW Creator', x: .66, y: .55, color: '#d9b7ff' },
  { label: 'CA Backfill', x: .86, y: .32, color: '#ff8f9b' },
];

const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];

function resize() {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function draw(t) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#090d0e';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(185,255,227,.10)';
  ctx.lineWidth = 1;
  for (let x = 32; x < w; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 24; y < h; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const points = nodes.map(n => ({ ...n, px: n.x * w, py: n.y * h + Math.sin(t / 800 + n.x * 8) * 5 }));
  for (const [a, b] of edges) {
    const p = points[a];
    const q = points[b];
    ctx.strokeStyle = 'rgba(238,246,242,.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p.px, p.py);
    ctx.lineTo(q.px, q.py);
    ctx.stroke();
    const phase = (Math.sin(t / 520 + a) + 1) / 2;
    ctx.fillStyle = nodes[b].color;
    ctx.beginPath();
    ctx.arc(p.px + (q.px - p.px) * phase, p.py + (q.py - p.py) * phase, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of points) {
    ctx.fillStyle = 'rgba(7,9,10,.82)';
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(p.px - 64, p.py - 24, 128, 48, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#eef6f2';
    ctx.font = '600 14px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.label, p.px, p.py);
  }

  requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(draw);

