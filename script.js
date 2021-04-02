
  document.querySelector('.audioPermissao').style.display= 'none'
  setTimeout(() => {
    document.querySelector('.audioPermissao').style.display= 'grid'
    document.querySelector('.loadscreen').style.display= 'none'
    localStorage.setItem('Carregou', true)
  }, 5000)



let audio = 0;

function semaudio() {
  audio = false
  script()
}

function comaudio() {
  audio = true
  script()
}



  function script() {
    document.querySelector('.audioPermissao').style.display= 'none'
    document.querySelector('.inicio').classList.remove('remove') 
    const iniciarButton = document.querySelector('#iniciar')
    iniciarButton.addEventListener('mouseenter', () => {
      iniciarButton.setAttribute('src', 'https://svgshare.com/i/VdQ.svg')
    })
    iniciarButton.addEventListener('mouseleave', () => {
      iniciarButton.setAttribute('src', 'https://svgshare.com/i/VdY.svg')
    })
    iniciarButton.addEventListener('click', () => {
      criarCartasAliado()
      setTimeout(() => {
        document.querySelector('.inicio').classList.add('remove')
        document.querySelector('.cartas').classList.add('ativo')
        document.querySelector('.cartas').style.animation = 'fadeIn .5s'
      }, 1500)
      document.querySelector('.inicio').style.animation = 'fadeOut 1.5s'
      if (audio) {
        const audioScorpion = document.querySelector('#audioScorpion')
        const themeSong = document.querySelector('#theme-song')
        themeSong.pause()
        audioScorpion.play()
        setTimeout(() => {
          document.querySelector('#roundone').play()
        }, 2000)
      }

    })
    if(audio) {
      const themeSong = document.querySelector('#theme-song')
      themeSong.play()
    }


    // Criação de cartas abaixo

    function Personagem(nome, imagem, ataque, defesa, fatality) {
      this.Nome = nome
      this.Imagem = imagem
      this.Habilidades = {
        Ataque: ataque,
        Defesa: defesa,
        Fatality: fatality,
      }
    }

    const personagens = [new Personagem('Raiden', 'https://i.ibb.co/p0Qxpk0/Raiden-cutout874.png', 123, 100, 120), new Personagem('Reptile', 'https://i.ibb.co/5hrTtZw/Img-mkx-reptile-ninja.png', 100, 98, 110), new Personagem('Goro', 'https://i.ibb.co/YRVRbb0/Goro-MK.png', 130, 90, 180), new Personagem('Sub-Zero', 'https://upload.wikimedia.org/wikipedia/pt/8/81/Sub-Zero.png', 132, 110, 140), new Personagem('Scorpion', 'http://2.bp.blogspot.com/-nE7RrP1BT8M/VTnb5Dwo74I/AAAAAAAADjE/L4Uq_NU7Wec/s1600/Scorpion_mkx_Render.png', 140, 120, 125), new Personagem('Noob Saibot', 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/89/Noob_Saibot.png/150px-Noob_Saibot.png', 125, 132, 110)]

    function personagemAleatorio() {
      return Math.round(Math.random() * 5)
    }

    function habilidadeAleatoria() {
      return Math.round(Math.random() * 2)
    }

    function criarCartasAliado() {
        let personagemIndex = personagemAleatorio()
        document.querySelector('.cartas-field button:first-child img').setAttribute('src', personagens[personagemIndex].Imagem)
        document.querySelector('.cartas-field button:first-child p').innerHTML = personagens[personagemIndex].Nome
        document.querySelector('.cartas-field button:first-child .ataque-aliado').innerHTML = personagens[personagemIndex].Habilidades.Ataque
        document.querySelector('.cartas-field button:first-child .defesa-aliado').innerHTML = personagens[personagemIndex].Habilidades.Defesa
        document.querySelector('.cartas-field button:first-child .fatality-aliado').innerHTML = personagens[personagemIndex].Habilidades.Fatality

        let personagemIndexCarta2 = personagemAleatorio()
        if (personagemIndexCarta2 === personagemIndex) {
          personagemAleatorio()
        } else {
          document.querySelector('.cartas-field button:nth-child(2) img').setAttribute('src', personagens[personagemIndexCarta2].Imagem)
          document.querySelector('.cartas-field button:nth-child(2) p').innerHTML = personagens[personagemIndexCarta2].Nome
          document.querySelector('.cartas-field button:nth-child(2) .ataque-aliado').innerHTML = personagens[personagemIndexCarta2].Habilidades.Ataque
          document.querySelector('.cartas-field button:nth-child(2) .defesa-aliado').innerHTML = personagens[personagemIndexCarta2].Habilidades.Defesa
          document.querySelector('.cartas-field button:nth-child(2) .fatality-aliado').innerHTML = personagens[personagemIndexCarta2].Habilidades.Fatality
        }

        let personagemIndexCarta3 = personagemAleatorio()
        if (personagemIndexCarta3 === personagemIndex || personagemIndexCarta3 === personagemIndexCarta2) {
          personagemAleatorio()
        } else {
          document.querySelector('.cartas-field button:last-child img').setAttribute('src', personagens[personagemIndexCarta3].Imagem)
          document.querySelector('.cartas-field button:last-child p').innerHTML = personagens[personagemIndexCarta3].Nome
          document.querySelector('.cartas-field button:last-child .ataque-aliado').innerHTML = personagens[personagemIndexCarta3].Habilidades.Ataque
          document.querySelector('.cartas-field button:last-child .defesa-aliado').innerHTML = personagens[personagemIndexCarta3].Habilidades.Defesa
          document.querySelector('.cartas-field button:last-child .fatality-aliado').innerHTML = personagens[personagemIndexCarta3].Habilidades.Fatality
        }


    }

    document.querySelectorAll('button > div > div > div').forEach((habilidade) => {
      habilidade.addEventListener('click', () => {
        habilidade.parentElement.parentElement.parentElement.classList.add('carta-selecionada')
        habilidade.classList.add('habilidade-selecionada')
        setTimeout(() => {
          document.body.classList.add('play')
        }, 4000)
        document.querySelectorAll('button').forEach((botao) => {
        botao.classList.add('remove')
        document.querySelector('#vs').classList.remove('remove')
        })
        jogar(habilidade.querySelector('span'))
      })
    })

    function jogar(habilidade) {
      let habilidadeAliado = habilidade.innerHTML
      console.log('Habilidade Aliado = ' + habilidade.innerHTML)
      document.querySelector('.cartas-field-enemy').style.display = 'none'
      let personagemIndexInimigo = personagemAleatorio()
      document.querySelector('.cartas-field-enemy-versus').classList.remove('remove')
      document.querySelector('.cartas-field-enemy-versus button').classList.remove('remove')
      document.querySelector('.cartas-field-enemy-versus button img').setAttribute('src', personagens[personagemIndexInimigo].Imagem)
      document.querySelector('.cartas-field-enemy-versus button p').innerHTML = personagens[personagemIndexInimigo].Nome
      document.querySelector('.cartas-field-enemy-versus button .ataque-aliado').innerHTML = personagens[personagemIndexInimigo].Habilidades.Ataque
      document.querySelector('.cartas-field-enemy-versus button .defesa-aliado').innerHTML = personagens[personagemIndexInimigo].Habilidades.Defesa
      document.querySelector('.cartas-field-enemy-versus button .fatality-aliado').innerHTML = personagens[personagemIndexInimigo].Habilidades.Fatality
      const escolherHabilidade = habilidadeAleatoria()
      let habilidadeInimigo = 0;
      if(audio) {document.querySelector('#deadmusic').play()}
      switch (escolherHabilidade) {
        case 0:
          document.querySelector('.ataque-inimigo').style.border = '1px solid #f5883e'
          document.querySelector('.ataque-inimigo').style.borderRadius = '40px'
          document.querySelector('.ataque-inimigo').style.padding = '10px'
          habilidadeInimigo = personagens[personagemIndexInimigo].Habilidades.Ataque
          break;
        case 1:
          document.querySelector('.defesa-inimigo').style.border = '1px solid #f5883e'
          document.querySelector('.defesa-inimigo').style.borderRadius = '40px'
          document.querySelector('.defesa-inimigo').style.padding = '10px'
          habilidadeInimigo = personagens[personagemIndexInimigo].Habilidades.Defesa
          break;
        case 2:
          document.querySelector('.fatality-inimigo').style.border = '1px solid #f5883e'
          document.querySelector('.fatality-inimigo').style.borderRadius = '40px'
          document.querySelector('.fatality-inimigo').style.padding = '10px'
          habilidadeInimigo = personagens[personagemIndexInimigo].Habilidades.Fatality
          break;
      }
      console.log('Habilidade inimiga = ' + habilidadeInimigo)

      if(habilidadeAliado > habilidadeInimigo) {
        setTimeout(() => {
          document.querySelector('#win').classList.add('win')
          if(audio) {document.querySelector('#youwin').play()}
        }, 4000)
      } else if (habilidadeAliado < habilidadeInimigo) {
        console.log('Você perdeu')
        setTimeout(() => {
          document.querySelector('#loose').classList.add('loose')
          if(audio) {document.querySelector('#player2').play()}
          
        }, 4000)
      } else {
        setTimeout(() => {
          document.querySelector('#tie').classList.add('tie')
          if(audio){document.querySelector('#youwin').play()}
        }, 4000)
      }
    }
  }

