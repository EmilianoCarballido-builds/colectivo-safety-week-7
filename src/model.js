// Real k-nearest-neighbor inference; exclusively synthetic training examples.
export const training = [
 [0.10,22,8,'Movimiento habitual'],[0.15,26,10,'Movimiento habitual'],[0.22,20,4,'Movimiento habitual'],
 [0.76,34,9,'Frenado por revisar'],[0.85,38,8,'Frenado por revisar'],[0.69,30,12,'Frenado por revisar'],
 [0.12,18,410,'GPS sin señal reciente'],[0.20,22,380,'GPS sin señal reciente'],[0.08,16,460,'GPS sin señal reciente']
];
export function classify({accel,speed,age}) {
 if (![accel,speed,age].every(Number.isFinite) || accel<0 || accel>2 || speed<0 || speed>140 || age<0 || age>86400) throw Error('Lectura fuera de rango');
 const neighbors=training.map(([a,s,t,label])=>({label,d:((a-accel)/1)**2+((s-speed)/60)**2+((t-age)/600)**2})).sort((a,b)=>a.d-b.d).slice(0,3);
 const counts={}; neighbors.forEach(n=>counts[n.label]=(counts[n.label]||0)+1);
 const label=Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0];
 return {label,agreement:Math.round(counts[label]/3*100),priority:label==='Movimiento habitual'?'Rutina':'Revisar hoy',model:'kNN-3 · entrenamiento sintético v1'};
}
export const route=[[-99.276,19.476],[-99.271,19.474],[-99.267,19.472],[-99.262,19.471],[-99.258,19.469],[-99.253,19.468],[-99.249,19.465],[-99.244,19.463],[-99.241,19.459],[-99.238,19.456]];
export const contexts=['Bache reportado por conductor','Peatón cruzó la vía','Teléfono suelto en soporte','Sin contexto suficiente'];
export const outcomes=['Registrar contexto','Solicitar revisión de equipo'];
export function initial(now=Date.now()) {
 const s={version:1,online:true,units:Array.from({length:10},(_,i)=>({id:`C-${String(i+1).padStart(2,'0')}`,device:`SIM-${i+1}`,shift:'Mañana',ready:i!==8,relief:true})),events:[],pending:[],audit:[],funded:true,misuse:false,weeks:[{scheduled:400,usable:384,priority:20,sameDay:19},{scheduled:400,usable:382,priority:20,sameDay:18}]};
 [0,1,2,3].forEach((n)=>{let e=sample(s,n%3,now-(n*7+2)*60000); e.unit=s.units[n].id; e.shared=n<3;e.receivedAt=e.createdAt;e.context='';s.events.push(e);});
 return s;
}
export function sample(s,kind=0,now=Date.now()) {
 const profiles=[{accel:0.78,speed:34,age:12},{accel:0.12,speed:19,age:420},{accel:0.16,speed:23,age:8}];
 const sensor=profiles[kind]; if(!sensor)throw Error('Escenario inválido');
 const i=(s.events.length+s.pending.length)%s.units.length;
 return {id:`E-${now}-${s.events.length+s.pending.length}`,unit:s.units[i].id,createdAt:now,receivedAt:null,shared:false,sensor,position:route[i%route.length],...classify(sensor),status:'Nueva',context:'',firstReviewer:null,secondReviewer:null};
}
export function generate(s,kind,now=Date.now()) {const e=sample(s,kind,now);if(s.online){e.receivedAt=now;s.events.unshift(e);}else{s.pending.push(e);}return e;}
export function sync(s,now=Date.now()) {s.online=true;for(const e of s.pending){if(!s.events.some(x=>x.id===e.id)){e.receivedAt=now;s.events.unshift(e);}}s.pending=[];}
export function act(s,id,action,role,value,now=Date.now()) {
 const e=s.events.find(x=>x.id===id);if(!e)throw Error('Registro inexistente');
 if(action==='share'){if(role!=='Titular'||!e.receivedAt)throw Error('Primero debe recibirlo el titular');e.shared=true;}
 else if(action==='review'){
  if(!['Despacho A','Despacho B'].includes(role)||!e.shared||e.status!=='Nueva')throw Error('Revisión no disponible');
  if(!contexts.includes(value?.context)||!outcomes.includes(value?.outcome))throw Error('Selecciona contexto y resultado');
  e.context=value.context;e.firstReviewer=role;e.reviewedAt=now;
  e.status=value.outcome==='Solicitar revisión de equipo'?'Segunda revisión':'Cerrada';
 } else if(action==='approve'||action==='return'){
  if(!['Despacho A','Despacho B'].includes(role)||e.firstReviewer===role||e.status!=='Segunda revisión')throw Error('Se requiere otra persona revisora');
  e.secondReviewer=role;e.status=action==='approve'?'Apoyo acordado':'Nueva';
 } else if(action==='reopen') {if(role!=='Titular'||!['Cerrada','Apoyo acordado'].includes(e.status))throw Error('El titular puede reabrir un caso cerrado');e.status='Nueva';e.firstReviewer=null;e.secondReviewer=null;}
 else throw Error('Acción inválida');
 s.audit.unshift({id:e.id,action,role,at:now});
}
export function visible(s,role){return role==='Titular'?s.events:s.events.filter(e=>e.shared);}
export function onboard(s,{number,shift,checks}){
 if(!Number.isInteger(number)||number<1||number>25||!['Mañana','Tarde'].includes(shift)||checks!==7)throw Error('Completa las siete verificaciones');
 const id=`C-${String(number).padStart(2,'0')}`;if(s.units.some(u=>u.id===id))throw Error('Esta unidad ya está registrada');
 s.units.push({id,device:`SIM-${number}`,shift,ready:true,relief:true});return id;
}
export function gate(s){
 const rows=s.weeks.map(w=>({...w,availability:w.scheduled?w.usable/w.scheduled:null,review:w.priority?w.sameDay/w.priority:null}));
 const failed=w=>w.availability!==null&&w.review!==null&&(w.availability<.95||w.review<.9);
 const pause=!s.funded||s.misuse||rows.slice(-2).every(failed);
 return {rows,pause,reason:!s.funded?'Soporte sin fondos':s.misuse?'Uso indebido sin resolver':pause?'Dos semanas bajo los umbrales':'Revisar preparación antes de ampliar'};
}
export function save(s,storage=localStorage){storage.setItem('colectivo-demo-v1',JSON.stringify(s));}
export function load(storage=localStorage){try{const s=JSON.parse(storage.getItem('colectivo-demo-v1'));if(s?.version===1&&Array.isArray(s.events)&&Array.isArray(s.units)&&Array.isArray(s.pending))return s;}catch{}return initial();}
