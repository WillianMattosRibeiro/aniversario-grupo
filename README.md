# 🎂 Aniversariantes do Grupo dos Casais

Site interativo para celebrar os aniversários do grupo.  
Inclui calendário, lista de aniversariantes, música ambiente automática e vídeo de parabéns.

## ✨ Funcionalidades

- **Calendário interativo** com destaque nos dias de aniversário
- **Detecção automática** do dia atual
- Quando **é aniversário**:
  - Tela grande de comemoração
  - Confete automático
  - Modal com vídeo de parabéns abre automaticamente
- Quando **não é aniversário**:
  - Mostra o próximo aniversário
  - Player flutuante de música ambiente (com botão "TOCAR")
- Lista completa de todos os aniversariantes ordenada por proximidade
- Totalmente responsivo (mobile, tablet e desktop)
- Compatível com GitHub Pages

## 📁 Estrutura do Projeto

```
aniversario-grupo/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos personalizados
├── js/
│   └── script.js       # Toda a lógica JavaScript
└── README.md           # Este arquivo
```

## 🚀 Como usar

### Rodar localmente

1. Clone o repositório ou baixe a pasta
2. Abra o arquivo `index.html` diretamente no navegador

Ou use um servidor local simples:

```bash
# Com Python
python -m http.server 8000

# Depois acesse: http://localhost:8000
```

### Publicar no GitHub Pages

1. Faça upload da pasta `aniversario-grupo` para o seu repositório
2. Vá em **Settings → Pages**
3. Selecione a branch `main` e a pasta `/ (root)`
4. Aguarde alguns minutos e acesse:

```
https://seu-usuario.github.io/aniversario-grupo/
```

## 🛠 Tecnologias utilizadas

- **HTML5 + CSS3 + JavaScript** puro
- **Tailwind CSS** via CDN (sem build necessário)
- **Font Awesome** para ícones
- **YouTube Embed** para os vídeos de parabéns e música ambiente

## 📝 Observações

- Os vídeos são carregados via YouTube Embed
- A música ambiente inicia em mudo automaticamente (devido a políticas de autoplay dos navegadores)
- O usuário precisa clicar no botão **"TOCAR"** para ativar o som
- Todo o código está organizado em arquivos separados para facilitar manutenção

---

Feito com ❤️ para o Grupo dos Casais

Qualquer dúvida ou sugestão, é só falar! 🎉
