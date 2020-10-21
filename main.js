let pageAtual = 1;
let roboLigado = false;
let interacao1Concluida = false;
let interacao2Concluida = false;
let interacao3Concluida = false;

let processos = {
  'Analisador':
    {
      nome: 'Analisador',
      status: 'pronto'
    },
  'Movimentar':
    {
      nome: 'Movimentar',
      status: 'pronto'
    },
  'Pular':
    {
      nome: 'Pular',
      status: 'pronto'
    },
  'Lança chamas':
    {
      nome: 'Lança chamas',
      status: 'pronto'
    },
  'Pegar':
    {
      nome: 'Pegar',
      status: 'pronto'
    },
  'Carregar bateria':
    {
      nome: 'Carregar bateria',
      status: 'bloqueado'
    },
};

const lastPage = 7;

const page1 = document.getElementById('page1');
page1.style.marginLeft = `-${(pageAtual - 1)*100}%`;

const msgFooter = document.getElementById('mensagem-footer');

const pageAtualText = document.getElementById('page-atual');
pageAtualText.innerText = pageAtual;

/**
 * Navegação das páginas
 */
const navPages = document.getElementById('nav-pages')
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
acoesPaginas();

prevBtn.disabled = true;

nextBtn.addEventListener('click', () => {
  prevBtn.disabled = false;
  
  if(pageAtual < lastPage) {
    pageAtual++;
    page1.style.marginLeft = `-${(pageAtual - 1)*100}%`;
    pageAtualText.innerText = pageAtual;
  } 
  
  if(pageAtual === lastPage) {
    nextBtn.disabled = true;
  }
  
  acoesPaginas()
});

prevBtn.addEventListener('click', () => {
  nextBtn.disabled = false;

  if(pageAtual > 1) {
    pageAtual--;
    page1.style.marginLeft = `-${(pageAtual - 1)*100}%`;
    pageAtualText.innerText = pageAtual;
  }

  if(pageAtual === 1) {
    prevBtn.disabled = true;
  }

  acoesPaginas()
});

/**
 * Página 2
 */
const ligarRoboBtn = document.getElementById('ligar-robo');

ligarRoboBtn.addEventListener('click', () => {
  const icoPower = document.querySelector('#ligar-robo svg');

  icoPower.style.fill = 'green';

  msgFooter.innerText = '';
  navPages.style.display = 'block';

  nextBtn.click();

  roboLigado = true;
});

/**
 * Página 4
 */
const setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
  setTimeout(() => {
    cb();
    resolve();
  }, timeout);
});

const processosInteracao1 = document.getElementById('processos-interacao1');
const opt1_1 = document.getElementById('opcao1-1');
const opt1_2 = document.getElementById('opcao1-2');

opt1_1.addEventListener('click', () => {
  opt1_1.disabled = true;
  opt1_2.disabled = true;

  let i = 1;

  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'executando';
      processos['Movimentar'].status = 'pronto';
      processos['Pular'].status = 'pronto';

      processosInteracao1.innerHTML = geraProcessosHTML();
    }, 1000);

    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'pronto';
      processos['Movimentar'].status = 'executando';
      processos['Pular'].status = 'executando';

      processosInteracao1.innerHTML = geraProcessosHTML();
    }, 1000);

    if(i < 3) {
      i++;
      animarProcessos();
    } else {
      await setAsyncTimeout(() => {
        msgFalha.innerText = 'ÁrTúDíTú caiu, pois foi lento demais e o piso acabou cedendo.';
        bgModalFalha.style.top = '0';
      }, 1000);
    }
  }

  animarProcessos();
});

opt1_2.addEventListener('click', () => {
  opt1_1.disabled = true;
  opt1_2.disabled = true;
  
  processos['Analisador'].status = 'executando';
  processos['Movimentar'].status = 'pronto';
  processos['Pular'].status = 'pronto';

  processosInteracao1.innerHTML = geraProcessosHTML();
  
  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
    }, 1000);

    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'pronto';
      processos['Movimentar'].status = 'executando';
      processos['Pular'].status = 'executando';

      processosInteracao1.innerHTML = geraProcessosHTML();
    }, 1000);

    await setAsyncTimeout(() => {
      bgModalSucesso.style.top = '0';
      navPages.style.display = 'block';

      interacao1Concluida = true;
    }, 1000);
  }

  animarProcessos();
});

/**
 * Página 5
 */
const processosInteracao2 = document.getElementById('processos-interacao2');
const opt2_1 = document.getElementById('opcao2-1');
const opt2_2 = document.getElementById('opcao2-2');

opt2_1.addEventListener('click', () => {
  opt2_1.disabled = true;
  opt2_2.disabled = true;

  let i = 1;

  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'executando';
      processos['Movimentar'].status = 'executando';
      processos['Pular'].status = 'pronto';
      processos['Lança chamas'].status = 'pronto';

      processosInteracao2.innerHTML = geraProcessosHTML();
    }, 1000);

    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'pronto';
      processos['Movimentar'].status = 'executando';
      processos['Pular'].status = 'pronto';
      processos['Lança chamas'].status = 'executando';

      processosInteracao2.innerHTML = geraProcessosHTML();
    }, 1000);

    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'pronto';
      processos['Movimentar'].status = 'executando';
      processos['Pular'].status = 'executando';
      processos['Lança chamas'].status = 'pronto';

      processosInteracao2.innerHTML = geraProcessosHTML();
    }, 1000);

    if(i < 2) {
      i++;
      animarProcessos();
    } else {
      await setAsyncTimeout(() => {
        bgModalSucesso.style.top = '0';
        navPages.style.display = 'block';
        interacao2Concluida = true;
      }, 1000);
    }
  }

  animarProcessos();
});

opt2_2.addEventListener('click', () => {
  opt2_1.disabled = true;
  opt2_2.disabled = true;

  processos['Movimentar'].status = 'executando';
  processos['Lança chamas'].status = 'executando';
  
  processosInteracao2.innerHTML = geraProcessosHTML();

  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
      msgFalha.innerHTML = 'ÁrTúDíTú não consegue analisar a situação e<br />gasta toda sua bateria sendo destruído pelo cachorro.';
      bgModalFalha.style.top = '0';
    }, 2000);
  }

  animarProcessos();
});

/**
 * Página 6
 */
const processosInteracao3 = document.getElementById('processos-interacao3');
const opt3_1 = document.getElementById('opcao3-1');
const opt3_2 = document.getElementById('opcao3-2');

opt3_1.addEventListener('click', () => {
  opt3_1.disabled = true;
  opt3_2.disabled = true;

  processos['Analisador'].status = 'executando';
  processos['Movimentar'].status = 'executando';

  processosInteracao3.innerHTML = geraProcessosHTML();

  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
      msgFalha.innerHTML = 'Anoiteceu e ÁrTúDíTú ficou sem bateria,<br />foi capturado por viajantes de outra colônia.';

      bgModalFalha.style.top = '0';
    }, 2000);
  }

  animarProcessos();
});

opt3_2.addEventListener('click', () => {
  opt3_1.disabled = true;
  opt3_2.disabled = true;

  processos['Analisador'].status = 'bloqueado';
  processos['Movimentar'].status = 'bloqueado';
  processos['Pular'].status = 'bloqueado';
  processos['Lança chamas'].status = 'bloqueado';
  processos['Pegar'].status = 'bloqueado';
  processos['Carregar bateria'].status = 'pronto';

  processosInteracao3.innerHTML = geraProcessosHTML();

  const animarProcessos = async () => {
    await setAsyncTimeout(() => {
      processos['Carregar bateria'].status = 'executando';

      processosInteracao3.innerHTML = geraProcessosHTML();

      const bateriaTxt = document.getElementById('bateria-txt');
      const bateriaProgress = document.getElementById('bateria-progress');
      const icoBateria = document.getElementById('ico-bateria');

      bateriaTxt.innerText = '100%';
      bateriaProgress.style.width = '100%';
      bateriaProgress.style.background = 'green';
      icoBateria.style.fill = 'green';
    }, 2000);

    await setAsyncTimeout(() => {
      resetProcessos();

      processosInteracao3.innerHTML = geraProcessosHTML();
    }, 1000);

    await setAsyncTimeout(() => {
      processos['Analisador'].status = 'executando';
      processos['Movimentar'].status = 'executando';

      processosInteracao3.innerHTML = geraProcessosHTML();
    }, 2000);

    await setAsyncTimeout(() => {
      const imgSucesso = document.getElementById('sucesso');
      const imgSucessoFinal = document.getElementById('sucesso-final');

      imgSucesso.style.display = 'none';
      imgSucessoFinal.style.display = 'block';

      bgModalSucesso.style.top = '0';
      navPages.style.display = 'block';

      interacao3Concluida = true;
    }, 1000);
  }

  animarProcessos();
});

/**
 * Quando a missão falha
 */
const bgModalFalha = document.getElementById('bg-modal-falha');
const fecharModalFalhaBtn = document.getElementById('tentar-novamente');
const msgFalha = document.getElementById('msg-falha');

fecharModalFalhaBtn.addEventListener('click', () => {
  bgModalFalha.style.top = '-100vh';

  resetProcessos();

  switch (pageAtual) {
    case 4:
      processosInteracao1.innerHTML = geraProcessosHTML();
      opt1_1.disabled = false;
      opt1_2.disabled = false;
      break;
    case 5:
      processosInteracao2.innerHTML = geraProcessosHTML();
      opt2_1.disabled = false;
      opt2_2.disabled = false;
      break;
    case 6:
      processosInteracao3.innerHTML = geraProcessosHTML();
      opt3_1.disabled = false;
      opt3_2.disabled = false;
      break;
    default:
      break;
  }
});

/**
 * Quando um objetivo é conquistado
 */
const bgModalSucesso = document.getElementById('bg-modal-sucesso');
const fecharModalSucessoBtn = document.getElementById('continuar');

fecharModalSucessoBtn.addEventListener('click', () => {
  bgModalSucesso.style.top = '-100vh';

  resetProcessos();

  const processosHTML = geraProcessosHTML();
  processosInteracao1.innerHTML = processosHTML;
  processosInteracao2.innerHTML = processosHTML;
  processosInteracao3.innerHTML = processosHTML;

  nextBtn.click();
});

/**
 * Ações das páginas
 */
function acoesPaginas() {
  if(pageAtual === 2 && !roboLigado) {
    navPages.style.display = 'none';
    msgFooter.innerText = 'Ligue o ÁrTúDíTú para iniciar a aventura';
  }

  if(pageAtual === 4 && !interacao1Concluida) {
    navPages.style.display = 'none';
    processosInteracao1.innerHTML = geraProcessosHTML();
  }
  
  if(pageAtual === 5 && !interacao2Concluida) {
    navPages.style.display = 'none';
    processosInteracao2.innerHTML = geraProcessosHTML();
  }
  
  if(pageAtual === 6 && !interacao3Concluida) {
    navPages.style.display = 'none';
    processosInteracao3.innerHTML = geraProcessosHTML();
  }
}

/**
 * Atualiza processos
 */
function geraProcessosHTML() {
  let bodyHTML = '';

  Object.keys(processos).forEach(function(processo){
    bodyHTML += `
      <tr>
        <td class="${processos[processo].status === 'executando' && 'bold'}">${processo}</td>
        <td class="status ${processos[processo].status}">${processos[processo].status}</td>
      </tr>
    `
   });

  return bodyHTML;
}

/**
 * Reset os processos
 */
function resetProcessos() {
  processos['Analisador'].status = 'pronto';
  processos['Movimentar'].status = 'pronto';
  processos['Pular'].status = 'pronto';
  processos['Lança chamas'].status = 'pronto';
  processos['Pegar'].status = 'pronto';
  processos['Carregar bateria'].status = 'bloqueado';
}