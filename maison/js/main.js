// Maison — interactions
document.addEventListener('DOMContentLoaded',()=>{

  // Sticky nav
  const nav=document.querySelector('.nav');
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',window.scrollY>60);
  });

  // Burger
  const burger=document.querySelector('.burger');
  const links=document.querySelector('.nav-links');
  if(burger)burger.addEventListener('click',()=>links.classList.toggle('open'));

  // Language toggle
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.lang-toggle button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  // Property value estimator
  const estBtn=document.getElementById('estBtn');
  if(estBtn){
    estBtn.addEventListener('click',()=>{
      const region=document.getElementById('estRegion').value;
      const size=+document.getElementById('estSize').value||120;
      const res=document.getElementById('estResult');
      const rates={'paris':12500,'cote-azur':9800,'provence':6200,'bordeaux':5400,'lyon':4800,'alps':7600};
      const rate=rates[region]||7000;
      const total=rate*size;
      const low=Math.round(total*.88);
      const high=Math.round(total*1.12);
      document.getElementById('estPrice').textContent=
        new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(total);
      document.getElementById('estRange').textContent=
        new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(low)+
        ' — '+
        new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(high);
      res.classList.add('show');
    });
  }

  // Lifestyle quiz
  document.querySelectorAll('.quiz-opt').forEach(opt=>{
    opt.addEventListener('click',()=>{
      document.querySelectorAll('.quiz-opt').forEach(x=>x.classList.remove('active'));
      opt.classList.add('active');
      const type=opt.dataset.type;
      const res=document.getElementById('quizResult');
      const data={
        city:{title:'L\'appartement parisien',desc:'A Haussmann apartment in the 6th or 7th arrondissement with period mouldings, herringbone parquet and a balcony overlooking a quiet boulevard. Your mornings start with croissants from the boulangerie downstairs.'},
        countryside:{title:'Le ch\u00e2teau en Provence',desc:'A restored 18th-century bastide surrounded by lavender fields and olive groves. Stone walls, a pool hidden among cypresses, and evenings on the terrace with ros\u00e9 from the domaine next door.'},
        coast:{title:'La villa sur la C\u00f4te',desc:'A contemporary villa perched above the M\u00e9diterran\u00e9e between Nice and Saint-Tropez. Infinity pool merging with the horizon, private steps to a rocky cove, and aperitivo light year-round.'}
      };
      if(data[type]){
        document.getElementById('quizTitle').textContent=data[type].title;
        document.getElementById('quizDesc').textContent=data[type].desc;
        res.classList.add('show');
      }
    });
  });

  // Filter chips
  document.querySelectorAll('.filter-btn').forEach(c=>{
    c.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
    });
  });
});
