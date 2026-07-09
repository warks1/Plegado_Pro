const DEFAULT_DB = {
  materials: [
    {id:'S235', name:'Acero S235', density:7.85, tensile:360, yield:235, k:0.42, price:1.35, minRadiusFactor:1.0},
    {id:'S355', name:'Acero S355', density:7.85, tensile:510, yield:355, k:0.40, price:1.55, minRadiusFactor:1.2},
    {id:'INOX304', name:'Inox AISI 304', density:7.90, tensile:620, yield:215, k:0.38, price:3.90, minRadiusFactor:1.5},
    {id:'AL5754', name:'Aluminio 5754', density:2.66, tensile:220, yield:100, k:0.44, price:4.20, minRadiusFactor:1.0},
    {id:'GALV', name:'Galvanizado DX51D', density:7.85, tensile:330, yield:140, k:0.43, price:1.70, minRadiusFactor:1.0}
  ],
  punches: [
    {id:'P-86-R08', name:'Punzón 86° R0.8', angle:86, radius:0.8, height:120, maxTonsM:80},
    {id:'P-88-R10', name:'Punzón 88° R1.0', angle:88, radius:1.0, height:150, maxTonsM:100},
    {id:'P-90-R15', name:'Punzón 90° R1.5', angle:90, radius:1.5, height:130, maxTonsM:120},
    {id:'P-CU-R05', name:'Punzón cuello cisne R0.5', angle:86, radius:0.5, height:180, maxTonsM:65}
  ],
  dies: [
    {id:'M-V06-86', name:'Matriz V6 86°', v:6, angle:86, minT:0.6, maxT:1.2, maxTonsM:65},
    {id:'M-V08-86', name:'Matriz V8 86°', v:8, angle:86, minT:0.8, maxT:1.5, maxTonsM:80},
    {id:'M-V12-86', name:'Matriz V12 86°', v:12, angle:86, minT:1.2, maxT:2.5, maxTonsM:120},
    {id:'M-V16-86', name:'Matriz V16 86°', v:16, angle:86, minT:2.0, maxT:4.0, maxTonsM:160},
    {id:'M-V24-86', name:'Matriz V24 86°', v:24, angle:86, minT:3.0, maxT:6.0, maxTonsM:220}
  ]
};
const $ = id => document.getElementById(id);
let db = JSON.parse(localStorage.getItem('plegarProDb') || 'null') || structuredClone(DEFAULT_DB);
let project = JSON.parse(localStorage.getItem('plegarProProject') || 'null') || {
  projectName:'Soporte plegado demo', clientName:'Cliente Demo', legA:80, legB:55, bendLength:500, thickness:1.5, angle:90, insideRadius:1.2, materialId:'S235', punchId:'P-88-R10', dieId:'M-V12-86', kFactor:0.42, quantity:25, machineRate:55
};
let result = {};
const pageTitles = {dashboard:['Panel general','Resumen vivo del proyecto y simulación.'],project:['Proyecto','Datos de pieza, material y selección técnica.'],tools:['Herramientas','Compatibilidad de punzón, matriz y material.'],development:['Desarrollo','Cálculo de desarrollo, fuerza y coste.'],sequence:['Secuencia','Proceso propuesto para fabricar la pieza.'],database:['Base de datos','Materiales, punzones y matrices editables.'],reports:['Informes','Exportación, importación e informe técnico.']};
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function saveDb(){ localStorage.setItem('plegarProDb', JSON.stringify(db)); }
function saveProject(){ readForm(); localStorage.setItem('plegarProProject', JSON.stringify(project)); $('lastSaved').textContent = 'Guardado: ' + new Date().toLocaleTimeString(); toast('Proyecto guardado en el navegador'); }
function getMaterial(){ return db.materials.find(x=>x.id===project.materialId) || db.materials[0]; }
function getPunch(){ return db.punches.find(x=>x.id===project.punchId) || db.punches[0]; }
function getDie(){ return db.dies.find(x=>x.id===project.dieId) || db.dies[0]; }
function fillSelects(){
  $('materialSelect').innerHTML = db.materials.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
  $('punchSelect').innerHTML = db.punches.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
  $('dieSelect').innerHTML = db.dies.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
}
function writeForm(){
  for (const k of ['projectName','clientName','legA','legB','bendLength','thickness','angle','insideRadius','kFactor','quantity','machineRate']) $(k).value = project[k];
  $('materialSelect').value=project.materialId; $('punchSelect').value=project.punchId; $('dieSelect').value=project.dieId;
}
function readForm(){
  for (const k of ['projectName','clientName']) project[k]=$(k).value;
  for (const k of ['legA','legB','bendLength','thickness','angle','insideRadius','kFactor','quantity','machineRate']) project[k]=Number($(k).value)||0;
  project.materialId=$('materialSelect').value; project.punchId=$('punchSelect').value; project.dieId=$('dieSelect').value;
}
function calc(){
  readForm();
  const m=getMaterial(), p=getPunch(), d=getDie();
  const t=project.thickness, r=project.insideRadius, a=project.angle, bendLen=project.bendLength;
  const bendAngle = 180 - a;
  const ba = (Math.PI/180) * bendAngle * (r + project.kFactor * t);
  const flat = project.legA + project.legB + ba;
  const tonsPerM = (1.42 * m.tensile * t * t) / Math.max(d.v,1) / 10;
  const totalTons = tonsPerM * (bendLen/1000);
  const minV = Math.max(6*t, 4); const maxV = 12*t;
  const matWeightKg = flat * bendLen * t * m.density / 1000000 * project.quantity;
  const matCost = matWeightKg * m.price;
  const setupMin = 10 + (d.v < minV || d.v > maxV ? 8 : 0);
  const cycleMin = project.quantity * 0.42;
  const machineCost = ((setupMin + cycleMin)/60) * project.machineRate;
  const totalCost = matCost + machineCost;
  const issues=[];
  if(d.v < minV) issues.push(`V demasiado pequeña. Recomendada mínima: ${minV.toFixed(1)} mm`);
  if(d.v > maxV) issues.push(`V grande para este espesor. Rango recomendado hasta: ${maxV.toFixed(1)} mm`);
  if(t < d.minT || t > d.maxT) issues.push(`La matriz no está en rango de espesor (${d.minT}-${d.maxT} mm)`);
  if(totalTons > d.maxTonsM*(bendLen/1000)) issues.push('La matriz puede superar su tonelaje recomendado');
  if(totalTons > p.maxTonsM*(bendLen/1000)) issues.push('El punzón puede superar su tonelaje recomendado');
  if(r < t*m.minRadiusFactor) issues.push(`Radio interior bajo. Recomendado >= ${(t*m.minRadiusFactor).toFixed(1)} mm`);
  result={m,p,d,bendAngle,ba,flat,tonsPerM,totalTons,minV,maxV,matWeightKg,matCost,setupMin,cycleMin,machineCost,totalCost,issues};
  renderAll();
}
function autoSelect(){
  readForm(); const t=project.thickness; const target=8*t;
  const compatible = db.dies.filter(d=>t>=d.minT && t<=d.maxT).sort((a,b)=>Math.abs(a.v-target)-Math.abs(b.v-target))[0] || db.dies[0];
  project.dieId = compatible.id;
  const p = db.punches.filter(p=>p.radius<=Math.max(project.insideRadius, t*1.5)).sort((a,b)=>b.maxTonsM-a.maxTonsM)[0] || db.punches[0];
  project.punchId = p.id; writeForm(); calc(); toast('Herramienta compatible seleccionada');
}
function renderAll(){ renderKpis(); renderCards(); renderTables(); renderDb(); renderSequence(); renderReport(); drawPreview(); }
function renderKpis(){
  $('kpiMaterial').textContent = result.m?.name || '-';
  $('kpiMaterialInfo').textContent = `${project.thickness} mm · ${project.bendLength} mm`;
  $('kpiFlat').textContent = `${(result.flat||0).toFixed(2)} mm`;
  $('kpiForce').textContent = `${(result.totalTons||0).toFixed(1)} T`;
  $('kpiFeasible').textContent = result.issues?.length ? 'Revisar' : 'Compatible';
  $('kpiFeasible').className = result.issues?.length ? 'statusWarn':'statusOk';
  $('kpiFeasibleInfo').textContent = result.issues?.length ? `${result.issues.length} aviso(s)` : 'Sin avisos críticos';
  $('systemStatus').textContent = result.issues?.length ? 'Revisar avisos' : 'Listo';
  $('systemStatus').style.color = result.issues?.length ? 'var(--warn)' : 'var(--green)';
  $('summary').innerHTML = [
    `Proyecto: <b>${project.projectName}</b>`, `Cliente: <b>${project.clientName}</b>`, `Material: <b>${result.m.name}</b>`, `Punzón: <b>${result.p.name}</b>`, `Matriz: <b>${result.d.name}</b>`,
    result.issues.length ? `<span class="statusWarn">Avisos: ${result.issues.join(' · ')}</span>` : `<span class="statusOk">La combinación es viable para demo.</span>`
  ].map(x=>`<div class="pill">${x}</div>`).join('');
}
function card(obj){ return Object.entries(obj).map(([k,v])=>`<div class="pill"><b>${k}:</b>&nbsp;${v}</div>`).join(''); }
function renderCards(){
  $('materialCard').innerHTML = card({Nombre:result.m.name, Densidad:result.m.density+' kg/dm³', Tracción:result.m.tensile+' MPa', 'Precio':result.m.price+' €/kg', K:result.m.k});
  $('punchCard').innerHTML = card({Ref:result.p.id, Ángulo:result.p.angle+'°', Radio:result.p.radius+' mm', Altura:result.p.height+' mm', Tonelaje:result.p.maxTonsM+' T/m'});
  $('dieCard').innerHTML = card({Ref:result.d.id, V:result.d.v+' mm', Ángulo:result.d.angle+'°', Espesor:result.d.minT+'-'+result.d.maxT+' mm', Tonelaje:result.d.maxTonsM+' T/m'});
  $('compatibility').innerHTML = result.issues.length ? result.issues.map(x=>`<p class="statusWarn">⚠ ${x}</p>`).join('') : '<p class="statusOk">✓ Material, punzón y matriz compatibles según la base de datos local.</p>';
}
function row(k,v){ return `<tr><td>${k}</td><td>${v}</td></tr>`; }
function renderTables(){
  $('calcTable').innerHTML = row('Bend angle', result.bendAngle.toFixed(1)+'°')+row('Bend allowance', result.ba.toFixed(3)+' mm')+row('Desarrollo plano', result.flat.toFixed(3)+' mm')+row('V recomendada', `${result.minV.toFixed(1)} - ${result.maxV.toFixed(1)} mm`)+row('Tonelaje / metro', result.tonsPerM.toFixed(1)+' T/m')+row('Tonelaje total', result.totalTons.toFixed(1)+' T');
  $('costTable').innerHTML = row('Peso material', result.matWeightKg.toFixed(2)+' kg')+row('Coste material', result.matCost.toFixed(2)+' €')+row('Preparación', result.setupMin.toFixed(1)+' min')+row('Ciclo estimado', result.cycleMin.toFixed(1)+' min')+row('Coste máquina', result.machineCost.toFixed(2)+' €')+row('Total estimado', result.totalCost.toFixed(2)+' €')+row('Unitario', (result.totalCost/project.quantity).toFixed(2)+' €/ud');
}
function renderSequence(){
  const steps=[['Revisar plano y material',`Confirmar ${result.m.name} de ${project.thickness} mm.`],['Montar herramientas',`${result.p.name} + ${result.d.name}.`],['Ajustar topes',`Longitud ala A ${project.legA} mm y ala B ${project.legB} mm.`],['Plegar',`Ángulo final ${project.angle}°, fuerza estimada ${result.totalTons.toFixed(1)} T.`],['Control de calidad',`Verificar ángulo, radio interior y longitud desarrollada ${result.flat.toFixed(2)} mm.`]];
  $('sequenceList').innerHTML = steps.map((s,i)=>`<div class="step"><div class="num">${i+1}</div><div><b>${s[0]}</b><p class="hint">${s[1]}</p></div><span class="pill">OK</span></div>`).join('');
}
function renderDb(){
  $('materialsDb').innerHTML = db.materials.map(x=>`<div class="dbItem" data-type="materials" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · ${x.tensile} MPa · ${x.price} €/kg</small></div>`).join('');
  $('punchesDb').innerHTML = db.punches.map(x=>`<div class="dbItem" data-type="punches" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · R${x.radius} · ${x.maxTonsM} T/m</small></div>`).join('');
  $('diesDb').innerHTML = db.dies.map(x=>`<div class="dbItem" data-type="dies" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · V${x.v} · ${x.minT}-${x.maxT} mm</small></div>`).join('');
  document.querySelectorAll('.dbItem').forEach(el=>el.onclick=()=>{ const type=el.dataset.type,id=el.dataset.id; if(type==='materials') project.materialId=id; if(type==='punches') project.punchId=id; if(type==='dies') project.dieId=id; writeForm(); calc(); toast('Registro seleccionado'); });
}
function report(){ return `PLEGAR PRO - INFORME TÉCNICO\n\nProyecto: ${project.projectName}\nCliente: ${project.clientName}\nMaterial: ${result.m.name}\nEspesor: ${project.thickness} mm\nPunzón: ${result.p.name}\nMatriz: ${result.d.name}\n\nDESARROLLO\nAla A: ${project.legA} mm\nAla B: ${project.legB} mm\nÁngulo: ${project.angle}°\nRadio interior: ${project.insideRadius} mm\nBend allowance: ${result.ba.toFixed(3)} mm\nDesarrollo plano: ${result.flat.toFixed(3)} mm\n\nFABRICACIÓN\nTonelaje total: ${result.totalTons.toFixed(1)} T\nCantidad: ${project.quantity}\nCoste total estimado: ${result.totalCost.toFixed(2)} €\nCoste unitario: ${(result.totalCost/project.quantity).toFixed(2)} €/ud\n\nVALIDACIÓN\n${result.issues.length ? result.issues.map(x=>'- '+x).join('\n') : 'Sin avisos críticos.'}\n`; }
function renderReport(){ $('reportText').value = report(); }
function drawPreview(){
  const c=$('preview'), ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle='#081526'; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle='rgba(255,255,255,.08)'; for(let x=0;x<c.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,c.height);ctx.stroke()} for(let y=0;y<c.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(c.width,y);ctx.stroke()}
  const cx=430, cy=260, scale=Math.min(3, 300/Math.max(project.legA,project.legB,80)); const a=project.angle*Math.PI/180;
  const x1=cx-project.legA*scale, y1=cy; const x2=cx, y2=cy; const x3=cx+Math.cos(Math.PI-a)*project.legB*scale; const y3=cy-Math.sin(Math.PI-a)*project.legB*scale;
  ctx.lineWidth=16; ctx.lineCap='round'; ctx.strokeStyle='#45e38a'; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.lineTo(x3,y3); ctx.stroke();
  ctx.lineWidth=4; ctx.strokeStyle='#ffcc66'; ctx.beginPath(); ctx.arc(cx,cy,28,Math.PI,Math.PI-a,true); ctx.stroke();
  ctx.fillStyle='#00d1ff'; ctx.fillRect(cx-90,315,180,18); ctx.fillStyle='#6c5cff'; ctx.beginPath(); ctx.moveTo(cx-60,160); ctx.lineTo(cx+60,160); ctx.lineTo(cx,220); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#eaf2ff'; ctx.font='18px system-ui'; ctx.fillText(`Desarrollo: ${result.flat.toFixed(2)} mm`,30,38); ctx.fillText(`${result.m.name} · ${project.thickness} mm`,30,66); ctx.fillStyle='#8fa6c7'; ctx.font='14px system-ui'; ctx.fillText('Vista simplificada de pieza, matriz y punzón',30,92);
}
function exportJson(){ readForm(); const data={project,db,calculation:result,exportedAt:new Date().toISOString()}; download('plegar-pro-proyecto.json', JSON.stringify(data,null,2),'application/json'); toast('Proyecto exportado'); }
function download(name,content,type){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
function addDb(){
  const type=$('dbType').value, name=$('dbName').value.trim(), a=$('dbA').value.trim(), b=$('dbB').value.trim(); if(!name) return toast('Escribe un nombre');
  const id = name.toUpperCase().replace(/[^A-Z0-9]+/g,'-') + '-' + Math.floor(Math.random()*999);
  if(type==='materials') db.materials.push({id,name,density:Number(a)||7.85,tensile:Number(b)||400,yield:200,k:.42,price:2,minRadiusFactor:1});
  if(type==='punches') db.punches.push({id,name,angle:Number(a)||86,radius:Number(b)||1,height:120,maxTonsM:80});
  if(type==='dies') db.dies.push({id,name,v:Number(a)||12,angle:86,minT:.5,maxT:Number(b)||3,maxTonsM:120});
  saveDb(); fillSelects(); writeForm(); calc(); $('dbName').value=$('dbA').value=$('dbB').value=''; toast('Registro añadido a la base de datos');
}
function initNav(){ document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{ document.querySelectorAll('.nav,.page').forEach(x=>x.classList.remove('active')); b.classList.add('active'); $(b.dataset.page).classList.add('active'); $('pageTitle').textContent=pageTitles[b.dataset.page][0]; $('pageSub').textContent=pageTitles[b.dataset.page][1]; }); }
function initEvents(){
  document.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',()=>calc()));
  $('calculateMain').onclick=()=>{calc();toast('Cálculo actualizado')}; $('autoSelect').onclick=autoSelect; $('saveProject').onclick=saveProject; $('exportProject').onclick=exportJson; $('loadExample').onclick=()=>{project={projectName:'Caja inox con un pliegue',clientName:'Demo Taller',legA:120,legB:75,bendLength:650,thickness:2,angle:90,insideRadius:2.5,materialId:'INOX304',punchId:'P-90-R15',dieId:'M-V16-86',kFactor:.38,quantity:12,machineRate:62}; writeForm(); calc(); toast('Ejemplo cargado');};
  $('addDb').onclick=addDb; $('resetDb').onclick=()=>{db=structuredClone(DEFAULT_DB); saveDb(); fillSelects(); project.materialId=db.materials[0].id; project.punchId=db.punches[0].id; project.dieId=db.dies[1].id; writeForm(); calc(); toast('Base de datos restaurada');};
  $('generateReport').onclick=()=>{renderReport();toast('Informe generado')}; $('downloadReport').onclick=()=>download('informe-plegar-pro.txt',report(),'text/plain');
  $('importProject').onclick=()=>{ const f=$('importFile').files[0]; if(!f) return toast('Selecciona un JSON'); const r=new FileReader(); r.onload=()=>{ try{ const data=JSON.parse(r.result); if(data.db) db=data.db; if(data.project) project=data.project; saveDb(); fillSelects(); writeForm(); calc(); toast('Proyecto importado'); }catch(e){toast('JSON no válido')} }; r.readAsText(f); };
}
fillSelects(); writeForm(); initNav(); initEvents(); calc();
