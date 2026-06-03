# Ney Jogou?

Site estático que acompanha se Neymar entrou em campo nos jogos da Seleção Brasileira em 2026. Exibe countdown para o próximo jogo e o histórico de participações separado por torneio e amistosos.

## Estrutura

```
ney-jogou/
├── data/
│   ├── world-cup.json   ← jogos da Copa do Mundo 2026
│   └── others.json      ← amistosos
├── src/
│   └── matches.js       ← lógica pura (normalização, ordenação, countdown)
├── tests/
│   └── unit/
│       └── matches.test.js
├── index.html
├── style.css
├── app.js
└── neymar_2.jpg
```

## Formato dos dados

Cada jogo nos arquivos JSON segue o formato:

```json
{
  "date": "2026-06-13",
  "schedule": "19:00",
  "stage": "Rodada 1",
  "city": "Nova Jersey",
  "home": "Brasil",
  "away": "Marrocos"
}
```

O campo `played` é opcional:

| Valor | Significado |
|-------|-------------|
| ausente | jogo ainda não realizado |
| `true` | Neymar jogou |
| `false` | Neymar não jogou |

## Atualizando após um jogo

Editar o JSON do jogo correspondente e adicionar o campo `played`:

```json
{
  "date": "2026-06-13",
  "schedule": "19:00",
  "stage": "Rodada 1",
  "city": "Nova Jersey",
  "home": "Brasil",
  "away": "Marrocos",
  "played": true
}
```

## Desenvolvimento

```bash
# Rodar testes unitários
npm test

# Visualizar localmente (qualquer servidor estático)
npx serve .
```

## Deploy

O projeto é um site estático — funciona em qualquer host gratuito:

- **GitHub Pages:** habilitar nas configurações do repositório (branch `main`, raiz `/`)
- **Netlify:** conectar o repositório, sem build command, publish directory `.`
- **Vercel:** conectar o repositório, framework "Other"
- **Render.com:** conectar o repositório

## Crédito da foto

Ryan Pierse – FIFA/FIFA via Getty Images
