let noButtonState = 0;

const frasesNo = [
    "😳 Celeste… ese NO fue sospechoso",
    "😂 Celeste, tu dedo se equivocó",
    "🤨 Celeste… respuesta inválida",
    "😔 Celeste, el osito está triste",
    "🥺 Celeste… piensa en los abrazos",
    "💔 Celeste… mi corazón hizo crack",
    "🏳️ Celeste… el NO se rindió"
];

const question = document.getElementById("question");
const siBtn = document.getElementById("siBtn");
const noBtn = document.getElementById("noBtn");
const mainInterface = document.getElementById("mainInterface");
const yesInterface = document.getElementById("yesInterface");

const musicaSi = document.getElementById("musicaSi");
const musicaNo = document.getElementById("musicaNo");

const gifInicial = document.getElementById('gifContainer');
const sad1 = document.getElementById('sadGifContainer');
const sad2 = document.getElementById('sadGifContainer1');
const sad3 = document.getElementById('sadGifContainer2');
const imgNo1 = document.getElementById("imgNo1");
const imgNo2 = document.getElementById("imgNo2");

const happy1 = document.getElementById('happyGif1');
const happy2 = document.getElementById('happyGif2');
const happy3 = document.getElementById('happyGif3');
const happy4 = document.getElementById('happyGif4');

function ocultarGifsTristes() {
    gifInicial.style.display = "none";
    sad1.style.display = "none";
    sad2.style.display = "none";
    sad3.style.display = "none";
}

// BOTÓN NO
noBtn.addEventListener("click", () => {
    musicaNo.volume = 1;
    musicaNo.play();

    question.innerText = frasesNo[noButtonState % frasesNo.length];
    ocultarGifsTristes();

    if (noButtonState % 3 === 0) sad1.style.display = "block";
    if (noButtonState % 3 === 1) sad2.style.display = "block";
    if (noButtonState % 3 === 2) sad3.style.display = "block";

    if (noButtonState === 0) imgNo1.style.display = "block";
    if (noButtonState === 5) imgNo2.style.display = "block";

    // Mover botón NO asegurando que no se salga de la pantalla del celular
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);
    
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Achicar botón NO
    let scaleNo = 1 - noButtonState * 0.15;
    if (scaleNo < 0.3) scaleNo = 0.3;
    noBtn.style.transform = `scale(${scaleNo}) rotate(${noButtonState * 15}deg)`;

    // Agrandar botón SÍ (con un límite para que no rompa el celular)
    let fontSize = Math.min(22 + noButtonState * 8, 50); 
    let padY = Math.min(15 + noButtonState * 3, 30);
    let padX = Math.min(40 + noButtonState * 5, 80);

    siBtn.style.fontSize = `${fontSize}px`;
    siBtn.style.padding = `${padY}px ${padX}px`;

    noButtonState++;

    if (noButtonState >= 7) {
        noBtn.style.display = "none";
        siBtn.innerText = "SÍ 😳💖";
        question.innerText = "😏 El NO se fue… solo queda el SÍ";
    }
});

// BOTÓN SÍ
/* ... MANTÉN TODO TU JS ANTERIOR HASTA EL BOTÓN SÍ ... */

// MODIFICACIÓN DEL BOTÓN SÍ
siBtn.addEventListener("click", () => {
    musicaNo.pause();
    musicaNo.currentTime = 0;

    musicaSi.volume = 1;
    musicaSi.play();

    mainInterface.style.display = "none";
    yesInterface.style.display = "block";

    // Secuencia de GIFs de la portada
    setTimeout(() => { happy1.style.display = "none"; happy2.style.display = "block"; }, 1000);
    setTimeout(() => { happy2.style.display = "none"; happy3.style.display = "block"; }, 2000);
    setTimeout(() => { 
        happy3.style.display = "none"; 
        happy4.style.display = "block"; 
        
        // Al terminar los GIFs, mostramos el botón de la carta
        document.getElementById("btnCarta").style.display = "block";
    }, 2000);
});

// LÓGICA PARA ABRIR LA CARTA
document.getElementById("btnCarta").addEventListener("click", () => {
    // Escondemos la portada de celebración
    yesInterface.style.display = "none";
    // Mostramos la carta
    document.getElementById("cartaInterface").style.display = "block";
    
    // Opcional: Cambiar el fondo para que sea más romántico
    document.body.style.background = "linear-gradient(135deg, #fad0c4, #ffd1ff)";
});

