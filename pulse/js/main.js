// Pulse interactions
document.addEventListener('DOMContentLoaded',()=>{
  // Burger
  const burger=document.querySelector('.burger');
  const links=document.querySelector('.nav-links');
  if(burger)burger.addEventListener('click',()=>links.classList.toggle('open'));

  // Availability checker
  const checkBtn=document.getElementById('checkBtn');
  if(checkBtn){
    checkBtn.addEventListener('click',()=>{
      const res=document.getElementById('checkResult');
      const type=document.getElementById('deskType').value;
      const count=Math.floor(Math.random()*20)+3;
      res.innerHTML=`<span class="check-result-big">${count} ${type}</span> available right now — book instantly`;
      res.classList.add('show');
    });
  }

  // Team size calculator
  const slider=document.getElementById('teamSlider');
  const valEl=document.getElementById('teamVal');
  const planEl=document.getElementById('recPlan');
  const priceEl=document.getElementById('recPrice');
  if(slider){
    const calc=()=>{
      const n=+slider.value;
      valEl.textContent=n;
      let plan,rate;
      if(n<=1){plan='Hot Desk';rate=199}
      else if(n<=3){plan='Dedicated Desks';rate=349}
      else if(n<=10){plan='Private Office';rate=699}
      else{plan='Enterprise Suite';rate=1299}
      planEl.textContent=plan;
      priceEl.textContent='$'+(rate*n).toLocaleString()+' / month';
    };
    slider.addEventListener('input',calc);calc();
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(c=>{
    c.addEventListener('click',()=>{
      document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
    });
  });
});
