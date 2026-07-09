const DEFAULT_DB={
 materials:[
  {id:'S235',name:'Acero S235JR',density:7.85,tensile:360,yield:235,k:0.42,price:1.35,minRadiusFactor:1.0},
  {id:'S355',name:'Acero S355',density:7.85,tensile:510,yield:355,k:0.40,price:1.55,minRadiusFactor:1.2},
  {id:'INOX304',name:'Inox AISI 304',density:7.90,tensile:620,yield:215,k:0.38,price:3.90,minRadiusFactor:1.5},
  {id:'AL5754',name:'Aluminio 5754',density:2.66,tensile:220,yield:100,k:0.44,price:4.20,minRadiusFactor:1.0},
  {id:'GALV',name:'Galvanizado DX51D',density:7.85,tensile:330,yield:140,k:0.43,price:1.70,minRadiusFactor:1.0}
 ],
 punches:[
  {id:'MECOS-P88-R08-H120',brand:'Mecos',name:'Mecos P88 R0.8 H120',angle:88,radius:0.8,height:120,maxTonsM:80,type:'recto'},
  {id:'MECOS-P88-R10-H150',brand:'Mecos',name:'Mecos P88 R1.0 H150',angle:88,radius:1.0,height:150,maxTonsM:100,type:'recto alto'},
  {id:'MECOS-P86-R05-CISNE',brand:'Mecos',name:'Mecos cuello cisne 86° R0.5',angle:86,radius:0.5,height:185,maxTonsM:65,type:'cuello cisne'},
  {id:'MECOS-P85-R15-H160',brand:'Mecos',name:'Mecos P85 R1.5 H160',angle:85,radius:1.5,height:160,maxTonsM:120,type:'recto'},
  {id:'MECOS-P90-R20-H145',brand:'Mecos',name:'Mecos P90 R2.0 H145',angle:90,radius:2.0,height:145,maxTonsM:130,type:'radio'},
  {id:'MECOS-P30-HEM',brand:'Mecos',name:'Mecos aplastador / dobladillo',angle:30,radius:0.8,height:130,maxTonsM:90,type:'dobladillo'},
  {id:'MECOS-P30-R08-H160',brand:'Mecos',name:'Mecos punzón 30° R0.8 H160',angle:30,radius:0.8,height:160,maxTonsM:80,type:'30 grados'},
  {id:'MECOS-P30-RECTO-H100',brand:'Mecos',name:'Mecos punzón recto 30° H100 R0.8',angle:30,radius:0.8,height:100,maxTonsM:85,type:'recto 30 grados h100'},
  {id:'MECOS-P30-R15-H180',brand:'Mecos',name:'Mecos punzón 30° R1.5 H180',angle:30,radius:1.5,height:180,maxTonsM:95,type:'30 grados alto'},
  {id:'MECOS-PATACABRA-88-R10',brand:'Mecos',name:'Mecos pata de cabra 88° R1.0',angle:88,radius:1.0,height:210,maxTonsM:70,type:'pata de cabra'},
  {id:'MECOS-PATACABRA-30-R08',brand:'Mecos',name:'Mecos pata de cabra 30° R0.8',angle:30,radius:0.8,height:220,maxTonsM:60,type:'pata de cabra 30 grados'}
 ],
 dies:[
  {id:'MECOS-MV06-86',brand:'Mecos',name:'Mecos matriz V6 86°',v:6,angle:86,minT:0.5,maxT:1.2,maxTonsM:65},
  {id:'MECOS-MV08-86',brand:'Mecos',name:'Mecos matriz V8 86°',v:8,angle:86,minT:0.8,maxT:1.6,maxTonsM:80},
  {id:'MECOS-MV10-86',brand:'Mecos',name:'Mecos matriz V10 86°',v:10,angle:86,minT:1.0,maxT:2.0,maxTonsM:100},
  {id:'MECOS-MV12-86',brand:'Mecos',name:'Mecos matriz V12 86°',v:12,angle:86,minT:1.2,maxT:2.5,maxTonsM:120},
  {id:'MECOS-MV16-86',brand:'Mecos',name:'Mecos matriz V16 86°',v:16,angle:86,minT:2.0,maxT:4.0,maxTonsM:160},
  {id:'MECOS-MV20-86',brand:'Mecos',name:'Mecos matriz V20 86°',v:20,angle:86,minT:2.5,maxT:5.0,maxTonsM:190},
  {id:'MECOS-MV24-86',brand:'Mecos',name:'Mecos matriz V24 86°',v:24,angle:86,minT:3.0,maxT:6.0,maxTonsM:220},
  {id:'MECOS-MV06-30',brand:'Mecos',name:'Mecos matriz V6 30°',v:6,angle:30,minT:0.5,maxT:1.2,maxTonsM:55},
  {id:'MECOS-MV08-30',brand:'Mecos',name:'Mecos matriz V8 30°',v:8,angle:30,minT:0.6,maxT:1.5,maxTonsM:65},
  {id:'MECOS-MV12-30',brand:'Mecos',name:'Mecos matriz V12 30°',v:12,angle:30,minT:1.0,maxT:2.5,maxTonsM:100},
  {id:'MECOS-MV16-30',brand:'Mecos',name:'Mecos matriz V16 30°',v:16,angle:30,minT:1.5,maxT:3.5,maxTonsM:135},
  {id:'MECOS-MV20-30',brand:'Mecos',name:'Mecos matriz V20 30°',v:20,angle:30,minT:2.0,maxT:5.0,maxTonsM:170},
  {id:'MECOS-MV24-30',brand:'Mecos',name:'Mecos matriz V24 30°',v:24,angle:30,minT:2.5,maxT:6.0,maxTonsM:200},
  {id:'MECOS-MV32-30',brand:'Mecos',name:'Mecos matriz V32 30°',v:32,angle:30,minT:4.0,maxT:8.0,maxTonsM:240}
 ],
 machines:[
  {id:'BYSTRONIC-XPERT-3100-100-2006',brand:'Bystronic',name:'Bystronic Xpert 3100 / 100T',model:'Xpert',year:2006,length:3100,tons:100,tonsPerM:32.26,axes:'Y1/Y2/X/R/Z1/Z2',control:'ByVision / demo',notes:'Ficha local orientativa para beta. Validar datos exactos con placa/manual de máquina.'}
 ]
};
const $=id=>document.getElementById(id);
const clone=o=>JSON.parse(JSON.stringify(o));
let db=JSON.parse(localStorage.getItem('ppDbMecos')||'null')||clone(DEFAULT_DB);
function mergeDefaultDb(){['materials','punches','dies','machines'].forEach(k=>{db[k]=db[k]||[];DEFAULT_DB[k].forEach(item=>{if(!db[k].some(x=>x.id===item.id))db[k].push(clone(item));});});saveDb();}
mergeDefaultDb();
let project=JSON.parse(localStorage.getItem('ppProjectMecos')||'null')||{
 projectName:'Caja soporte multi-plegado',clientName:'Cliente Demo',bendLength:650,thickness:2,quantity:12,machineRate:62,materialId:'INOX304',kFactor:0.38,toolMode:'auto',punchId:'MECOS-P88-R10-H150',dieId:'MECOS-MV16-86',machineId:'BYSTRONIC-XPERT-3100-100-2006',
 segments:[70,120,80,45],
 bends:[{angle:90,radius:2,direction:'up',side:'interior'},{angle:90,radius:2,direction:'up',side:'interior'},{angle:90,radius:2,direction:'down',side:'exterior'}]
};
let result={}; let timer=null; let aiNotes=[];
const pages={dashboard:['Panel general','Cálculo multi-plegado, útiles Mecos y simulación visual.'],project:['Proyecto','Datos generales, material y modo de selección.'],bends:['Plegados','Añadir más de dos plegados y definir alas.'],tools:['Útiles recomendados','Selección automática de punzones y matrices Mecos.'],development:['Desarrollo','Longitud plana, compensaciones y costes.'],simulation:['Simulación','Plegado visual paso a paso.'],importai:['Importar plano + IA','Carga cotas/plegados automáticos desde JSON, CSV o DXF simple y analiza con IA local.'],database:['Base de datos','Materiales, punzones Mecos y matrices Mecos editables.'],reports:['Informes','Exportación, importación e informe técnico.']};
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function saveDb(){localStorage.setItem('ppDbMecos',JSON.stringify(db))}
function fillSelects(){
 $('materialSelect').innerHTML=db.materials.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
 $('punchSelect').innerHTML=db.punches.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
 $('dieSelect').innerHTML=db.dies.map(x=>`<option value="${x.id}">${x.name}</option>`).join('');
 if($('machineSelect')) $('machineSelect').innerHTML=(db.machines||[]).map(x=>`<option value="${x.id}">${x.name} · ${x.year}</option>`).join('');
}
function writeForm(){['projectName','clientName','bendLength','thickness','quantity','machineRate','kFactor','toolMode','materialSelect','punchSelect','dieSelect','machineSelect'].forEach(id=>{if(!$(id))return});
 $('projectName').value=project.projectName;$('clientName').value=project.clientName;$('bendLength').value=project.bendLength;$('thickness').value=project.thickness;$('quantity').value=project.quantity;$('machineRate').value=project.machineRate;$('kFactor').value=project.kFactor;$('toolMode').value=project.toolMode||'auto';$('materialSelect').value=project.materialId;$('punchSelect').value=project.punchId;$('dieSelect').value=project.dieId;if($('machineSelect')) $('machineSelect').value=project.machineId||'BYSTRONIC-XPERT-3100-100-2006';renderBendEditor();}
function readForm(){project.projectName=$('projectName').value;project.clientName=$('clientName').value;project.bendLength=+$('bendLength').value||1;project.thickness=+$('thickness').value||1;project.quantity=+$('quantity').value||1;project.machineRate=+$('machineRate').value||1;project.kFactor=+$('kFactor').value||.42;project.toolMode=$('toolMode').value;project.materialId=$('materialSelect').value;project.punchId=$('punchSelect').value;project.dieId=$('dieSelect').value;if($('machineSelect')) project.machineId=$('machineSelect').value;readBends();}
function renderBendEditor(){const wrap=$('bendsEditor');wrap.innerHTML='';project.segments.forEach((s,i)=>{wrap.insertAdjacentHTML('beforeend',`<div class="bendRow"><b>Ala ${i+1}</b><label>Longitud<input class="segInput" data-i="${i}" type="number" value="${s}" min="1" step="0.1"></label>${i<project.bends.length?`<b>Plegado ${i+1}</b><label>Ángulo<input class="bendAngle" data-i="${i}" type="number" value="${project.bends[i].angle}" min="1" max="179"></label><label>Radio<input class="bendRadius" data-i="${i}" type="number" value="${project.bends[i].radius}" min="0.1" step="0.1"></label><label>Dirección<select class="bendDir" data-i="${i}"><option value="up" ${project.bends[i].direction==='up'?'selected':''}>Arriba</option><option value="down" ${project.bends[i].direction==='down'?'selected':''}>Abajo</option></select></label><label>Tipo<select class="bendSide" data-i="${i}"><option value="interior" ${project.bends[i].side!=='exterior'?'selected':''}>Interior</option><option value="exterior" ${project.bends[i].side==='exterior'?'selected':''}>Exterior</option></select></label>`:''}</div>`)});wrap.querySelectorAll('input,select').forEach(e=>e.oninput=()=>calc());}
function readBends(){document.querySelectorAll('.segInput').forEach(e=>project.segments[+e.dataset.i]=+e.value||1);document.querySelectorAll('.bendAngle').forEach(e=>project.bends[+e.dataset.i].angle=+e.value||90);document.querySelectorAll('.bendRadius').forEach(e=>project.bends[+e.dataset.i].radius=+e.value||project.thickness);document.querySelectorAll('.bendDir').forEach(e=>project.bends[+e.dataset.i].direction=e.value);document.querySelectorAll('.bendSide').forEach(e=>project.bends[+e.dataset.i].side=e.value);}
function find(type,id){return db[type].find(x=>x.id===id)||db[type][0]}
function bendAllowance(angle,r,k,t){const bendAngle=180-angle;return (Math.PI/180)*bendAngle*(r+k*t)}
function tonsPerM(mat,t,v){return (1.42*mat.tensile*t*t)/(v*10)}
function scoreTool(p,d,b,mat,t){let score=0,issues=[];const recMin=6*t,recMax=10*t;if(d.v<recMin)issues.push('V pequeña');if(d.v>recMax)issues.push('V grande');if(t<d.minT||t>d.maxT)issues.push('espesor fuera de rango');if(p.radius>b.radius*1.8)issues.push('radio de punzón alto');if(p.maxTonsM<tonsPerM(mat,t,d.v))issues.push('punzón justo');if(d.maxTonsM<tonsPerM(mat,t,d.v))issues.push('matriz justa');if(b.angle<=45){score+=Math.abs(p.angle-30)*3+Math.abs(d.angle-30)*3; if(p.id==='MECOS-P30-RECTO-H100') score-=10; if(p.height>130) score+=3; if(d.angle===30) score-=5; if(p.angle>45) issues.push('mejor punzón 30°'); if(d.angle>45) issues.push('mejor matriz 30°')}
 if(b.side==='interior' && project.bends.length>=3 && !String(p.type).includes('pata')) score+=8;
 score+=Math.abs(d.v-8*t)*4+Math.abs(p.radius-b.radius)*8+issues.length*100;return{p,d,score,issues}}
function recommendForBend(b){const mat=find('materials',project.materialId),t=project.thickness;let best=null;db.punches.forEach(p=>db.dies.forEach(d=>{const s=scoreTool(p,d,b,mat,t);if(!best||s.score<best.score)best=s}));return best}
function calc(){readForm();const mat=find('materials',project.materialId);if(project.kFactor!==mat.k&&document.activeElement?.id!=='kFactor')project.kFactor=mat.k;let flat=project.segments.reduce((a,b)=>a+(+b||0),0), totalTons=0, issues=[], bendResults=[];
 project.bends.forEach((b,i)=>{const rec=project.toolMode==='manual'?{p:find('punches',project.punchId),d:find('dies',project.dieId),issues:[]} : recommendForBend(b);const ba=bendAllowance(b.angle,b.radius,project.kFactor,project.thickness);const tpm=tonsPerM(mat,project.thickness,rec.d.v);const tons=tpm*(project.bendLength/1000);flat+=ba;totalTons+=tons;bendResults.push({index:i+1,b,ba,tpm,tons,rec}); if(b.radius<project.thickness*mat.minRadiusFactor*.75)issues.push(`Plegado ${i+1}: radio interior bajo para ${mat.name}`); rec.issues.forEach(x=>issues.push(`Plegado ${i+1}: ${x}`));});
 const machine=find('machines',project.machineId||'BYSTRONIC-XPERT-3100-100-2006');if(project.bendLength>machine.length)issues.push(`Longitud superior a ${machine.length} mm de la ${machine.name}`);const maxSingle=Math.max(0,...bendResults.map(x=>x.tons));if(maxSingle>machine.tons)issues.push(`Algún plegado supera las ${machine.tons} T de la máquina`);
 const weight=flat*project.bendLength*project.thickness*mat.density/1e6;const matCost=weight*mat.price;const setup=12+project.bends.length*2.5;const cycle=project.quantity*(0.35+project.bends.length*0.28);const machineCost=((setup+cycle)/60)*project.machineRate;result={mat,machine,flat,totalTons,issues,bendResults,weight,matCost,setup,cycle,machineCost,totalCost:matCost+machineCost,mainTool:bendResults[0]?.rec};renderAll();}
function renderAll(){renderKpis();renderCards();renderTables();renderDb();renderReport();renderAiPanel();drawPreview();drawSim();}
function pill(s){return `<div class="pill">${s}</div>`}
function renderKpis(){const machine=find('machines',project.machineId||'BYSTRONIC-XPERT-3100-100-2006');$('kpiMaterial').textContent=result.mat.name;$('kpiMaterialInfo').textContent=`${project.thickness} mm · ${project.bendLength} mm ancho`;$('kpiBends').textContent=project.bends.length;$('kpiFlat').textContent=result.flat.toFixed(2)+' mm';$('kpiFeasible').textContent=result.issues.length?'Revisar':'Compatible';$('kpiFeasible').className=result.issues.length?'statusWarn':'statusOk';$('kpiFeasibleInfo').textContent=result.issues.length?`${result.issues.length} aviso(s)`:'Sin avisos críticos';$('systemStatus').textContent=result.issues.length?'Revisar avisos':'Listo';$('summary').innerHTML=[pill(`Proyecto: <b>${project.projectName}</b>`),pill(`Material: <b>${result.mat.name}</b>`),pill(`Plegados: <b>${project.bends.length}</b>`),pill(`Desarrollo total: <b>${result.flat.toFixed(2)} mm</b>`),pill(`Máquina: <b>${machine.name}</b>`),pill(`Fuerza acumulada: <b>${result.totalTons.toFixed(1)} T</b>`),result.issues.length?pill(`<span class="statusWarn">${result.issues.length} avisos técnicos</span>`):pill(`<span class="statusOk">Combinación viable para beta</span>`)].join('');}
function renderCards(){const tr=result.mainTool; $('toolRecommendation').innerHTML=tr?`<div class="bigTool"><b>${tr.p.name}</b><span>Punzón recomendado</span></div><div class="bigTool"><b>${tr.d.name}</b><span>Matriz recomendada · V${tr.d.v}</span></div><p class="hint">El sistema calcula la mejor combinación por plegado según espesor, radio, V, tonelaje y compatibilidad.</p>`:'';$('compatibility').innerHTML=result.issues.length?result.issues.map(x=>`<p class="statusWarn">⚠ ${x}</p>`).join(''):'<p class="statusOk">✓ Material y útiles compatibles según la base local Mecos.</p>';$('perBendTools').innerHTML=result.bendResults.map(r=>`<div class="toolCard"><b>Plegado ${r.index}</b><span>${r.rec.p.name}</span><span>${r.rec.d.name}</span><small>BA ${r.ba.toFixed(2)} mm · ${r.tons.toFixed(1)} T</small></div>`).join('');}
function row(a,b){return `<tr><td>${a}</td><td>${b}</td></tr>`}
function renderTables(){$('calcTable').innerHTML=row('Alas',project.segments.map(x=>x+' mm').join(' + '))+row('Nº de plegados',project.bends.length)+row('Suma alas',project.segments.reduce((a,b)=>a+b,0).toFixed(2)+' mm')+row('Suma compensaciones',result.bendResults.reduce((a,b)=>a+b.ba,0).toFixed(3)+' mm')+row('Desarrollo plano total',result.flat.toFixed(3)+' mm')+row('Fuerza acumulada',result.totalTons.toFixed(1)+' T');$('costTable').innerHTML=row('Peso estimado',result.weight.toFixed(2)+' kg')+row('Coste material',result.matCost.toFixed(2)+' €')+row('Preparación',result.setup.toFixed(1)+' min')+row('Ciclo lote',result.cycle.toFixed(1)+' min')+row('Coste máquina',result.machineCost.toFixed(2)+' €')+row('Total estimado',result.totalCost.toFixed(2)+' €')+row('Unitario',(result.totalCost/project.quantity).toFixed(2)+' €/ud');$('bendTable').innerHTML=result.bendResults.map((r,i)=>`<tr><td>${r.index}</td><td>${project.segments[i]} mm</td><td>${r.b.angle}° ${r.b.direction==='up'?'↑':'↓'}<br>${r.b.side==='exterior'?'Exterior':'Interior'}</td><td>${r.b.radius} mm</td><td>${r.ba.toFixed(3)} mm</td><td>${r.rec.p.id}<br>${r.rec.d.id}</td><td>${r.tons.toFixed(1)} T</td></tr>`).join('');renderSequence();}
function getBestSequence(){
 const arr=result.bendResults.map((r,i)=>({i,r,score:(r.rec.issues.length*50)+(r.b.side==='interior'?0:8)+(r.b.direction==='down'?6:0)+Math.abs((project.segments[i]||0)-(project.segments[i+1]||0))*0.02}));
 return arr.sort((a,b)=>a.score-b.score);
}
function renderSequence(){$('sequenceList').innerHTML=getBestSequence().map((o,ord)=>{const r=o.r;return `<div class="step"><div class="num">${ord+1}</div><div><b>Plegado ${r.index}: ${r.b.angle}° · ${r.b.side==='exterior'?'exterior':'interior'} · ${r.b.direction==='up'?'arriba':'abajo'}</b><p class="hint">Mejor orden recomendado: hacer P${r.index} en posición ${ord+1}. Usar ${r.rec.p.name} con ${r.rec.d.name}. Fuerza aprox. ${r.tons.toFixed(1)} T.</p></div><span class="pill">${r.rec.issues.length?'Revisar':'OK'}</span></div>`}).join('');$('simStep').max=project.bends.length;}
function renderDb(){$('materialsDb').innerHTML=db.materials.map(x=>`<div class="dbItem" data-type="materials" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · ${x.tensile} MPa · ${x.price} €/kg</small></div>`).join('');$('punchesDb').innerHTML=db.punches.map(x=>`<div class="dbItem" data-type="punches" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · R${x.radius} · ${x.maxTonsM} T/m</small></div>`).join('');$('diesDb').innerHTML=db.dies.map(x=>`<div class="dbItem" data-type="dies" data-id="${x.id}"><b>${x.name}</b><small>${x.id} · V${x.v} · ${x.minT}-${x.maxT} mm</small></div>`).join('');if($('machinesDb')) $('machinesDb').innerHTML=(db.machines||[]).map(x=>`<div class="dbItem" data-type="machines" data-id="${x.id}"><b>${x.name}</b><small>${x.length} mm · ${x.tons} T · Año ${x.year}</small></div>`).join('');document.querySelectorAll('.dbItem').forEach(el=>el.onclick=()=>{if(el.dataset.type==='materials')project.materialId=el.dataset.id;if(el.dataset.type==='punches')project.punchId=el.dataset.id;if(el.dataset.type==='dies')project.dieId=el.dataset.id;if(el.dataset.type==='machines')project.machineId=el.dataset.id;writeForm();calc();toast('Registro seleccionado')})}
function drawFlat(ctx,w,h){ctx.fillStyle='#071426';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.08)';for(let x=0;x<w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}const margin=60,y=h/2,total=result.flat||1,scale=(w-margin*2)/total;let x=margin;ctx.lineWidth=26;ctx.strokeStyle='#45e38a';ctx.beginPath();ctx.moveTo(x,y);project.segments.forEach((s,i)=>{x+=s*scale;ctx.lineTo(x,y);if(i<project.bends.length){ctx.stroke();ctx.strokeStyle='#ffcc66';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y-55);ctx.lineTo(x,y+55);ctx.stroke();ctx.fillStyle='#ffcc66';ctx.fillText(`P${i+1}`,x-8,y-68);ctx.strokeStyle='#45e38a';ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(x,y)}});ctx.stroke();ctx.fillStyle='#eaf2ff';ctx.font='18px system-ui';ctx.fillText(`Desarrollo total: ${result.flat.toFixed(2)} mm`,30,38);ctx.fillStyle='#8fa6c7';ctx.font='14px system-ui';ctx.fillText('Líneas amarillas = plegados · Base local Mecos',30,65)}
function drawPreview(){drawFlat($('preview').getContext('2d'),$('preview').width,$('preview').height)}
function polylineForStep(step){let pts=[[0,0]],ang=0;for(let i=0;i<project.segments.length;i++){let len=project.segments[i];let last=pts[pts.length-1];pts.push([last[0]+Math.cos(ang)*len,last[1]-Math.sin(ang)*len]);if(i<step&&i<project.bends.length){let b=project.bends[i];let delta=(180-b.angle)*Math.PI/180*(b.direction==='up'?1:-1);ang+=delta;}}return pts}
function drawSim(){const c=$('simCanvas'),ctx=c.getContext('2d'),step=+$('simStep').value||0;ctx.fillStyle='#071426';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='rgba(255,255,255,.08)';for(let x=0;x<c.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,c.height);ctx.stroke()}const pts=polylineForStep(step);let xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);let scale=Math.min((c.width-160)/(maxX-minX||1),(c.height-160)/(maxY-minY||1),4);let ox=c.width/2-(minX+maxX)/2*scale,oy=c.height/2-(minY+maxY)/2*scale;ctx.lineWidth=18;ctx.lineCap='round';ctx.strokeStyle='#45e38a';ctx.beginPath();pts.forEach((p,i)=>{let x=ox+p[0]*scale,y=oy+p[1]*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke();for(let i=1;i<pts.length-1;i++){let x=ox+pts[i][0]*scale,y=oy+pts[i][1]*scale;ctx.fillStyle=i<=step?'#ffcc66':'#6f7d96';ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#00d1ff';ctx.fillRect(c.width/2-110,c.height-60,220,16);ctx.fillStyle='#6c5cff';ctx.beginPath();ctx.moveTo(c.width/2-65,c.height-170);ctx.lineTo(c.width/2+65,c.height-170);ctx.lineTo(c.width/2,c.height-105);ctx.closePath();ctx.fill();ctx.fillStyle='#eaf2ff';ctx.font='18px system-ui';ctx.fillText(`Paso ${step} de ${project.bends.length}`,30,38);ctx.fillStyle='#8fa6c7';ctx.font='14px system-ui';ctx.fillText(step===0?'Pieza en plano':`Aplicados ${step} plegado(s)`,30,64)}
function report(){return `PLEGAR PRO BETA MECOS - INFORME\n\nProyecto: ${project.projectName}\nCliente: ${project.clientName}\nMáquina: ${result.machine?.name||'Bystronic Xpert 3100 / 100T'}\nMaterial: ${result.mat.name}\nEspesor: ${project.thickness} mm\nAncho/longitud de plegado: ${project.bendLength} mm\n\nDESARROLLO\nAlas: ${project.segments.join(' + ')} mm\nPlegados: ${project.bends.length}\nDesarrollo plano total: ${result.flat.toFixed(3)} mm\n\nMEJOR ORDEN DE PLEGADO\n${getBestSequence().map((o,idx)=>`${idx+1}. Plegado ${o.r.index} (${o.r.b.side==='exterior'?'exterior':'interior'})`).join('\n')}\n\nÚTILES RECOMENDADOS\n${result.bendResults.map(r=>`Plegado ${r.index}: ${r.rec.p.name} + ${r.rec.d.name} · BA ${r.ba.toFixed(3)} mm · ${r.tons.toFixed(1)} T`).join('\n')}\n\nCOSTE\nTotal estimado: ${result.totalCost.toFixed(2)} €\nUnitario: ${(result.totalCost/project.quantity).toFixed(2)} €/ud\n\nVALIDACIÓN\n${result.issues.length?result.issues.map(x=>'- '+x).join('\n'):'Sin avisos críticos.'}\n\nNota: base Mecos demostrativa/local editable para beta. Validar con catálogo real antes de fabricar.`}
function renderReport(){$('reportText').value=report()}
function download(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
function saveProject(){readForm();localStorage.setItem('ppProjectMecos',JSON.stringify(project));$('lastSaved').textContent='Guardado: '+new Date().toLocaleTimeString();toast('Proyecto guardado')}
function exportJson(){readForm();download('plegar-pro-beta-mecos.json',JSON.stringify({project,db,calculation:result,exportedAt:new Date().toISOString()},null,2),'application/json');toast('Proyecto exportado')}
function addDb(){const type=$('dbType').value,name=$('dbName').value.trim(),a=+$('dbA').value,b=+$('dbB').value;if(!name)return toast('Escribe un nombre');const id='MECOS-'+name.toUpperCase().replace(/[^A-Z0-9]+/g,'-')+'-'+Math.floor(Math.random()*999);if(type==='materials')db.materials.push({id,name,density:7.85,tensile:a||400,yield:200,k:.42,price:b||2,minRadiusFactor:1});if(type==='punches')db.punches.push({id,brand:'Mecos',name,angle:a||88,radius:b||1,height:140,maxTonsM:100,type:'personalizado'});if(type==='dies')db.dies.push({id,brand:'Mecos',name,v:a||12,angle:86,minT:.5,maxT:b||3,maxTonsM:120});if(type==='machines'){db.machines=db.machines||[];db.machines.push({id,brand:'Personalizada',name,model:name,year:new Date().getFullYear(),length:a||3100,tons:b||100,tonsPerM:((b||100)/((a||3100)/1000)),axes:'Configurable',control:'Demo',notes:'Añadida por usuario'})}saveDb();fillSelects();writeForm();calc();toast('Añadido a la base local')}

function normalizeImportedProject(data){
 const next=clone(project);
 if(data.projectName) next.projectName=data.projectName;
 if(data.clientName) next.clientName=data.clientName;
 if(data.materialId) next.materialId=data.materialId;
 if(data.thickness) next.thickness=+data.thickness;
 if(data.bendLength) next.bendLength=+data.bendLength;
 if(Array.isArray(data.segments)&&data.segments.length>=2) next.segments=data.segments.map(Number).filter(x=>x>0);
 if(Array.isArray(data.bends)&&data.bends.length){
   next.bends=data.bends.map(b=>({angle:+b.angle||90,radius:+b.radius||next.thickness,direction:b.direction||'up',side:b.side||'interior'}));
 }
 while(next.segments.length<next.bends.length+1) next.segments.push(50);
 if(next.segments.length>next.bends.length+1) next.segments=next.segments.slice(0,next.bends.length+1);
 next.toolMode='auto';
 return next;
}
function parseCsvPlan(txt){
 const lines=txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
 let seg=[],bends=[],meta={};
 lines.forEach((line,idx)=>{
   const c=line.split(/[;,]/).map(x=>x.trim());
   const key=(c[0]||'').toLowerCase();
   if(key==='project' || key==='proyecto') meta.projectName=c[1]||'Plano importado';
   if(key==='material') meta.materialId=c[1]||project.materialId;
   if(key==='thickness' || key==='espesor') meta.thickness=+c[1]||project.thickness;
   if(key==='bendlength' || key==='ancho') meta.bendLength=+c[1]||project.bendLength;
   if(key==='segment' || key==='ala') seg.push(+c[1]||50);
   if(key==='bend' || key==='plegado') bends.push({angle:+c[1]||90,radius:+c[2]||project.thickness,direction:c[3]||'up',side:c[4]||'interior'});
   if(idx===0 && c.every(x=>!isNaN(+x))){ seg=c.map(Number).filter(x=>x>0); }
 });
 return {...meta,segments:seg.length?seg:project.segments,bends:bends.length?bends:project.bends};
}
function parseDxfLite(txt){
 const nums=[...txt.matchAll(/(?:LENGTH|SEGMENT|ALA)\s*[:= ]\s*(\d+(?:\.\d+)?)/gi)].map(m=>+m[1]);
 const bends=[...txt.matchAll(/(?:BEND|PLEGADO)\s*[:= ]\s*(\d+(?:\.\d+)?)(?:[,; ]+R(?:ADIUS)?\s*[:= ]?(\d+(?:\.\d+)?))?(?:[,; ]+(UP|DOWN|ARRIBA|ABAJO))?(?:[,; ]+(INTERIOR|EXTERIOR))?/gi)].map(m=>({angle:+m[1]||90,radius:+m[2]||project.thickness,direction:/down|abajo/i.test(m[3]||'')?'down':'up',side:/exterior/i.test(m[4]||'')?'exterior':'interior'}));
 return {projectName:'Plano DXF simplificado importado',segments:nums.length?nums:project.segments,bends:bends.length?bends:project.bends};
}
function importPlanText(txt,name='plano'){
 let data;
 try{data=JSON.parse(txt)}catch(e){ data=/\.dxf$/i.test(name)||/(SECTION|ENTITIES|PLEGADO|BEND)/i.test(txt)?parseDxfLite(txt):parseCsvPlan(txt); }
 project=normalizeImportedProject(data);
 writeForm();calc();runAiAnalysis();toast('Plano/cotas importadas y plegados generados');
}
function samplePlan(){
 const demo={projectName:'Plano importado demo',clientName:'Cliente IA',materialId:'S235',thickness:1.5,bendLength:780,segments:[35,80,120,60,45],bends:[{angle:90,radius:1.5,direction:'up',side:'interior'},{angle:30,radius:1,direction:'up',side:'interior'},{angle:90,radius:1.5,direction:'down',side:'exterior'},{angle:135,radius:2,direction:'up',side:'interior'}]};
 $('planText').value=JSON.stringify(demo,null,2); importPlanText($('planText').value,'demo.json');
}
function runAiAnalysis(){
 if(!result.bendResults) calc();
 const has30=project.bends.some(b=>b.angle<=45);
 const longest=Math.max(...project.segments);
 const bestSeq=getBestSequence().map(o=>'P'+o.r.index).join(' → ');
 aiNotes=[
   `IA local: mejor secuencia propuesta ${bestSeq}.`,
   has30?'Detectado plegado cerrado/30°: priorizar matriz Mecos 30° y punzón recto 30° H100 si el radio lo permite.':'No hay plegados cerrados: útiles estándar 86°/88° son suficientes.',
   longest>project.bendLength*0.25?'Hay alas largas: revisar interferencias y considerar pata de cabra si el plegado es interior.':'Geometría compacta: riesgo de interferencia bajo en esta beta.',
   result.issues?.length?`IA detecta ${result.issues.length} aviso(s). Revisar compatibilidad antes de fabricar.`:'IA no detecta avisos críticos con la base local.'
 ];
 renderAiPanel();
}
function renderAiPanel(){
 const box=$('aiResults'); if(!box) return;
 box.innerHTML=(aiNotes.length?aiNotes:['Pulsa “Analizar con IA” o importa un plano para generar recomendaciones.']).map(x=>`<div class="aiItem">${x}</div>`).join('');
 const fmt=$('importFormatHelp'); if(fmt) fmt.innerHTML='<b>Formatos admitidos:</b> JSON con segments/bends, CSV con líneas ALA;80 y PLEGADO;90;2;up;interior, o DXF simple con textos LENGTH/BEND.';
}

function initNav(){document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{document.querySelectorAll('.nav,.page').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.page).classList.add('active');$('pageTitle').textContent=pages[b.dataset.page][0];$('pageSub').textContent=pages[b.dataset.page][1];drawSim();drawPreview();})}
function initEvents(){document.querySelectorAll('input,select').forEach(e=>e.addEventListener('input',()=>calc()));$('calculateMain').onclick=()=>{calc();toast('Cálculo actualizado')};$('autoSelect').onclick=()=>{$('toolMode').value='auto';project.toolMode='auto';calc();toast('Útiles Mecos recomendados')};$('saveProject').onclick=saveProject;$('exportProject').onclick=exportJson;$('loadExample').onclick=()=>{project={projectName:'Caja inox multi-plegado',clientName:'Demo Taller',bendLength:650,thickness:2,quantity:12,machineRate:62,materialId:'INOX304',kFactor:.38,toolMode:'auto',punchId:'MECOS-P88-R10-H150',dieId:'MECOS-MV16-86',machineId:'BYSTRONIC-XPERT-3100-100-2006',segments:[70,120,80,45],bends:[{angle:90,radius:2,direction:'up',side:'interior'},{angle:90,radius:2,direction:'up',side:'interior'},{angle:90,radius:2,direction:'down',side:'exterior'}]};writeForm();calc();toast('Ejemplo multi-plegado cargado')};$('addBend').onclick=()=>{readBends();project.bends.push({angle:90,radius:project.thickness,direction:'up'});project.segments.push(50);renderBendEditor();calc();toast('Plegado añadido')};$('removeBend').onclick=()=>{if(project.bends.length>1){project.bends.pop();project.segments.pop();renderBendEditor();calc();toast('Último plegado eliminado')}};$('addDb').onclick=addDb;$('resetDb').onclick=()=>{db=clone(DEFAULT_DB);saveDb();fillSelects();writeForm();calc();toast('Base Mecos restaurada')};$('generateReport').onclick=()=>{renderReport();toast('Informe generado')};$('downloadReport').onclick=()=>download('informe-plegar-pro-beta-mecos.txt',report(),'text/plain');$('importProject').onclick=()=>{const f=$('importFile').files[0];if(!f)return toast('Selecciona un JSON');const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(data.db)db=data.db;if(data.project)project=data.project;saveDb();fillSelects();writeForm();calc();toast('Proyecto importado')}catch(e){toast('JSON no válido')}};r.readAsText(f)};if($('importPlanBtn'))$('importPlanBtn').onclick=()=>{const f=$('planFile').files[0];if(f){const r=new FileReader();r.onload=()=>importPlanText(r.result,f.name);r.readAsText(f)}else importPlanText($('planText').value||'', 'manual.csv')};if($('samplePlan'))$('samplePlan').onclick=samplePlan;if($('runAi'))$('runAi').onclick=()=>{runAiAnalysis();toast('IA local aplicada')};$('simStep').oninput=drawSim;$('prevStep').onclick=()=>{$('simStep').value=Math.max(0,+$('simStep').value-1);drawSim()};$('nextStep').onclick=()=>{$('simStep').value=Math.min(project.bends.length,+$('simStep').value+1);drawSim()};$('playSim').onclick=()=>{clearInterval(timer);$('simStep').value=0;timer=setInterval(()=>{let n=+$('simStep').value+1;if(n>project.bends.length){clearInterval(timer);return}$('simStep').value=n;drawSim()},700)}}
fillSelects();writeForm();initNav();initEvents();calc();
