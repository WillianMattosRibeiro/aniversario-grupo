// =============================================
// ANIVERSARIANTES DO GRUPO DOS CASAIS
// JavaScript principal - Versão com vídeos locais
// =============================================

function initTailwind() {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    'title': ['Poppins', 'system-ui', 'sans-serif']
                }
            }
        }
    };
}

const aniversariantes = [
    { nome: "teste", dia: 3, mes: 6 },
    { nome: "Isis", dia: 7, mes: 2 },
    { nome: "Rafael", dia: 19, mes: 2 },
    { nome: "Dudu", dia: 13, mes: 3 },
    { nome: "Márcia", dia: 15, mes: 3 },
    { nome: "Michael", dia: 22, mes: 3 },
    { nome: "Anna Julia", dia: 24, mes: 3 },
    { nome: "Bruna", dia: 29, mes: 3 },
    { nome: "Jaqueline", dia: 2, mes: 4 },
    { nome: "João Pedro", dia: 23, mes: 4 },
    { nome: "Rodrigo", dia: 28, mes: 5 },
    { nome: "Fabiana", dia: 30, mes: 5 },
    { nome: "Priscila", dia: 20, mes: 6 },
    { nome: "Eliza", dia: 10, mes: 7 },
    { nome: "Luciana", dia: 1, mes: 8 },
    { nome: "Fabiano", dia: 19, mes: 8 },
    { nome: "Isa", dia: 26, mes: 8 },
    { nome: "Lian", dia: 1, mes: 9 },
    { nome: "Celso", dia: 19, mes: 9 },
    { nome: "Juliana", dia: 16, mes: 10 },
    { nome: "Will", dia: 19, mes: 10 },
    { nome: "Arthur", dia: 12, mes: 11 },
    { nome: "Maria", dia: 23, mes: 12 },
    { nome: "Ana Beatriz", dia: 28, mes: 12 }
];

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
               "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function getVideoKey(nome, ano) {
    return `video_${nome.toLowerCase().replace(/\s+/g, '')}_${ano}`;
}

function getRandomVideoForPerson(nome, ano) {
    const key = getVideoKey(nome, ano);
    let videoNum = localStorage.getItem(key);
    
    if (!videoNum) {
        videoNum = Math.floor(Math.random() * 8) + 1; // 1 a 8
        localStorage.setItem(key, videoNum);
    }
    
    return `assets/parabens-${videoNum}.mp4`;
}

function getAniversariantesDoDia(dia, mes) {
    return aniversariantes.filter(a => a.dia === dia && a.mes === mes);
}

function getProximoAniversario() {
    const hoje = new Date();
    let proximo = null;
    let menorDiff = Infinity;

    aniversariantes.forEach(a => {
        let dataProx = new Date(hoje.getFullYear(), a.mes - 1, a.dia);
        if (dataProx < hoje) {
            dataProx.setFullYear(dataProx.getFullYear() + 1);
        }
        const diff = dataProx.getTime() - hoje.getTime();
        if (diff < menorDiff && diff > 0) {
            menorDiff = diff;
            proximo = { 
                ...a, 
                dias: Math.ceil(diff / (1000 * 60 * 60 * 24)),
                data: dataProx 
            };
        }
    });
    
    const hojeAniv = getAniversariantesDoDia(hoje.getDate(), hoje.getMonth() + 1);
    if (hojeAniv.length > 0) {
        return { 
            ...hojeAniv[0],
            nomes: hojeAniv.map(a => a.nome).join(" e "),
            dias: 0 
        };
    }
    
    return proximo;
}

function getAniversariantesOrdenados() {
    const hoje = new Date();
    return aniversariantes.map(a => {
        let dataProx = new Date(hoje.getFullYear(), a.mes - 1, a.dia);
        if (dataProx < hoje) dataProx.setFullYear(dataProx.getFullYear() + 1);
        
        return {
            ...a,
            diasAte: Math.ceil((dataProx.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)),
            proximaData: dataProx
        };
    }).sort((x, y) => x.diasAte - y.diasAte);
}

function renderCurrentDate() {
    const el = document.getElementById('currentDateHeader');
    const hoje = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    let str = hoje.toLocaleDateString('pt-BR', options);
    el.innerHTML = str.charAt(0).toUpperCase() + str.slice(1);
}

function renderStatus() {
    const container = document.getElementById('statusSection');
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    
    const aniversHoje = getAniversariantesDoDia(diaHoje, mesHoje);
    const proximo = getProximoAniversario();

    if (aniversHoje.length > 0) {
        const nomes = aniversHoje.map(a => a.nome).join(" e ");
        container.innerHTML = `
            <div class="relative bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-400 text-white rounded-3xl p-9 md:p-12 shadow-2xl overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(#ffffff15_0.8px,transparent_1px)] bg-[length:5px_5px]"></div>
                <div class="absolute top-6 right-8 text-[120px] opacity-10">🎉</div>
                <div class="absolute bottom-4 left-6 text-[90px] opacity-10">🎈</div>
                
                <div class="relative z-10 text-center">
                    <div class="flex justify-center gap-x-2 mb-5">
                        <div class="text-6xl md:text-7xl animate-bounce">🎂</div>
                        <div class="text-6xl md:text-7xl">🥳</div>
                    </div>
                    <div class="uppercase tracking-[4px] text-xs font-extrabold text-white/70 mb-1">HOJE É UM DIA ESPECIAL</div>
                    <h1 class="text-6xl md:text-7xl font-extrabold tracking-tighter mb-3 leading-none">PARABÉNS!</h1>
                    <p class="text-3xl md:text-4xl font-semibold mb-7 tracking-tight">${nomes}</p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onclick="openCelebrationModal()" 
                                class="group px-9 py-4 bg-white text-pink-600 hover:bg-yellow-100 font-extrabold text-xl rounded-2xl flex items-center justify-center gap-x-3 shadow-xl active:scale-[0.985] transition-all">
                            <i class="fa-solid fa-play text-lg group-hover:scale-125 transition-transform"></i>
                            <span>TOCAR PARABÉNS</span>
                        </button>
                        <button onclick="launchConfetti()" 
                                class="px-7 py-4 bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold rounded-2xl flex items-center gap-x-2 border border-white/40 transition-all active:scale-95">
                            <i class="fa-solid fa-magic"></i>
                            <span>Lançar confete!</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => launchConfetti(), 900);
        setTimeout(() => openCelebrationModal(), 1600);
        
    } else {
        const dataFormatada = `${proximo.dia} de ${meses[proximo.mes - 1]}`;
        
        container.innerHTML = `
            <div class="bg-white border border-pink-100 rounded-3xl p-8 md:p-9 shadow-xl modern-shadow">
                <div class="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div class="flex-1">
                        <div class="flex items-center gap-x-2 mb-3">
                            <span class="px-4 py-1 text-xs font-extrabold tracking-widest bg-yellow-100 text-yellow-600 rounded-2xl">HOJE • ${new Date().toLocaleDateString('pt-BR', {day: 'numeric', month: 'long'})}</span>
                        </div>
                        <h2 class="text-4xl font-extrabold text-gray-800 tracking-tight">Nenhum aniversário hoje</h2>
                        <div class="mt-4">
                            <div class="text-xl text-gray-600">O próximo aniversário é de</div>
                            <div class="mt-1 flex items-baseline gap-x-3">
                                <span class="font-extrabold text-4xl text-purple-600">${proximo.nome}</span>
                            </div>
                            <div class="mt-1 flex items-center gap-x-2 text-lg">
                                <span class="font-semibold text-gray-700">${dataFormatada}</span>
                                <span class="inline-flex items-center px-3.5 py-px rounded-2xl text-sm font-bold bg-pink-100 text-pink-600">
                                    <i class="fa-solid fa-clock mr-1.5 text-xs"></i> 
                                    Faltam ${proximo.dias} dias
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <button onclick="goToNextBirthday()" 
                                class="w-full lg:w-auto group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all active:scale-[0.985] text-white font-extrabold rounded-2xl flex items-center justify-center gap-x-3 shadow-xl text-base">
                            <span>Ver no Calendário</span>
                            <i class="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Inicia música de fundo (grilo.mp3) automaticamente quando NÃO é aniversário
        setTimeout(() => startBackgroundMusic(), 800);
    }
}

function renderCalendar() { /* mantido igual ao anterior */ 
    // ... (mesmo código do renderCalendar anterior - omitido por brevidade)
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    const titleEl = document.getElementById('calendarTitle');
    titleEl.textContent = `${meses[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = `h-16 md:h-[88px] bg-gray-50/70 border border-gray-100 rounded-2xl`;
        grid.appendChild(empty);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('div');
        const isToday = (currentYear === today.getFullYear() && currentMonth === today.getMonth() && d === today.getDate());
        const anivers = getAniversariantesDoDia(d, currentMonth + 1);
        const hasBirthday = anivers.length > 0;
        
        let classes = `h-16 md:h-[88px] border flex flex-col items-center justify-center rounded-2xl cursor-pointer calendar-day `;
        if (hasBirthday) classes += `birthday-day border-transparent text-white`;
        else if (isToday) classes += `bg-yellow-50 border-yellow-300 ring-2 ring-yellow-300 ring-offset-2`;
        else classes += `bg-white border-gray-200 hover:border-pink-200`;
        
        dayEl.className = classes;
        
        if (hasBirthday) {
            dayEl.innerHTML = `
                <div class="text-center">
                    <div class="day-number ${isToday ? 'text-white' : ''}">${d}</div>
                    <div class="mt-px"><span class="text-base">🎂</span></div>
                    <div class="text-[10px] font-semibold tracking-tight px-1 truncate max-w-[68px] text-center leading-none mt-0.5">
                        ${anivers[0].nome}
                    </div>
                </div>
            `;
            dayEl.onclick = () => showDayModal(d, currentMonth + 1, anivers);
        } else {
            dayEl.innerHTML = `<div class="text-center"><div class="day-number ${isToday ? 'text-yellow-600' : 'text-gray-700'}">${d}</div></div>`;
        }
        grid.appendChild(dayEl);
    }
}

function showDayModal(dia, mes, pessoas) {
    // ... (mantido similar)
    const modal = document.getElementById('dayModal');
    const namesContainer = document.getElementById('modalNames');
    const dateEl = document.getElementById('modalDate');
    
    dateEl.innerHTML = `${dia} de ${meses[mes - 1]}`;
    
    let html = '';
    pessoas.forEach(p => {
        html += `
            <div class="mb-6 last:mb-0">
                <div class="flex justify-center mb-3">
                    <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-inner">
                        <span class="text-white text-6xl">🎂</span>
                    </div>
                </div>
                <div class="text-center">
                    <div class="font-extrabold text-3xl text-gray-800">${p.nome}</div>
                    <div class="text-pink-500 font-semibold">Feliz Aniversário!</div>
                </div>
            </div>
        `;
    });
    
    namesContainer.innerHTML = html;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeDayModal() {
    const modal = document.getElementById('dayModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// ====================== PLAYER DE VÍDEO LOCAL ======================

let currentVideoSrc = '';
let currentAniversariante = '';

function openCelebrationModal() {
    const modal = document.getElementById('playerModal');
    const videoEl = document.getElementById('celebrationVideo');
    const titleEl = document.getElementById('modalPlayerTitle');

    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    const aniversHoje = getAniversariantesDoDia(diaHoje, mesHoje);

    if (aniversHoje.length > 0) {
        currentAniversariante = aniversHoje[0].nome;
        currentVideoSrc = getRandomVideoForPerson(currentAniversariante, hoje.getFullYear());
        titleEl.textContent = `Parabéns, ${currentAniversariante}!`;
    } else {
        currentAniversariante = "Amigo(a)";
        currentVideoSrc = 'assets/parabens-1.mp4';
        titleEl.textContent = `Parabéns!`;
    }

    videoEl.src = currentVideoSrc;
    videoEl.load();

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Força autoplay
    setTimeout(() => {
        videoEl.muted = false;
        videoEl.play().catch(err => {
            console.log("Autoplay bloqueado:", err);
            // Tenta novamente sem som se falhar
            videoEl.muted = true;
            videoEl.play();
        });
    }, 300);
}

function closePlayerModal() {
    const modal = document.getElementById('playerModal');
    const videoEl = document.getElementById('celebrationVideo');
    
    videoEl.pause();
    videoEl.src = '';
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// ====================== MÚSICA DE FUNDO ======================

let backgroundAudio = null;

function startBackgroundMusic() {
    if (backgroundAudio) return;
    
    backgroundAudio = new Audio('assets/grilo.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.45;
    
    backgroundAudio.play().catch(e => {
        console.log('Autoplay bloqueado pelo navegador:', e);
    });
}

function stopBackgroundMusic() {
    if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio = null;
    }
}

// Confetti (mantido igual)
function launchConfetti() {
    const colors = ['#ec4899', '#c026d3', '#f59e0b', '#3b82f6', '#eab308'];
    const emojis = ['🎉', '🎈', '🎂', '🥳', '✨', '🎁'];
    
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const confetto = document.createElement('div');
            confetto.className = 'confetto';
            confetto.style.left = Math.random() * window.innerWidth + 'px';
            confetto.style.top = '-30px';
            confetto.style.fontSize = (Math.random() * 18 + 18) + 'px';
            confetto.style.opacity = Math.random() * 0.7 + 0.6;
            
            if (Math.random() > 0.35) {
                confetto.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            } else {
                confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetto.style.width = '9px';
                confetto.style.height = '9px';
                confetto.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            }
            
            document.body.appendChild(confetto);
            
            const duration = Math.random() * 2800 + 3800;
            const angle = Math.random() * 70 + 20;
            
            confetto.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: confetto.style.opacity },
                { transform: `translateY(${window.innerHeight + 120}px) rotate(${angle * (Math.random() > 0.5 ? 1 : -1)}deg)`, opacity: 0 }
            ], { duration, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' })
            .onfinish = () => confetto.remove();
        }, i * 1.1);
    }
}

// Inicialização
function init() {
    initTailwind();
    renderCurrentDate();
    renderStatus();
    renderCalendar();
    renderListaAniversariantes();
    renderProximoCard();
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const player = document.getElementById('playerModal');
            const day = document.getElementById('dayModal');
            if (!player.classList.contains('hidden')) closePlayerModal();
            else if (!day.classList.contains('hidden')) closeDayModal();
        }
    });
    
    console.log('%c[Aniversariantes] Site carregado com vídeos locais!', 'color:#c026d3');
}

window.onload = init;