// Atlas — interactions
document.addEventListener('DOMContentLoaded',()=>{

  // Sticky nav shadow
  const nav=document.querySelector('.nav');
  if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>20));

  // Burger
  const burger=document.querySelector('.burger');
  const links=document.querySelector('.nav-links');
  if(burger) burger.addEventListener('click',()=>links.classList.toggle('open'));

  // Mortgage calculator
  const calcBtn=document.getElementById('calcBtn');
  if(calcBtn){
    calcBtn.addEventListener('click',()=>{
      const price=parseFloat(document.getElementById('loanAmt').value)||400000;
      const down=parseFloat(document.getElementById('downPay').value)||80000;
      const rate=parseFloat(document.getElementById('intRate').value)||6.5;
      const years=parseInt(document.getElementById('loanTerm').value)||30;
      const principal=price-down;
      const r=rate/100/12;
      const n=years*12;
      const monthly=r>0?principal*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1):principal/n;
      const totalPaid=monthly*n;
      const totalInt=totalPaid-principal;
      const res=document.getElementById('calcResult');
      document.getElementById('monthlyPay').textContent='$'+Math.round(monthly).toLocaleString();
      document.getElementById('calcDetail').innerHTML=
        'Principal: $'+principal.toLocaleString()+'<br>'+
        'Total interest: $'+Math.round(totalInt).toLocaleString()+'<br>'+
        'Total paid: $'+Math.round(totalPaid).toLocaleString();
      res.classList.add('show');
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip,.filter-btn').forEach(c=>{
    c.addEventListener('click',()=>{
      c.parentElement.querySelectorAll('.filter-chip,.filter-btn').forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
    });
  });

  // Listing fav toggle
  document.querySelectorAll('.listing-fav').forEach(f=>{
    f.addEventListener('click',e=>{
      e.preventDefault();
      f.textContent=f.textContent==='♡'?'♥':'♡';
    });
  });
});
