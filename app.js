const seedDB = {
  materials:[
    {id:'dc01',name:'Acero DC01',k:0.38,rm:280,density:7.85,color:'#4ea1ff'},
    {id:'s235',name:'Acero S235',k:0.40,rm:360,density:7.85,color:'#38d996'},
    {id:'inox304',name:'Inox 304',k:0.44,rm:620,density:8.00,color:'#d1e8ff'},
    {id:'alu5754',name:'Aluminio 5754',k:0.33,rm:220,density:2.66,color:'#ffcc66'},
    {id:'galv',name:'Galvanizado DX51D',k:0.39,rm:300,density:7.85,color:'#9ad7ff'}
  ],
  dies:[
    {id:'v6',ref:'Matriz V6 88°',v:6,angle:88,minT:0.5,maxT:1.2},
    {id:'v8',ref:'Matriz V8 88°',v:8,angle:88,minT:0.8,maxT:1.5},
    {id:'v10',ref:'Matriz V10 88°',v:10,angle:88,minT:1.0,maxT:2.0},
    {id:'v12',ref:'Matriz V12 88°',v:12,angle:88,minT:1.2,maxT:2.5},
    {id:'v16',ref:'Matriz V16 85°',v:16,angle:85,minT:2.0,maxT:3.5},
    {id:'v20',ref:'Matriz V20 85°',v:20,angle:85,minT:3.0,maxT:5.0}
  ],
  punches:[
    {id:'p08',ref:'Punzón R0.8 88°',r:0.8,angle:88,height:120},
    {id:'p12',ref:'Punzón R1.2 88°',r:1.2,angle:88,height:120},
    {id:'p20',ref:'Punzón R2.0 85°',r:2.0,angle:85,height:135},
    {id:'p30',ref:'Punzón R3.0 85°',r:3.0,angle:85,height:150},
    {id:'goose',ref:'Cuello cisne R1.5 86°',r:1.5,angle:86,height:180}
  ]
};
let db = JSON.parse(localStorage.getItem('plegarProDB') || 'null') || seedDB;
let lastResult = null;
const $ = id => document.getElementById(id);
const fmt = (n,d=2)=> Number.isFinite(n)? n.toFixed(d) : '-';
function fillSelects(){
  $('materialSelect').innerHTML = db.materials.map(m=>`<option value="${m.id}">${m.name}</option>`).join('');
  $('dieSelect').innerHTML = db.dies.map(d=>`<option value="${d.id}">${d.ref} · V${d.v}</option>`).join('');
  $('punchSelect').innerHTML = db.punches.map(p=>`<option value="${p.id}">${p.ref}</option>`).join('');
  renderToolTables();
}
function getInput(){return {
  name:$('projectName').value || 'Proyecto sin nombre', material:db.materials.find(x=>x.id===$('materialSelect').value),
  die:db.dies.find(x=>x.id===$('dieSelect').value), punch:db.punches.find(x=>x.id===$('punchSelect').value),
  t:+$('thickness').value, a:+$('legA').value, b:+$('legB').value, angle:+$('angle').value, r:+$('radius').value, length:+$('bendLength').value
}}
function calculate(){
  const i=getInput();
  const bendRad=(180-i.angle)*Math.PI/180; // included bend development angle
  const ba=bendRad*(i.r+i.material.k*i.t);
  const ossb=Math.tan(((180-i.angle)/2)*Math.PI/180)*(i.r+i.t);
  const bd=2*ossb-ba;
  const flat=i.a+i.b-bd;
  const force=(1.42*i.material.rm*i.t*i.t*i.length)/(1000*i.die.v); // approximate kN
  const okDie=i.t>=i.die.minT && i.t<=i.die.maxT;
  const okPunch=Math.abs(i.punch.angle-i.die.angle)<=5 && i.punch.r<=Math.max(i.r+1, i.t*2);
  const minV=i.t*6, maxV=i.t*12;
  let warnings=[];
  if(!okDie) warnings.push({type:'danger',txt:`La matriz seleccionada admite ${i.die.minT}-${i.die.maxT} mm y la pieza tiene ${i.t} mm.`});
  if(i.die.v<minV || i.die.v>maxV) warnings.push({type:'warning',txt:`V recomendada aproximada: ${fmt(minV,1)}-${fmt(maxV,1)} mm. Seleccionada: V${i.die.v}.`});
  if(!okPunch) warnings.push({type:'warning',txt:'El punzón no es ideal para esta matriz/radio. Revisa ángulo y radio.'});
  if(force>800) warnings.push({type:'danger',txt:`Fuerza alta estimada: ${fmt(force,0)} kN. Verifica tonelaje de máquina.`});
  if(!warnings.length) warnings.push({type:'success',txt:'Configuración compatible para demo. Validación básica correcta.'});
  lastResult={input:i, ba, bd, flat, force, ok:okDie && okPunch, warnings, date:new Date().toISOString()};
  updateUI();
  setStatus('Cálculo actualizado');
}
function updateUI(){
  const r=lastResult; if(!r) return;
  $('kpiMaterial').textContent=r.input.material.name;
  $('kpiFlat').textContent=`${fmt(r.flat)} mm`;
  $('kpiForce').textContent=`${fmt(r.force,0)} kN`;
  $('kpiOk').textContent=r.ok?'OK':'Revisar';
  $('resultTable').innerHTML = [
    ['Bend Allowance',`${fmt(r.ba)} mm`],['Bend Deduction',`${fmt(r.bd)} mm`],['Desarrollo plano',`${fmt(r.flat)} mm`],['Fuerza estimada',`${fmt(r.force,0)} kN`],['K-Factor usado',r.input.material.k],['Matriz',r.input.die.ref],['Punzón',r.input.punch.ref]
  ].map(x=>`<tr><td>${x[0]}</td><td><b>${x[1]}</b></td></tr>`).join('');
  $('warnings').innerHTML=r.warnings.map(w=>`<div class="${w.type}">${w.txt}</div>`).join('');
  $('summary').innerHTML=`<p><b>${r.input.name}</b></p><p>Material: <b>${r.input.material.name}</b>, espesor <b>${r.input.t} mm</b>, plegado a <b>${r.input.angle}°</b>.</p><p>Desarrollo calculado: <b>${fmt(r.flat)} mm</b>. Fuerza estimada: <b>${fmt(r.force,0)} kN</b>.</p><p>Estado: <span class="${r.ok?'ok':'warn'}">${r.ok?'compatible':'requiere revisión'}</span>.</p>`;
  $('sequenceList').innerHTML=['Verificar material y espesor','Montar '+r.input.die.ref,'Montar '+r.input.punch.ref,'Ajustar topes a ala A '+r.input.a+' mm','Realizar plegado a '+r.input.angle+'°','Medir ángulo y corregir recuperación elástica'].map(x=>`<li>${x}</li>`).join('');
  $('projectJson').textContent=JSON.stringify(r,null,2);
  drawPart(); drawFlat();
}
function drawPart(){
  const c=$('partCanvas'),ctx=c.getContext('2d'); ctx.clearRect(0,0,c.width,c.height); const r=lastResult; if(!r){drawEmpty(ctx,c,'Sin cálculo');return}
  const cx=430,cy=270,scale=2.2,a=r.input.a*scale,b=r.input.b*scale,ang=(180-r.input.angle)*Math.PI/180;
  ctx.lineWidth=18;ctx.lineCap='round';ctx.strokeStyle=r.input.material.color;ctx.shadowColor=r.input.material.color;ctx.shadowBlur=16;
  ctx.beginPath();ctx.moveTo(cx-a,cy);ctx.lineTo(cx,cy);ctx.lineTo(cx+Math.cos(-ang)*b,cy+Math.sin(-ang)*b);ctx.stroke();ctx.shadowBlur=0;
  ctx.fillStyle='#eaf3ff';ctx.font='20px Segoe UI';ctx.fillText('Vista plegada',30,42);ctx.fillStyle='#8aa4c4';ctx.font='15px Segoe UI';ctx.fillText(`${r.input.material.name} · ${r.input.t} mm · ${r.input.angle}°`,30,70);
  ctx.strokeStyle='#20d3ff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,45,-ang,0);ctx.stroke();ctx.fillStyle='#20d3ff';ctx.fillText(r.input.angle+'°',cx+20,cy-28);
}
function drawFlat(){
  const c=$('flatCanvas'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);const r=lastResult;if(!r){drawEmpty(ctx,c,'Sin desarrollo');return}
  const w=Math.min(760,r.flat*3),x=(c.width-w)/2,y=150,h=70;
  ctx.fillStyle=r.input.material.color;ctx.shadowColor=r.input.material.color;ctx.shadowBlur=15;roundRect(ctx,x,y,w,h,16,true);ctx.shadowBlur=0;
  ctx.strokeStyle='#07111f';ctx.setLineDash([8,8]);ctx.lineWidth=3;const bx=x+(r.input.a/r.flat)*w;ctx.beginPath();ctx.moveTo(bx,y-25);ctx.lineTo(bx,y+h+25);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#eaf3ff';ctx.font='20px Segoe UI';ctx.fillText('Desarrollo plano',30,42);ctx.fillStyle='#8aa4c4';ctx.font='15px Segoe UI';ctx.fillText(`Largo total: ${fmt(r.flat)} mm · línea discontinua = línea de plegado`,30,70);
}
function roundRect(ctx,x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r); if(fill)ctx.fill(); else ctx.stroke()}
function drawEmpty(ctx,c,t){ctx.fillStyle='#8aa4c4';ctx.font='22px Segoe UI';ctx.fillText(t,40,60)}
function renderToolTables(){
  $('diesTable').innerHTML=db.dies.map(d=>`<tr><td>${d.ref}</td><td>${d.v}</td><td>${d.angle}°</td><td>${d.minT}-${d.maxT} mm</td></tr>`).join('');
  $('punchesTable').innerHTML=db.punches.map(p=>`<tr><td>${p.ref}</td><td>${p.r}</td><td>${p.angle}°</td><td>${p.height}</td></tr>`).join('');
}
function setStatus(t){$('statusText').textContent=t; setTimeout(()=>$('statusText').textContent='Listo',2400)}
function nav(page){document.querySelectorAll('.page,.nav').forEach(e=>e.classList.remove('active')); $(`${page}`).classList.add('active'); document.querySelector(`[data-page="${page}"]`).classList.add('active'); const titles={dashboard:['Panel principal','Base de datos local, cálculo de plegado y simulación visual.'],calc:['Calculadora de plegado','Elige material, matriz, punzón y calcula el desarrollo.'],tools:['Herramientas','Base local de punzones y matrices editable.'],flat:['Desarrollo y secuencia','Visualiza el desarrollo plano y la secuencia propuesta.'],project:['Proyecto','Guarda y exporta los resultados.'],help:['Ayuda','Funcionamiento de la demo.']}; $('pageTitle').textContent=titles[page][0]; $('pageSub').textContent=titles[page][1];}
function download(name,text,type='application/json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
function bind(){
 document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>nav(b.dataset.page));
 ['btnCalc','calcFromForm'].forEach(id=>$(id).onclick=calculate);
 $('btnExample').onclick=()=>{ $('projectName').value='Soporte inoxidable demo'; $('materialSelect').value='inox304'; $('thickness').value=1.5; $('legA').value=80; $('legB').value=55; $('angle').value=90; $('radius').value=1.2; $('bendLength').value=300; $('dieSelect').value='v10'; $('punchSelect').value='p12'; calculate(); };
 $('resetForm').onclick=()=>{['projectName','thickness','legA','legB','angle','radius','bendLength'].forEach(id=>$(id).value=''); setStatus('Formulario limpio')};
 $('addTool').onclick=()=>{const type=$('toolType').value,ref=$('toolRef').value||'Nueva herramienta',main=+$('toolMain').value;if(!main)return alert('Introduce un valor'); if(type==='die')db.dies.push({id:'d'+Date.now(),ref,v:main,angle:88,minT:Math.max(.5,main/12),maxT:main/6}); else db.punches.push({id:'p'+Date.now(),ref,r:main,angle:88,height:120}); localStorage.setItem('plegarProDB',JSON.stringify(db)); fillSelects(); setStatus('Herramienta añadida')};
 $('saveProject').onclick=()=>{if(!lastResult)calculate(); localStorage.setItem('plegarProProject',JSON.stringify(lastResult)); setStatus('Proyecto guardado')};
 $('loadSaved').onclick=()=>{const s=localStorage.getItem('plegarProProject'); if(!s)return alert('No hay proyecto guardado'); lastResult=JSON.parse(s); $('projectJson').textContent=JSON.stringify(lastResult,null,2); updateUI(); setStatus('Proyecto cargado')};
 $('exportJson').onclick=()=>{if(!lastResult)calculate(); download('plegar-pro-proyecto.json',JSON.stringify(lastResult,null,2))};
 $('exportCsv').onclick=()=>{if(!lastResult)calculate(); const r=lastResult; download('plegar-pro-resultados.csv',`Campo,Valor\nMaterial,${r.input.material.name}\nEspesor,${r.input.t}\nDesarrollo,${fmt(r.flat)}\nFuerza kN,${fmt(r.force,0)}\nMatriz,${r.input.die.ref}\nPunzon,${r.input.punch.ref}`,'text/csv')};
}
fillSelects(); bind(); $('btnExample').click();
