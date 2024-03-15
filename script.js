const startGame = () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const gameBoard = document.querySelector('.game-board');

    // Salvar as posições iniciais dos elementos
    const initialMarioStyle = {
        bottom: window.getComputedStyle(mario).bottom,
        width: window.getComputedStyle(mario).width,
        marginLeft: window.getComputedStyle(mario).marginLeft
    };

    const initialPipeStyle = {
        position: 'absolute',
        bottom: '0px',
        height: '80px',
        animation: 'pipe_movi 1.5s infinite linear'
    };

    const jump = () => {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500)
    }

    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 110 && pipePosition > 10 && marioPosition < 80) {
            // Parar a animação do cano
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}`; 
            // Parar a animação do Mario
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`; 
            mario.src = './imagens/game-over.png';
            // Redimensionar a imagem do Mario
            mario.style.width = '75px'; 
            mario.style.bottom = `${marioPosition}`;
            // Ajustar a margem esquerda do Mario
            mario.style.marginLeft = '15px';

            clearInterval(loop);

            // Exibir "Game Over" na tela
            const gameOverText = document.createElement('div');
            gameOverText.textContent = 'Game Over';
            gameOverText.style.position = 'absolute';
            gameOverText.style.top = '50%';
            gameOverText.style.left = '50%';
            gameOverText.style.transform = 'translate(-50%, -50%)';
            gameOverText.style.fontSize = '2em';
            gameOverText.style.fontWeight = 'bold';
            gameOverText.style.color = 'red';
            gameBoard.appendChild(gameOverText);

            // Ouvinte de evento para a tecla de espaço para reiniciar o jogo
            document.addEventListener('keydown', (event) => {
                if (event.keyCode === 32) { // Código da tecla de espaço
                    // Remover o texto "Game Over" da tela
                    gameBoard.removeChild(gameOverText);
                    
                    // Resetar os estilos e animações para as posições iniciais
                    mario.style.bottom = initialMarioStyle.bottom;
                    mario.style.width = initialMarioStyle.width;
                    mario.style.marginLeft = initialMarioStyle.marginLeft;
                    mario.src = './imagens/mario.gif';
                    pipe.style.animation = initialPipeStyle.animation;
                    pipe.style.left = initialPipeStyle.left;

                    // Reiniciar o jogo
                    startGame();
                    
                }
            });
        }
    }, 10);

    document.addEventListener('keydown', jump);
}

// Iniciar o jogo pela primeira vez
startGame();
