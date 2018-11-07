// JavaScript Document
function toggle_div_fun(id) {

       var divelement = document.getElementById(id);

       if(divelement.style.display == 'none'){
          divelement.style.display = 'block';
	      document.getElementById("rotate").style.right = "358px";}
       else{
          divelement.style.display = 'none';
		  document.getElementById("rotate").style.right = "0px";
    } }


//skriv noter i alle dokumenter til hvad der reelt skal gøres for at implementere peekabooen rigtigt) 