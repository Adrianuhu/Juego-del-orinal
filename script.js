document.addEventListener('DOMContentLoaded', (event) => {
    const orinalsContainer = document.getElementById('orinals');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    
    let currentPhase = 0;

    const phases = [
        {
            correctOrinalIndex: 6,
            setup: function() {
                return [
                    { occupied: false },
                    { occupied: true },
                    { occupied: false },
                    { occupied: false },
                    { occupied: false },
                    { occupied: false },
                    { occupied: false }
                ];
            }
        },
        {
            correctOrinalIndex: 0,
            setup: function() {
                return [
                    { occupied: false },
                    { occupied: false },
                    { occupied: true },
                    { occupied: false },
                    { occupied: false },
                    { occupied: true },
                    { occupied: false }
                ];
            }
        },
        {
            correctOrinalIndex: 3,
            setup: function() {
                return [
                    { occupied: true },
                    { occupied: true },
                    { occupied: false },
                    { occupied: false },
                    { occupied: false },
                    { occupied: true },
                    { occupied: true }

                ];
            }
        },
        {
            correctOrinalIndex: 6,
            setup: function() {
                return [
                    { occupied: true },
                    { occupied: true },
                    { occupied: false },
                    { occupied: true },
                    { occupied: false },
                    { occupied: true },
                    { occupied: false }

                ];
            }
        },
        {
            correctOrinalIndex: 3,
            setup: function() {
                return [
                    { occupied: true },
                    { occupied: true },
                    { occupied: false },
                    { occupied: false },
                    { occupied: true },
                    { occupied: false },
                    { occupied: true }

                ];
            }
        }
    ];

    function loadPhase(phaseIndex) {
        orinalsContainer.innerHTML = '';
        const phase = phases[phaseIndex];
        const orinals = phase.setup();
        
        orinals.forEach((orinal, index) => {
            const orinalDiv = document.createElement('div');
            orinalDiv.classList.add('orinal');
            if (orinal.occupied) orinalDiv.classList.add('occupied');
            const img = document.createElement('img');
            img.src = 'toilet.png';
            orinalDiv.appendChild(img);
            if (!orinal.occupied) {
                orinalDiv.addEventListener('click', () => handleOrinalClick(index));
            }
            orinalsContainer.appendChild(orinalDiv);
        });
    }

    function handleOrinalClick(index) {
        const phase = phases[currentPhase];
        if (index === phase.correctOrinalIndex) {
            currentPhase++;
            if (currentPhase < phases.length) {
                message.textContent = "¡Correcto! Pasas a la siguiente fase.";
                message.style.color = "green";
                setTimeout(() => {
                    loadPhase(currentPhase);
                    message.textContent = '';
                }, 1000);
            } else {
                message.textContent = "¡Felicidades! Has completado todas las fases.";
                message.style.color = "green";
            }
        } else if (orinalsContainer.children[index].classList.contains('occupied')) {
            message.textContent = "Este orinal está ocupado. Intenta otro.";
            message.style.color = "red";
        } else {
            message.textContent = "Incorrecto. Intenta de nuevo.";
            message.style.color = "red";
        }
        
        if (currentPhase >= phases.length || message.style.color === "red") {
            restartButton.style.display = 'block';
        }
    }

    restartButton.addEventListener('click', () => {
        currentPhase = 0;
        loadPhase(currentPhase);
        message.textContent = '';
        restartButton.style.display = 'none';
    });

    loadPhase(currentPhase);
});
