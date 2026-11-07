(function(){
var N=[['A',60,50],['B',200,25],['C',340,60],['D',60,180],['E',200,160],['F',340,190]];
var E=[[0,1,4],[0,3,2],[1,2,5],[1,4,1],[2,5,3],[3,4,6],[4,5,7],[2,4,9]];
function adj(u){var r=[];E.forEach(function(e,i){if(e[0]==u)r.push([e[1],i,e[2]]);else if(e[1]==u)r.push([e[0],i,e[2]])});return r.sort(function(a,b){return a[0]-b[0]})}
function mk(){var s={ns:N.map(function(){return''}),es:E.map(function(){return''}),lab:N.map(function(){return''})},o=[];return{s:s,o:o,p:function(l,m){o.push({l:l,m:m,ns:s.ns.slice(),es:s.es.slice(),lab:s.lab.slice()})}}}
function nm(i){return N[E[i][0]][0]+N[E[i][1]][0]}
function bfs(){var m=mk(),s=m.s,q=[0],seen={0:1};s.ns[0]='q';m.p(0,'Empezamos en A: queda descubierto y entra a la cola.');
while(q.length){var u=q.shift();s.ns[u]='cur';m.p(1,'Sacamos '+N[u][0]+' de la cola y miramos sus vecinos.');
adj(u).forEach(function(a){var v=a[0];if(!seen[v]){seen[v]=1;q.push(v);s.ns[v]='q';s.es[a[1]]='tree';m.p(3,N[v][0]+' no estaba descubierto: entra a la cola y la arista pasa al árbol.')}else m.p(2,N[v][0]+' ya fue descubierto: se ignora.')});
s.ns[u]='done';m.p(1,N[u][0]+' terminado.')}
m.p(1,'Cola vacía: el árbol BFS está completo.');return m.o}
function dfs(){var m=mk(),s=m.s,seen={};function f(u){seen[u]=1;s.ns[u]='cur';m.p(1,'Visitamos '+N[u][0]+' (queda "en curso" mientras esté en la recursión).');
adj(u).forEach(function(a){var v=a[0];if(!seen[v]){s.es[a[1]]='tree';m.p(2,'Bajamos de '+N[u][0]+' a '+N[v][0]+'.');f(v);m.p(2,'Volvemos a '+N[u][0]+' y seguimos con sus vecinos.')}});
s.ns[u]='done';m.p(2,N[u][0]+' no tiene más vecinos nuevos: terminado.')}f(0);return m.o}
function dij(){var m=mk(),s=m.s,d=N.map(function(){return 1/0}),pe=[],dn={};d[0]=0;s.lab[0]='0';s.ns[0]='q';m.p(0,'d(A) = 0. Cada etiqueta es la mejor distancia conocida hasta ese nodo.');
for(var k=0;k<N.length;k++){var u=-1;d.forEach(function(x,i){if(!dn[i]&&x<1/0&&(u<0||x<d[u]))u=i});if(u<0)break;dn[u]=1;s.ns[u]='done';if(pe[u]!=null)s.es[pe[u]]='tree';
m.p(2,'Elegimos '+N[u][0]+' (d = '+d[u]+'): la menor distancia entre los nodos que faltan.');
adj(u).forEach(function(a){var v=a[0];if(dn[v])return;var nd=d[u]+a[2];if(nd<d[v]){d[v]=nd;pe[v]=a[1];s.lab[v]=''+nd;s.ns[v]='q';m.p(3,'Mejoramos d('+N[v][0]+') = '+d[u]+' + '+a[2]+' = '+nd+'.')}})}
m.p(1,'S = V: las etiquetas son las distancias mínimas desde A.');return m.o}
function prim(){var m=mk(),s=m.s,S={0:1},tot=0;s.ns[0]='done';m.p(0,'S = {A}.');
for(var k=1;k<N.length;k++){var c=[];E.forEach(function(e,i){if(!!S[e[0]]!=!!S[e[1]])c.push(i)});c.forEach(function(i){s.es[i]='cand'});
m.p(2,'Aristas que cruzan entre S y V−S (punteadas): '+c.map(function(i){return nm(i)+'='+E[i][2]}).join(', ')+'.');
var b=c.reduce(function(x,i){return E[i][2]<E[x][2]?i:x},c[0]);c.forEach(function(i){s.es[i]=''});s.es[b]='tree';var v=S[E[b][0]]?E[b][1]:E[b][0];S[v]=1;s.ns[v]='done';tot+=E[b][2];
m.p(3,'La más barata es '+nm(b)+' ('+E[b][2]+'): se agrega '+N[v][0]+' a S.')}
m.p(1,'S = V: árbol de recubrimiento mínimo de costo '+tot+'.');return m.o}
function kru(){var m=mk(),s=m.s,p=N.map(function(_,i){return i}),tot=0;function f(x){return p[x]==x?x:(p[x]=f(p[x]))}
var o=E.map(function(_,i){return i}).sort(function(a,b){return E[a][2]-E[b][2]});m.p(0,'Orden por costo: '+o.map(function(i){return nm(i)+'='+E[i][2]}).join(', ')+'.');
o.forEach(function(i){var a=f(E[i][0]),b=f(E[i][1]);s.es[i]='cur';m.p(1,'Miramos '+nm(i)+' (costo '+E[i][2]+').');
if(a!=b){p[a]=b;tot+=E[i][2];s.es[i]='tree';m.p(2,'Extremos en componentes distintas: se agrega y se unen.')}else{s.es[i]='rej';m.p(3,'Ya están conectados: crearía un ciclo, se descarta.')}});
m.p(1,'Fin: árbol de costo '+tot+'.');return m.o}
function msort(){var a=[5,2,8,1,9,3,7,4],o=[];function p(l,m,lo,hi){o.push({l:l,m:m,arr:a.slice(),lo:lo,hi:hi})}
function f(lo,hi){if(hi-lo<2)return;var mid=(lo+hi)>>1;p(2,'Dividimos las posiciones '+lo+'–'+(hi-1)+' en dos mitades.',lo,hi);f(lo,mid);f(mid,hi);
var L=a.slice(lo,mid),R=a.slice(mid,hi),i=0,j=0,k=lo;while(i<L.length||j<R.length)a[k++]=(j>=R.length||(i<L.length&&L[i]<=R[j]))?L[i++]:R[j++];
p(3,'Combinamos las dos mitades ya ordenadas (merge lineal) en '+lo+'–'+(hi-1)+'.',lo,hi)}
p(0,'Lista inicial.',0,0);f(0,a.length);p(1,'Lista ordenada. Hay log₂8 = 3 niveles y cada uno cuesta O(n).',0,0);return o}
var K={w:[2,3,4,5],v:[3,4,5,6]};
function knap(){var o=[],t=[],W=8,i,x;for(i=0;i<=4;i++){t.push([]);for(x=0;x<=W;x++)t[i].push(i==0||x==0?0:null)}
function p(l,m,c,d){o.push({l:l,m:m,t:t.map(function(r){return r.slice()}),cur:c,dep:d})}
p(0,'La fila 0 y la columna 0 valen 0 (sin ítems o sin capacidad).');
for(i=1;i<=4;i++)for(x=1;x<=W;x++){var wi=K.w[i-1],vi=K.v[i-1],a=t[i-1][x];
if(wi>x){t[i][x]=a;p(2,'El ítem '+i+' pesa '+wi+' > '+x+': no entra. Copiamos OPT['+(i-1)+']['+x+'] = '+a+'.',[i,x],[[i-1,x]])}
else{var b=vi+t[i-1][x-wi];t[i][x]=Math.max(a,b);p(3,'max( sin ítem '+i+': '+a+' ; con ítem '+i+': '+vi+' + OPT['+(i-1)+']['+(x-wi)+'] = '+b+' ) = '+t[i][x]+'.',[i,x],[[i-1,x],[i-1,x-wi]])}}
p(1,'Tabla completa: el valor óptimo con capacidad 8 es '+t[4][W]+'.',[4,W],[]);return o}
function rg(s){var h='<svg viewBox="0 0 400 230" role="img" aria-label="Grafo del ejemplo">';
E.forEach(function(e,i){var a=N[e[0]],b=N[e[1]];h+='<line class="e '+s.es[i]+'" x1="'+a[1]+'" y1="'+a[2]+'" x2="'+b[1]+'" y2="'+b[2]+'"/><text class="w" x="'+((a[1]+b[1])/2)+'" y="'+((a[2]+b[2])/2-5)+'">'+e[2]+'</text>'});
N.forEach(function(n,i){h+='<circle class="n '+s.ns[i]+'" cx="'+n[1]+'" cy="'+n[2]+'" r="18"/><text class="nt" x="'+n[1]+'" y="'+(n[2]+5)+'">'+n[0]+'</text>';if(s.lab[i])h+='<text class="lb" x="'+n[1]+'" y="'+(n[2]+34)+'">'+s.lab[i]+'</text>'});return h+'</svg>'}
function rb(s){var h='<div class="bars">';s.arr.forEach(function(v,i){h+='<div class="bar'+(i>=s.lo&&i<s.hi?' cur':'')+'" style="height:'+(v*14+14)+'px"><b>'+v+'</b></div>'});return h+'</div>'}
function rt(s){var h='<div class="tw"><table class="dp"><tr><th>Ítem \\ capacidad</th>';for(var w=0;w<=8;w++)h+='<th>'+w+'</th>';h+='</tr>';
s.t.forEach(function(r,i){h+='<tr><th>'+(i?i+' (peso '+K.w[i-1]+', valor '+K.v[i-1]+')':'0 (ninguno)')+'</th>';r.forEach(function(c,x){var k=s.cur&&s.cur[0]==i&&s.cur[1]==x?'cur':(s.dep&&s.dep.some(function(d){return d[0]==i&&d[1]==x})?'dep':'');h+='<td class="'+k+'">'+(c==null?'':c)+'</td>'});h+='</tr>'});return h+'</table></div>'}
var G='Grafo de ejemplo con 6 nodos. ',ALG={
bfs:{t:'BFS paso a paso',r:rg,run:bfs,c:['Descubierto[s] = true; L[0] = {s}','mientras L[i] no vacía:','  para cada u en L[i], cada arista (u, v):','    si !Descubierto[v]: marcar, T += (u,v), v a L[i+1]']},
dfs:{t:'DFS paso a paso',r:rg,run:dfs,c:['DFS(u):','  Explorado[u] = true','  para cada (u, v): si !Explorado[v]: DFS(v)']},
dij:{t:'Dijkstra paso a paso (desde A)',r:rg,run:dij,c:['d(s) = 0; S = {s}','mientras S ≠ V:','  elegir v ∉ S con menor d(u) + l_e, u ∈ S','  S += v; d(v) = d(u) + l_e']},
prim:{t:'Prim paso a paso (desde A)',r:rg,run:prim,c:['S = {s}; T = ∅','mientras S ≠ V:','  e = arista más barata entre S y V − S','  T += e; S += v']},
kru:{t:'Kruskal paso a paso',r:rg,run:kru,c:['ordenar aristas por costo creciente','para cada e = (u, v) en ese orden:','  si u y v en distinta componente: T += e; unir','  si no: descartar e (formaría un ciclo)']},
msort:{t:'MergeSort paso a paso',r:rb,run:msort,c:['Ordeno(L):','  si |L| ≤ 1: devolver L','  L1 = Ordeno(mitad izq); L2 = Ordeno(mitad der)','  devolver Combino(L1, L2)']},
knap:{t:'Mochila: llenado de la tabla (capacidad 8)',r:rt,run:knap,c:['OPT[0][x] = OPT[i][0] = 0','devolver OPT[n][W]','  si w_i > x: OPT[i][x] = OPT[i-1][x]','  si no: max(OPT[i-1][x], v_i + OPT[i-1][x-w_i])']}};
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
document.querySelectorAll('.anim').forEach(function(el){var A=ALG[el.dataset.a];if(!A)return;var st=A.run(),i=0,tm=null,q=function(s){return el.querySelector(s)};
el.innerHTML='<strong>'+A.t+'</strong><div class="stage"></div><div class="ctl"><button type="button" data-c="r">Reiniciar</button><button type="button" data-c="p">Anterior</button><button type="button" data-c="pl">Reproducir</button><button type="button" data-c="n">Siguiente</button><span class="cnt"></span></div><p class="msg" aria-live="polite"></p><div class="code">'+A.c.map(function(l,k){return'<div data-k="'+k+'">'+esc(l)+'</div>'}).join('')+'</div>';
function show(){var s=st[i];q('.stage').innerHTML=A.r(s);q('.msg').textContent=s.m;q('.cnt').textContent=(i+1)+' / '+st.length;el.querySelectorAll('.code div').forEach(function(d){d.classList.toggle('on',+d.dataset.k===s.l)})}
function stop(){clearInterval(tm);tm=null;q('[data-c=pl]').textContent='Reproducir'}
el.addEventListener('click',function(e){var c=e.target.dataset&&e.target.dataset.c;if(!c)return;
if(c=='n'){stop();if(i<st.length-1)i++}else if(c=='p'){stop();if(i>0)i--}else if(c=='r'){stop();i=0}
else{if(tm){stop();return}if(i>=st.length-1)i=0;e.target.textContent='Pausa';tm=setInterval(function(){if(i>=st.length-1){stop();return}i++;show()},1100)}show()});show()});
})();
