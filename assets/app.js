(function(){var r=document.documentElement,b=document.getElementById('th');
if(b)b.addEventListener('click',function(){var d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dark(d)});
function dark(d){return d?'light':'dark'}
var q=document.getElementById('q');
if(q)q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();document.querySelectorAll('.cards li').forEach(function(li){li.classList.toggle('hide',!!v&&li.dataset.t.toLowerCase().indexOf(v)<0)})});
})();