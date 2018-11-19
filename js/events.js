// VARIABLER //

// Modal ID'er
var modal_1 = document.getElementById('modal1');
var modal_2 = document.getElementById('modal2');
var modal_3 = document.getElementById('modal3');

// Modal knapper
var btn_1 = document.getElementById("myBtn_1");
var btn_2 = document.getElementById("myBtn_2");
var btn_3 = document.getElementById("myBtn_3");

// <span>-elementer der lukker modalen
var kurvSpan = document.getElementById("close_kurv");
var span_1 = document.getElementById("close_1");
var span_2 = document.getElementById("close_2");
var span_3 = document.getElementById("close_3");

// Læg i kurv-knapper
var eventBestilBtn1 = document.getElementById('event1-input-antal-submit');
var eventBestilBtn2 = document.getElementById('event2-input-antal-submit');
var eventBestilBtn3 = document.getElementById('event3-input-antal-submit');

// Input-felt til antallet af billetter der skal bestilles
var antalBilletter1 = document.getElementById('event1-input-antal');
var antalBilletter2 = document.getElementById('event2-input-antal');
var antalBilletter3 = document.getElementById('event3-input-antal');

// Indkøbskurv ID'er
var kurvModal = document.getElementById('kurvmodal');
var kurvVareAntal = document.getElementById('kurv-vare-antal');
var dankortFelt = document.getElementById('dankort-felt');
var kurvBtn = document.getElementById('kurvBtn');
var vareEntry = document.getElementsByClassName('vare')[0];
var vareDelete = document.getElementById("vare-delete");

// Indkøbskurv lister
// Fortsæt knap
var betalingBtn = document.getElementById('betaling-btn');
// Tilbage knap
var betalingBackBtn = document.getElementById('betaling-back-btn');
// Liste med varer i kurven
var vareListe = document.getElementById('vare-liste');
// Liste med login felter
var loginListe = document.getElementById('login-liste');
// Liste med valg af betalingsform
var betalingListe = document.getElementById('betalingsform-liste');
// Liste med købsbekræftelse
var betalingDone = document.getElementById('betalingdone-liste');

// Købsflow stadie (Hvor langt er man i købet)
var kurvState = 0;

// Antal varer i kurv-indikator
var antalVarerKurv = document.getElementById('varer-i-kurv');

// Besked til når kurven er tom
var tomKurvBesked = document.getElementById("tom-kurv-besked");

// Antal varer
var mineVarer = 0;


// FUNKTIONER //

// Funktioner til at åbne modalerne
btn_1.onclick = function () {
    modal_1.style.display = "block";
}
btn_2.onclick = function () {
    modal_2.style.display = "block";
}
btn_3.onclick = function () {
    modal_3.style.display = "block";
}

// Funktion til at åbne indkøbskurven og gå i gang med at opdatere antal varer
kurvBtn.onclick = function () {
    kurvModal.style.display = "block";
    refreshKurvAntal();
}

// Når der trykkes på <span> (x), luk modalen
span_1.onclick = function () {
    modal_1.style.display = "none";
}
span_2.onclick = function () {
    modal_2.style.display = "none";
}
span_3.onclick = function () {
    modal_3.style.display = "none";
}
kurvSpan.onclick = function () {
    kurvModal.style.display = "none";
}

// Opdater mine varer til det antal, der er blevet bestilt. Skjul varelisten, hvis den er tom.
function refreshKurvAntal() {
    kurvVareAntal.value = mineVarer;
    if (mineVarer < 1) {
        vareEntry.style.display = "none";
        dankortFelt.style.display = "none";
        tomKurvBesked.innerText = "Der er ingen varer i din kurv.";
    } else {
        vareEntry.style.display = "grid";
        tomKurvBesked.innerText = "";
    }
}

// Når der trykkes ved siden af modalen lukkes den
window.onclick = function (event) {
    if (event.target == modal_1) {
        modal_1.style.display = "none";
        eventBestilBtn1.style.backgroundColor = "darkorange";
        eventBestilBtn1.innerText = "Læg i kurv";
    }
    else if (event.target == modal_2) {
        modal_2.style.display = "none";
        eventBestilBtn2.style.backgroundColor = "darkorange";
        eventBestilBtn2.innerText = "Læg i kurv";
    }
    else if (event.target == modal_3) {
        modal_3.style.display = "none";
        eventBestilBtn3.style.backgroundColor = "darkorange";
        eventBestilBtn3.innerText = "Læg i kurv";
    }
    else if (event.target == kurvModal) {
        kurvModal.style.display = "none";
    }
}

// Funktionalitet til "Læg i kurv"-knapper.
eventBestilBtn1.onclick = function () {
    mineVarer += parseInt(antalBilletter1.value);
    eventBestilBtn1.style.backgroundColor = "green";
    eventBestilBtn1.innerText = "Lagt i kurv! ✓";
    putVarerIKurv();
}

eventBestilBtn2.onclick = function () {
    mineVarer += parseInt(antalBilletter2.value);
    eventBestilBtn2.style.backgroundColor = "green";
    eventBestilBtn2.innerText = "Lagt i kurv! ✓";
    putVarerIKurv();
}

eventBestilBtn3.onclick = function () {
    mineVarer += parseInt(antalBilletter3.value);
    eventBestilBtn3.style.backgroundColor = "green";
    eventBestilBtn3.innerText = "Lagt i kurv! ✓";
    putVarerIKurv();
}

// Ændr tallet i kurv-ikonet til antal varer
function putVarerIKurv() {
    antalVarerKurv.innerText = parseInt(mineVarer);
}

// Når en vare bliver slettet
vareDelete.onclick = function () {
    mineVarer = 0;
    refreshKurvAntal();
    putVarerIKurv();
}

// Købsflow
// Handlinger alt efter hvilket stadie købsflowet (kurvState) er i
function nextField() {
    if (kurvState == 0) {
        vareListe.style.left = "-100vw";
        loginListe.style.left = "0";
        betalingListe.style.left = "100vw";
    }
    else if (kurvState == 1) {
        vareListe.style.left = "-100vw";
        loginListe.style.left = "-100vw";
        betalingListe.style.left = "0vw";
    }
    else if (kurvState == 2) {
        dankortFelt.style.display = "block";
        vareListe.style.left = "0";
        loginListe.style.display = "none";
        betalingListe.style.display = "none";
        betalingBtn.innerText = "Betal >";
    }
    else if (kurvState == 3) {
        dankortFelt.style.display = "none";
        vareListe.style.display = "none";
        loginListe.style.display = "none";
        betalingListe.style.display = "none";
        betalingDone.style.display = "block";
        betalingBtn.innerText = "Luk vindue";
    }
    else if (kurvState == 4) {
        kurvModal.style.display = "none";
    }
}

// Når der trykkes på "Fortsæt"-knappen køres købsflowet, og der lægges +1 til købsflowets stadie (kurvState).
betalingBtn.onclick = function () {
    nextField();
    kurvState++;
}

// Når der trykkes tilbage
betalingBackBtn.onclick = function () {

}






/*

// Delay
  function delay(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


var modal_ = document.getElementById('myModal_'+i);
var btn_ = document.getElementById("myBtn_"+i);
var span_ = document.getElementById("close_"+i);



    for(i=1;i<4;i++) {
        document.getElementById("myBtn_"+i).onclick = function() {
                document.getElementById("modal"+i).style.display = "block";
                console.log(i);
        }();
        function lol() {

        }
    }
document.getElementById("close_"+i).onclick = function () {
    var d = i;
    document.getElementById("modal"+c).style.display = "none";
}
    /*
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal_1) {
            modal_1.style.display = "none";
        }
        else if(event.target == modal_2){
            modal_2.style.display = "none";
        }
        else if(event.target == modal_3){
            modal_3.style.display = "none";
        }
    }
*/

/*

for(i=1;i<=3;i++) {

    var span = document.getElementsByClassName("close")[i];
    // When the user clicks the button, open the modal
    document.getElementById("myBtn_"+i).onclick = function () {
        console.log(i);
        document.getElementById('myModal_'+i).style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        document.getElementById('myModal_'+i).style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == document.getElementById('myModal_'+i)) {
        document.getElementById('myModal_'+i).style.display = "none";
    }
    }
}

    */