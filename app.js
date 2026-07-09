const materials = {
  steel: { name: 'Acero S275', uts: 410, k: 0.42, spring: 1.5, color: '#45d6ff' },
  stainless: { name: 'Inox 304', uts: 620, k: 0.38, spring: 2.4, color: '#d7e5f8' },
  aluminum: { name: 'Aluminio 5754', uts: 230, k: 0.47, spring: 1.1, color: '#ffd166' },
  galv: { name: 'Galvanizado DX51', uts: 330, k: 0.44, spring: 1.3, color: '#43e695' }
};
const tools = [
  { name:'Punzón estándar 88°', type:'Punzón', radius:'0.8-3 mm', use:'Plegado general' },
  { name:'Punzón cuello cisne', type:'Punzón', radius:'1-4 mm', use:'Cajas y retornos' },
  { name:'Matriz V12', type:'Matriz', radius:'1-2 mm', use:'Chapa fina' },
  { name:'Matriz V20', type:'Matriz', radius:'2-4 mm', use:'Chapa media' },
  { name:'Matriz V32', type:'Matriz', radius:'4-6 mm', use:'Chapa gruesa' }
];
const state = { material:'steel', thickness:2, bendLength:500, angle:90, radius:2, dieV:16, legA:80, legB:60, optimized:false };
const $ = id => document.getElementById(id);
function init(){
  const mat = $('material');
  Object.entries(materials).forEach(([key,m])=>{ const o=document.createElement('option'); o.value=key; o.textContent=m.name; mat.appendChild(o); });
  ['material','thickness','bendLength','angle','radius','dieV','legA','legB'].forEach(id=>{ $(id).value=state[id]; $(id).addEventListener('input', readAndRender); });
  document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>switchView(btn.dataset.view)));
  $('calculate').addEventListener('click', readAndRender);
  $('loadExample').addEventListener('click', loadExample);
  $('shuffleSequence').addEventListener('click', ()=>{ state.optimized=!state.optimized; renderSequence(); toast('Secuencia optimizada'); });
  $('exportJson').addEventListener('click', exportJson);
  $('printReport').addEventListener('click', ()=>window.print());
  renderLibraries(); readAndRender();
}
function switchView(id){ document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===id)); document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id)); setTimeout(drawCanvas,40); }
function readAndRender(){ ['thickness','bendLength','angle','radius','dieV','legA','legB'].forEach(id=>state[id]=Number($(id).value)); state.material=$('material').value; renderAll(); }
function calc(){
  const m=materials[state.material], t=state.thickness, L=state.bendLength, A=state.angle, R=state.radius, V=state.dieV;
  const force = (1.42 * m.uts * t*t * L / Math.max(V,1)) / 10000;
  const bendRad = (Math.PI/180) * A;
  const ba = bendRad * (R + m.k * t);
  const bd = 2 * (R+t) * Math.tan(bendRad/2) - ba;
  const flat = state.legA + state.legB + ba;
  const spring = (m.spring * (A/90) * (t/(R+t))).toFixed(2);
  const minV = t*6, maxV=t*12;
  let risk=18;
  if(V<minV) risk+=35; if(V>maxV) risk+=12; if(R<t*.6) risk+=18; if(force>80) risk+=20; if(A<35||A>145) risk+=15;
  risk=Math.min(100,Math.max(5,risk));
  const cycle = 8 + L/180 + (risk/18) + (state.optimized?-3:0);
  return { force, ba, bd, flat, spring, risk, cycle, minV, maxV, material:m };
}
function renderAll(){ renderMetrics(); renderResults(); renderAlerts(); renderSequence(); renderReport(); drawCanvas(); }
function renderMetrics(){ const c=calc(); $('forceMetric').textContent=c.force.toFixed(1)+' t'; $('flatMetric').textContent=c.flat.toFixed(1); $('riskMetric').textContent=c.risk<35?'Bajo':c.risk<65?'Medio':'Alto'; $('riskMetric').style.color=c.risk<35?'var(--good)':c.risk<65?'var(--warn)':'var(--bad)'; $('timeMetric').textContent=c.cycle.toFixed(1)+' s'; $('healthBar').style.width=(100-c.risk)+'%'; $('projectStatus').textContent=c.risk<65?'Proceso viable':'Revisión necesaria'; $('simulationBadge').textContent=c.risk<65?'Viable':'Atención'; $('simulationBadge').style.background=c.risk<65?'var(--good)':'var(--warn)'; }
function renderResults(){ const c=calc(); const rows=[['Material',c.material.name],['K-Factor usado',c.material.k.toFixed(2)],['Bend allowance',c.ba.toFixed(2)+' mm'],['Bend deduction',c.bd.toFixed(2)+' mm'],['Desarrollo estimado',c.flat.toFixed(2)+' mm'],['Springback estimado',c.spring+'°'],['Apertura V recomendada',c.minV.toFixed(0)+' - '+c.maxV.toFixed(0)+' mm'],['Fuerza estimada',c.force.toFixed(2)+' toneladas']]; $('results').innerHTML=rows.map(([a,b])=>`<div class="result-item"><span>${a}</span><strong>${b}</strong></div>`).join(''); }
function renderAlerts(){ const c=calc(); const list=[]; if(state.dieV<c.minV) list.push(['bad','La apertura V parece pequeña para el espesor. Puede marcar la pieza o exigir demasiada fuerza.']); if(state.dieV>c.maxV) list.push(['warn','La apertura V es grande. Puede aumentar el radio real y reducir precisión.']); if(state.radius<state.thickness*.6) list.push(['warn','Radio interior bajo respecto al espesor. Revisar riesgo de grieta.']); if(c.force>80) list.push(['bad','Fuerza elevada. Revisar capacidad de máquina y longitud de útil.']); if(!list.length) list.push(['good','La combinación material, radio, V y fuerza parece coherente para una demo.']); list.push(['','Consejo: valida siempre con tablas reales de máquina, material y herramienta antes de fabricar.']); $('alerts').innerHTML=list.map(([cls,t])=>`<div class="alert ${cls}">${t}</div>`).join(''); }
function renderSequence(){ const base=[['Importar CAD','Reconocer espesor, material y pliegues'],['Seleccionar utillaje','Punzón 88° + matriz compatible'],['Preparar topes','Ajustar referencia y longitud de apoyo'],['Plegado principal','Ejecutar ángulo objetivo con compensación'],['Control calidad','Medir ángulo y registrar evidencia']]; const opt=[base[0],base[1],base[2],base[3],base[4]]; const arr=state.optimized?opt:base; $('sequenceList').innerHTML=arr.map((s,i)=>`<div class="step-card"><div class="step-index">${i+1}</div><div><b>${s[0]}</b><small>${s[1]}</small></div><span class="pill">${i===3?calc().cycle.toFixed(1)+' s':'OK'}</span></div>`).join(''); }
function renderLibraries(){ $('materialLibrary').innerHTML=Object.values(materials).map(m=>`<div class="tool-card"><div><b>${m.name}</b><small>UTS ${m.uts} MPa · K ${m.k}</small></div><span class="pill">Activo</span></div>`).join(''); $('toolLibrary').innerHTML=tools.map(t=>`<div class="tool-card"><div><b>${t.name}</b><small>${t.type} · ${t.radius} · ${t.use}</small></div><span class="pill">Biblioteca</span></div>`).join(''); }
function renderReport(){ const c=calc(); $('reportContent').innerHTML=`<h3>Informe técnico automático</h3><p><b>Pieza demo:</b> chapa ${c.material.name} de ${state.thickness} mm, plegado de ${state.bendLength} mm a ${state.angle}°.</p><p><b>Resultado:</b> desarrollo plano estimado de ${c.flat.toFixed(2)} mm, fuerza aproximada de ${c.force.toFixed(2)} toneladas y recuperación elástica estimada de ${c.spring}°.</p><p><b>Validación:</b> riesgo ${c.risk<35?'bajo':c.risk<65?'medio':'alto'}. ${c.risk<65?'La configuración es razonable para una demo funcional.':'Se recomienda revisar herramienta, radio o apertura V.'}</p><p><b>Nota:</b> demo orientativa para GitHub Pages. Los cálculos reales deben calibrarse con tablas del fabricante, ensayos y datos de producción.</p>`; }
function drawCanvas(){ const canvas=$('bendCanvas'); if(!canvas) return; const ctx=canvas.getContext('2d'); const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h); const c=calc(); const bg=ctx.createLinearGradient(0,0,w,h); bg.addColorStop(0,'#0c1b31'); bg.addColorStop(1,'#070b14'); ctx.fillStyle=bg; ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(255,255,255,.07)'; for(let x=0;x<w;x+=45){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()} for(let y=0;y<h;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
  const cx=w/2, cy=h*0.58, angle=(180-state.angle)*Math.PI/180, lenA=260, lenB=220; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.lineWidth=28; ctx.strokeStyle=c.material.color; ctx.shadowColor=c.material.color; ctx.shadowBlur=18; ctx.beginPath(); ctx.moveTo(cx-lenA,cy); ctx.lineTo(cx,cy); ctx.lineTo(cx+Math.cos(-angle)*lenB,cy+Math.sin(-angle)*lenB); ctx.stroke(); ctx.shadowBlur=0; ctx.lineWidth=2; ctx.strokeStyle='rgba(255,255,255,.75)'; ctx.beginPath(); ctx.arc(cx,cy,70,-angle,0); ctx.stroke(); ctx.fillStyle='rgba(255,255,255,.85)'; ctx.font='bold 24px Inter,Arial'; ctx.fillText(state.angle+'°',cx+45,cy-28);
  ctx.fillStyle='rgba(124,92,255,.7)'; ctx.beginPath(); ctx.moveTo(cx-80,cy+115); ctx.lineTo(cx,cy+35); ctx.lineTo(cx+80,cy+115); ctx.closePath(); ctx.fill(); ctx.fillStyle='rgba(69,214,255,.78)'; ctx.beginPath(); ctx.moveTo(cx-52,cy-170); ctx.lineTo(cx+52,cy-170); ctx.lineTo(cx,cy-70); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(234,242,255,.95)'; ctx.font='bold 22px Inter,Arial'; ctx.fillText('Simulación de plegado · '+c.material.name,40,50); ctx.font='16px Inter,Arial'; ctx.fillStyle='rgba(142,162,189,.95)'; ctx.fillText(`Espesor ${state.thickness} mm · V${state.dieV} · Radio ${state.radius} mm · Fuerza ${c.force.toFixed(1)} t`,40,80);
}
function loadExample(){ Object.assign(state,{material:'stainless',thickness:1.5,bendLength:720,angle:90,radius:1.5,dieV:12,legA:95,legB:70,optimized:false}); Object.keys(state).forEach(k=>$(k)&&($(k).value=state[k])); renderAll(); toast('Ejemplo cargado'); }
function exportJson(){ const payload={ project:'Plegar Pro Demo', date:new Date().toISOString(), input:state, calculations:calc() }; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='plegar-pro-demo-calculo.json'; a.click(); URL.revokeObjectURL(a.href); toast('JSON exportado'); }
function toast(text){ const t=$('toast'); t.textContent=text; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
init();
