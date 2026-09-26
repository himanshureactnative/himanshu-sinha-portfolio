const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
const links=[...nav.querySelectorAll('a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}})},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>observer.observe(s));

// Highlight the currently selected Google Play button. Only one stays selected.
const storeLinks=[...document.querySelectorAll('.store-link')];
storeLinks.forEach(link=>link.addEventListener('click',()=>{
  storeLinks.forEach(item=>item.classList.remove('selected'));
  link.classList.add('selected');
}));
