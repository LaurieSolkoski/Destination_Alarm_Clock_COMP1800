// unblur map by clicking

$('.touch').click(function(){
    

    const child2 = document.getElementById('child2'); 
    const nav = document.getElementById('navbarPlaceholder');


    child2.style.removeProperty('filter');
    nav.style.setProperty('z-index', '3');
    nav.style.setProperty('right', '10');
    child2.style.setProperty('z-index', '2');
    
    console.log('clicked');
  });


