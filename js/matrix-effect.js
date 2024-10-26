// Richiamo elemento DOM Canvas è il contesto 2d per l'effetto matrix
//Effetto Matrix preso da  https://www.w3schools.com/graphics/canvas_matrix.asp

const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

var secondShutdown = 0;
var loginBtn = document.getElementById("btnLogin");
var passwordText = document.getElementById("special-login-password");
var emailText = document.getElementById("special-login-email");
/*Oggetto Audio  per il suono di login e dell'animazione di spegnimento*/
var audioObj = {
      src:'./sound/sound.wav',
      type:'audio/wav',
      loop: false,
      volume: 1,
}
var audio = new Audio(audioObj.src);

// Altezza / Largezza Body
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;

// Imposta colore Canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

/*Algoritmo che definisce le colonne  e le righe per la griglia*/
//Codice Matrix preso da https://codepen.io/gnsp/pen/vYBQZJm
//Quello di spegnimento è stato creato dall' autore

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

function matrix () {
   
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);
  
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';
  
    
    ypos.forEach((y, ind) => {
      // generate a random character
      const text = String.fromCharCode(Math.random() * 128);
  
      // x coordinate of the column, y coordinate is already given
      const x = ind * 20;
      // render the character at (x, y)
      ctx.fillText(text, x, y);
  
      // randomly reset the end of the column if it's at least 100px high
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      // otherwise just move the y coordinate for the column 20px down,
      else ypos[ind] = y + 20;
      
    });
  }
  
  // render the animation at 20 FPS.
  const animazione = setInterval(matrix, 50);

  window.addEventListener('resize',() => {
    matrix();
  });

  var alpha = 0,   /// Valore alpha Corrente
      delta = 0.1; /// delta = velocità del fade effect

  function shutdownMatrix() {
    if(typeof matrix == 'function') {
        setTimeout(() => {
            clearInterval(animazione);
          }, 1000);
        ypos.forEach((y, ind) => {
            const textNone = "";
            ctx.font = '0pt monospace';
            ctx.fillStyle = '#000';
            const x = ind * 20;
            // render the character at (x, y)
            ctx.fillText(textNone, x, y);

            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y - 20;
              if (alpha <= 0 || alpha >= 1) delta = -delta;

              ctx.clearRect(0, 0, w, y);
              ctx.fillStyle = '#000';
              
              ctx.globalAlpha = delta;
              ctx.fillRect(0, 0, w, h);
          });
    }
  }
 
  

  loginBtn.addEventListener("click",() => { 
       var animShutdown = setInterval(() => {
           shutdownMatrix();
           secondShutdown++;
         if(secondShutdown >= 50) {
            audio.play();
            clearInterval(animShutdown);
            console.log("Shut-down Matrix");
          }
     }, secondShutdown);
  });


var flagState = false;
document.getElementById("id-eye").addEventListener("click",() => {
  if(flagState == false) {
    passwordText.setAttribute('type','text');
    flagState = true;
  }
  else {
    passwordText.setAttribute('type','password');
    flagState = false;
  }
});