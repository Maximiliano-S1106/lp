try{
document.documentElement.classList.add('js');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],wait=ms=>new Promise(r=>setTimeout(r,ms));
let flow='book',barber='Franco',run=0;
const F={
book:b=>[['u','Hola, quiero reservar con '+b+' para mañana'],['b','¡Hola! ¿Qué servicio quieres?<br>Corte $15.000 · Corte + barba $22.000 · Diseño $30.000'],['u','Corte + barba. ¿Tienes a las 14:30?'],['t'],['b','De 14:00 a 15:00 es la colación de '+b+'. Libres mañana: <b>13:00</b>, <b>15:00</b>, <b>16:30</b>'],['u','Resérvame las 15:00'],['t'],['b','✅ <b>Reserva confirmada</b><br>'+b+' · mañana 15:00 · Corte + barba · $22.000'],['n',b+': nueva cita mañana 15:00 · Corte + barba']],
re:b=>[['u','Necesito cambiar mi cita de hoy con '+b],['b','Encontré tu cita: <b>hoy 11:00</b> con '+b+'. ¿Para cuándo la movemos?'],['u','Al viernes a las 16:00'],['t'],['b','El viernes 16:00 está libre. ¿Confirmo el cambio?'],['u','Sí, confirma'],['b','🔄 <b>Cita reagendada</b>: viernes 16:00. El cupo de hoy 11:00 quedó libre.'],['n',b+': cita movida a viernes 16:00 · 11:00 liberado']],
ca:b=>[['u','Quiero cancelar mi cita de mañana'],['b','Tengo <b>mañana 10:00</b> con '+b+'. ¿Confirmas la cancelación?'],['u','Sí, cancela'],['t'],['b','Cita cancelada. El horario ya está disponible para otros clientes.'],['n',b+': cita cancelada · 10:00 libre en tiempo real']]};
async function play(){
 const id=++run,c=$('#chat');c.innerHTML='';$('#notif').classList.remove('on');
 for(const [k,x] of F[flow](barber)){
  if(id!==run)return;
  if(k==='n'){$('#notif span').textContent=x;$('#notif').classList.add('on');return}
  const d=document.createElement('div');d.className='msg m'+(k==='u'?' u':'');
  d.innerHTML=k==='t'?'<span class="dots"><i></i><i></i><i></i></span>':x;c.appendChild(d);c.scrollTop=c.scrollHeight;
  await wait(k==='t'?1100:k==='u'?900:1500);
  if(k==='t')d.remove();
 }}
$$('[data-flow]').forEach(b=>b.onclick=()=>{flow=b.dataset.flow;$$('[data-flow]').forEach(x=>x.classList.toggle('on',x===b));play()});
$$('[data-barber]').forEach(b=>b.onclick=()=>{barber=b.dataset.barber;$$('[data-barber]').forEach(x=>x.classList.toggle('on',x===b));play()});
$('#replay').onclick=play;
const count=el=>{const n=+el.dataset.n,t=performance.now();(function f(now){const p=Math.min((now-t)/1200,1);el.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(t)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
 if(e.target.id==='sim')play();e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}),{threshold:.2});
$$('.rv,#sim').forEach(e=>io.observe(e));
const bar=$('#bar');addEventListener('scroll',()=>{bar.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
}catch(e){document.documentElement.classList.remove('js');console.error(e)}
