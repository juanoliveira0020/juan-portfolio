# Portfólio — Juan Oliveira

Portfólio pessoal premium construído em **HTML5, CSS3 e JavaScript puro (Vanilla JS)**, sem frameworks. Inspirado visualmente em Awwwards, Apple, Vercel, Linear e Stripe.

## 📁 Estrutura de arquivos

```
/
├── index.html              → Página única com todas as seções
├── manifest.json           → Configuração PWA
├── robots.txt               → Diretivas para buscadores
├── sitemap.xml               → Sitemap preparado
├── css/
│   ├── variables.css        → Tokens de design (cores, fontes, espaçamentos, temas)
│   ├── style.css            → Estilos de todos os componentes e seções
│   ├── animations.css        → Keyframes e classes de animação
│   └── responsive.css       → Media queries (mobile → ultrawide)
├── js/
│   ├── theme.js              → Alternância dark/light com localStorage
│   ├── cursor.js             → Cursor customizado + efeito magnético
│   ├── particles.js          → Partículas de fundo em <canvas>
│   ├── animations.js         → GSAP, scroll reveal, contadores, tilt 3D, ripple
│   └── main.js                → Navbar, scroll progress, menu mobile, formulário
└── assets/
    ├── images/               → Fotos e imagens dos projetos (placeholders inclusos)
    ├── icons/                → Favicon
    └── logos/                → Logos (se necessário)
```

## 🚀 Como rodar

Como o projeto é 100% estático, basta abrir `index.html` em qualquer navegador moderno, ou servir localmente:

```bash
# Opção 1 — Python
python3 -m http.server 8080

# Opção 2 — VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Depois acesse `http://localhost:8080`.

## 🎨 Personalização

### Cores
Todas as cores estão centralizadas em `css/variables.css`. Para trocar o tom de roxo, edite:
```css
--color-primary: #7C3AED;
--color-primary-light: #8B5CF6;
```

### Textos e projetos
Edite diretamente o `index.html` — cada seção está comentada (`<!-- ==== NOME DA SEÇÃO ==== -->`) para facilitar a localização.

### Imagens
Substitua os arquivos em `assets/images/` (placeholders inclusos) mantendo os mesmos nomes, ou atualize os caminhos no HTML. Recomenda-se o formato **WebP** para melhor performance.

### Estatísticas do GitHub
Na seção `#github`, o embed usa o serviço público **github-readme-stats**. Basta trocar `username=juanoliveira` pelo seu usuário real:
```html
<img src="https://github-readme-stats.vercel.app/api?username=SEU_USUARIO..." />
```

### Currículo (PDF)
Coloque seu PDF em `assets/curriculo-juan-oliveira.pdf` — o botão "Baixar Currículo" já aponta para esse caminho.

### Formulário de contato
O formulário em `js/main.js` (`initContactForm`) simula o envio. Para funcionar de verdade, integre com um serviço como **Formspree**, **EmailJS** ou uma API própria — basta trocar o `setTimeout` pela chamada real (`fetch`).

## ⚙️ Bibliotecas utilizadas

- **GSAP** (via CDN) — usada apenas para a animação de entrada do Hero.
- Nenhuma outra biblioteca externa: cursor, partículas, tilt 3D, contadores e scroll reveal foram implementados manualmente em Vanilla JS para manter o projeto leve.

## ✅ Boas práticas aplicadas

- HTML5 semântico (`header`, `main`, `section`, `article`, `footer`)
- Acessibilidade: `aria-label`, foco visível, contraste adequado, `prefers-reduced-motion`
- Performance: `loading="lazy"` nas imagens, CSS/JS modular, sem bibliotecas pesadas
- SEO: meta tags, Open Graph, Twitter Cards, Schema.org `Person`, `robots.txt`, `sitemap.xml`
- Responsividade: Flexbox, Grid, `clamp()`, media queries de mobile a ultrawide
- Tema dark/light persistente via `localStorage`

## 🔧 Próximos passos sugeridos

1. Substituir os placeholders de imagem por fotos e screenshots reais.
2. Conectar o formulário de contato a um serviço de envio de e-mail real.
3. Integrar a API do GitHub diretamente (via `fetch`) caso queira dados 100% dinâmicos, em vez do embed de imagem.
4. Gerar as imagens em **WebP** e comprimi-las para melhorar ainda mais o Lighthouse.
5. Rodar uma auditoria de acessibilidade (Lighthouse / axe) antes de publicar.
