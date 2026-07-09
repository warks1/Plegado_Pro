const materials = [
  { id: 'steel', name: 'Acero carbono S235', k: 0.42, tensile: 420, price: 1.35 },
  { id: 'inox', name: 'Inoxidable 304', k: 0.38, tensile: 620, price: 3.9 },
  { id: 'alu', name: 'Aluminio 5754', k: 0.5, tensile: 220, price: 4.2 },
  { id: 'galv', name: 'Galvanizado DX51D', k: 0.44, tensile: 360, price: 1.8 }
];

const tools = [
  { name: 'Punzón 86° R1', type: 'Punzón', range: '0.8–3 mm' },
  { name: 'Punzón cuello cisne', type: 'Punzón', range: '1–4 mm' },
  { name: 'Matriz V12', type: 'Matriz', range: '1–2 mm' },
  { name: 'Matriz V16', type: 'Matriz', range: '1.5–3 mm' },
  { name: 'Matriz V24', type: 'Matriz', range: '3–5 mm' }
];

let state = {
  partName: 'Soporte plegado demo',
  material: 'steel',
  thickness: 2,
  bendLength: 420,
  insideRadius: 2,
  vOpening: 16,
  bends: [
    { angle: 90, flange: 40 },
    { angle: 90, flange: 70 },
    { angle: 45, flange: 35 },
    { angle: 90, flange: 50 }
  ],
  results: {}
};

const $ = (id) => document.getElementById(id);

function material() {
  return materials.find(m => m.id === state.material) || materials[0];
}

function round(n, d = 2) {
  return Number(n || 0).toFixed(d);
}

function calculate() {
  const mat = material();
  const t = Number(state.thickness);
  const r = Number(state.insideRadius);
  const length = Number(state.bendLength);
  const v = Number(state.vOpening);

  const bendAllowance = state.bends.reduce((sum, b) => {
    const angleRad = (Math.PI / 180) * Number(b.angle);
    return sum + angleRad * (r + mat.k * t);
  }, 0);

  const flanges = state.bends.reduce((sum, b) => sum + Number(b.flange), 0);
  const flat = flanges + bendAllowance;
  const forceTons = (1.42 * mat.tensile * length * t * t) / (1000 * Math.max(v, 1));
  const springback = Math.max(0.3, (mat.tensile / 1000) * (r / Math.max(t, .1)) * 1.2);
  const minV = t * 6;
  const riskScore = Math.min(100, Math.round(
    (v < minV ? 25 : 0) +
    (state.bends.length > 6 ? 20 : 0) +
    (forceTons > 80 ? 30 : 0) +
    (r < t ? 15 : 0) +
    (state.bends.some(b => Number(b.flange) < t * 6) ? 20 : 0)
  ));

  state.results = { bendAllowance, flat, forceTons, springback, minV, riskScore };
  return state.results;
}

function riskLabel(score) {
  if (score < 25) return 'Bajo';
  if (score < 55) return 'Medio';
  return 'Alto';
}

function renderMaterialSelect() {
  const select = $('material');
  select.innerHTML = materials.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  select.value = state.material;
}

function bindInputs() {
  ['partName', 'material', 'thickness', 'bendLength', 'insideRadius', 'vOpening'].forEach(id => {
    $(id).addEventListener('input', (e) => {
      const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
      state[id] = value;
      renderAll();
    });
  });

  $('addBendBtn').addEventListener('click', () => {
    state.bends.push({ angle: 90, flange: 40 });
    renderAll();
  });

  $('simulateBtn').addEventListener('click', () => {
    renderAll();
    toast('Simulación recalculada');
  });

  $('loadExampleBtn').addEventListener('click', () => {
    state = {
      partName: 'Caja plegada con retorno',
      material: 'inox',
      thickness: 1.5,
      bendLength: 600,
      insideRadius: 1.5,
      vOpening: 12,
      bends: [
        { angle: 90, flange: 25 },
        { angle: 90, flange: 80 },
        { angle: 90, flange: 120 },
        { angle: 135, flange: 35 },
        { angle: 90, flange: 45 }
      ],
      results: {}
    };
    syncInputs();
    renderAll();
    toast('Ejemplo cargado');
  });

  $('exportBtn').addEventListener('click', exportProject);
  $('copyCncBtn').addEventListener('click', async () => {
    await navigator.clipboard.writeText($('cncOutput').textContent);
    toast('CNC copiado');
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
  });
}

function syncInputs() {
  $('partName').value = state.partName;
  $('material').value = state.material;
  $('thickness').value = state.thickness;
  $('bendLength').value = state.bendLength;
  $('insideRadius').value = state.insideRadius;
  $('vOpening').value = state.vOpening;
}

function renderBends() {
  $('bendsList').innerHTML = state.bends.map((b, i) => `
    <div class="bend-row">
      <label>Ángulo ${i + 1}<input type="number" min="1" max="179" value="${b.angle}" data-bend="${i}" data-field="angle"></label>
      <label>Ala mm<input type="number" min="1" value="${b.flange}" data-bend="${i}" data-field="flange"></label>
      <button title="Eliminar" data-remove="${i}">×</button>
    </div>
  `).join('');

  document.querySelectorAll('[data-bend]').forEach(input => {
    input.addEventListener('input', e => {
      const i = Number(e.target.dataset.bend);
      const field = e.target.dataset.field;
      state.bends[i][field] = Number(e.target.value);
      renderAll();
    });
  });
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', e => {
      state.bends.splice(Number(e.target.dataset.remove), 1);
      renderAll();
    });
  });
}

function renderStats() {
  const r = calculate();
  $('statBends').textContent = state.bends.length;
  $('statForce').textContent = `${round(r.forceTons, 1)} t`;
  $('statFlat').textContent = `${round(r.flat, 1)} mm`;
  $('statRisk').textContent = riskLabel(r.riskScore);
}

function renderSummary() {
  const r = state.results;
  const mat = material();
  $('smartSummary').innerHTML = `
    <p><strong>${state.partName}</strong> en ${mat.name}, espesor ${state.thickness} mm.</p>
    <p>Desarrollo estimado: <strong>${round(r.flat, 1)} mm</strong>. Fuerza aproximada: <strong>${round(r.forceTons, 1)} toneladas</strong>.</p>
    <p>Recuperación elástica estimada: <strong>${round(r.springback, 2)}°</strong>. Riesgo general: <strong>${riskLabel(r.riskScore)}</strong>.</p>
    <p>Recomendación: usar matriz V próxima a <strong>${round(state.thickness * 8, 0)} mm</strong> para plegado estándar.</p>
  `;
}

function renderSequence() {
  const sequence = [...state.bends].map((b, i) => ({ ...b, original: i + 1 }))
    .sort((a, b) => b.flange - a.flange || b.angle - a.angle);
  $('sequenceList').innerHTML = sequence.map((b, i) => `
    <li><strong>Paso ${i + 1}</strong> · Pliegue ${b.original}: ${b.angle}° · Ala ${b.flange} mm · compensar +${round(state.results.springback, 2)}°</li>
  `).join('');
}

function renderValidation() {
  const r = state.results;
  const items = [
    { label: 'Abertura V mínima recomendada', value: `${round(r.minV, 1)} mm`, ok: state.vOpening >= r.minV },
    { label: 'Fuerza dentro de rango demo', value: `${round(r.forceTons, 1)} t`, ok: r.forceTons < 100 },
    { label: 'Radio interior compatible', value: `${state.insideRadius} mm`, ok: state.insideRadius >= state.thickness * 0.6 },
    { label: 'Longitud mínima de alas', value: 'Verificada', ok: !state.bends.some(b => Number(b.flange) < state.thickness * 6) }
  ];
  $('validationList').innerHTML = items.map(it => `
    <div class="validation-item"><span>${it.label}</span><strong style="color:${it.ok ? 'var(--accent)' : 'var(--danger)'}">${it.ok ? 'OK' : 'Revisar'} · ${it.value}</strong></div>
  `).join('');
}

function renderCnc() {
  const lines = [];
  lines.push('%');
  lines.push(`(PLEGAR PRO DEMO - ${state.partName})`);
  lines.push(`(MATERIAL: ${material().name})`);
  lines.push(`(ESPESOR: ${state.thickness} MM)`);
  lines.push(`(LONGITUD: ${state.bendLength} MM)`);
  lines.push(`(DESARROLLO ESTIMADO: ${round(state.results.flat, 2)} MM)`);
  lines.push('');
  state.bends.forEach((b, i) => {
    const corrected = Number(b.angle) + state.results.springback;
    lines.push(`N${String((i + 1) * 10).padStart(3, '0')} BEND_${i + 1}`);
    lines.push(`  TOOL PUNCH="P86_R1" DIE="V${state.vOpening}"`);
    lines.push(`  ANGLE=${round(corrected, 2)} TARGET=${b.angle}`);
    lines.push(`  FLANGE=${b.flange} BACKGAUGE=${round(Number(b.flange) + state.thickness * 2, 2)}`);
    lines.push(`  FORCE=${round(state.results.forceTons / Math.max(state.bends.length,1), 2)}T`);
  });
  lines.push('');
  lines.push('M30');
  lines.push('%');
  $('cncOutput').textContent = lines.join('\n');
}

function renderQualityAndCost() {
  $('qualityPlan').innerHTML = [
    ['Comprobar material', material().name],
    ['Verificar espesor', `${state.thickness} mm`],
    ['Medir primer ángulo', `±0.5°`],
    ['Control desarrollo', `${round(state.results.flat, 1)} mm`],
    ['Revisión visual', 'Sin grietas ni marcas']
  ].map(([a,b]) => `<div class="quality-item"><span>${a}</span><strong>${b}</strong></div>`).join('');

  const areaM2 = (state.results.flat / 1000) * (state.bendLength / 1000);
  const density = state.material === 'alu' ? 2.7 : 7.85;
  const kg = areaM2 * (state.thickness / 1000) * density * 1000;
  const materialCost = kg * material().price;
  const machineCost = (state.bends.length * 0.75 + 4) * 0.85;
  const total = materialCost + machineCost + 3.5;
  $('costPanel').innerHTML = [
    ['Peso estimado', `${round(kg, 2)} kg`],
    ['Material', `${round(materialCost, 2)} €`],
    ['Máquina + preparación', `${round(machineCost, 2)} €`],
    ['Control + indirectos', '3.50 €'],
    ['Total demo', `${round(total, 2)} €`]
  ].map(([a,b]) => `<div class="cost-row"><span>${a}</span><strong>${b}</strong></div>`).join('');
}

function renderLibrary() {
  $('materialsTable').innerHTML = materials.map(m => `<div class="table-row"><span>${m.name}</span><strong>K ${m.k} · ${m.tensile} MPa</strong></div>`).join('');
  $('toolsTable').innerHTML = tools.map(t => `<div class="table-row"><span>${t.name}</span><strong>${t.type} · ${t.range}</strong></div>`).join('');
}

function drawCanvas() {
  const canvas = $('partCanvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 45) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 45) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

  const startX = 120;
  const baseY = 335;
  const scale = Math.min(4, 620 / Math.max(120, state.results.flat));
  let x = startX;
  let y = baseY;
  let dir = 0;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#5bbcff';
  ctx.lineWidth = Math.max(8, Number(state.thickness) * 4);
  ctx.beginPath();
  ctx.moveTo(x, y);
  state.bends.forEach((b, i) => {
    const len = Number(b.flange) * scale;
    x += Math.cos(dir) * len;
    y -= Math.sin(dir) * len;
    ctx.lineTo(x, y);
    ctx.save();
    ctx.fillStyle = state.results.riskScore > 55 && i === state.bends.length - 1 ? '#ff5f6d' : '#ffcc66';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    dir += (Math.PI / 180) * (180 - Number(b.angle));
  });
  ctx.stroke();

  ctx.fillStyle = '#eef4ff';
  ctx.font = 'bold 22px system-ui';
  ctx.fillText(state.partName, 34, 46);
  ctx.font = '15px system-ui';
  ctx.fillStyle = '#9fb0ca';
  ctx.fillText(`${material().name} · ${state.thickness} mm · ${state.bends.length} pliegues`, 34, 74);

  ctx.fillStyle = 'rgba(57,217,138,.16)';
  ctx.fillRect(640, 52, 210, 90);
  ctx.strokeStyle = 'rgba(57,217,138,.4)';
  ctx.strokeRect(640, 52, 210, 90);
  ctx.fillStyle = '#39d98a';
  ctx.font = 'bold 16px system-ui';
  ctx.fillText('Simulación activa', 662, 84);
  ctx.fillStyle = '#eef4ff';
  ctx.fillText(`${round(state.results.forceTons, 1)} t · Riesgo ${riskLabel(state.results.riskScore)}`, 662, 112);
}

function switchPanel(panel) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active-panel'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  $(panel).classList.add('active-panel');
  document.querySelector(`[data-panel="${panel}"]`).classList.add('active');
  const titles = {
    dashboard: ['Panel general', 'Resumen técnico de la pieza y del proceso.'],
    engineering: ['Ingeniería', 'Datos editables de pieza, material y pliegues.'],
    simulation: ['Simulación', 'Secuencia recomendada y validaciones automáticas.'],
    cnc: ['CNC', 'Programa CNC demo generado desde los datos actuales.'],
    quality: ['Calidad y costes', 'Plan de control y estimación económica.'],
    library: ['Biblioteca', 'Materiales y herramientas incluidos en la demo.']
  };
  $('panelTitle').textContent = titles[panel][0];
  $('panelSubtitle').textContent = titles[panel][1];
}

function exportProject() {
  const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'plegar-pro-demo-project.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('Proyecto exportado');
}

function toast(message) {
  const t = $('toast');
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function renderAll() {
  calculate();
  renderStats();
  renderBends();
  renderSummary();
  renderSequence();
  renderValidation();
  renderCnc();
  renderQualityAndCost();
  renderLibrary();
  drawCanvas();
}

renderMaterialSelect();
syncInputs();
bindInputs();
renderAll();
