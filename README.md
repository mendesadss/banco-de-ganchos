# Banco de Conteúdo, Global Brand

Central de tudo que está pronto pra gravar no `@mendes.adss`: ganchos, roteiros completos e ideias.

**No ar:** https://mendesadss.github.io/banco-de-ganchos/

## Como está organizado

| Arquivo | O que é |
|---|---|
| `dados.json` | **Todo o conteúdo.** É o único arquivo que muda no dia a dia |
| `index.html` | A página. Lê o `dados.json` e monta tudo. Quase nunca muda |
| `sw.js` | Service worker (funciona offline) |
| `manifest.webmanifest` | Instalação como app no celular |
| `icon.svg`, `icon-maskable.svg` | Ícone do app |

## As quatro abas

- **Fila** — os 158 ganchos distribuídos em 8 semanas por pilar (dor, crença, método, saga)
- **Roteiros** — roteiro completo com hook, corpo e CTA. Tem Modo Gravação em tela cheia
- **Ideias** — tema levantado que ainda não virou roteiro
- **Arquivo** — tudo que já foi gravado, fora do caminho

Marcou o checkbox, o item sai da aba de origem e vai pro Arquivo.

## Estrutura do dados.json

```jsonc
{
  "versao": 2,
  "atualizado": "2026-07-19",
  "semanas": [ /* plano de 8 semanas, com o mix de pilares */ ],
  "capSec": 43,                    // quantos secundários entram na fila
  "ganchos":  [ { "id": "d0", "pilar": "drop|sec", "func": "dor|crenca|metodo|saga",
                  "hook": "...", "tema": "...", "meta": "gatilho · template · elemento",
                  "tier": "S|A|B" } ],
  "roteiros": [ { "id": "r-slug", "titulo": "...", "hook": "...", "corpo": "...",
                  "cta": "PALAVRA", "duracao": "90s", "func": "...",
                  "publico": "operador|iniciante|ambos", "meta": "...",
                  "fonte": "de onde veio", "criado": "AAAA-MM-DD" } ],
  "ideias":   [ { "id": "i-slug", "titulo": "...", "nota": "...", "func": "...",
                  "publico": "...", "fonte": "...", "criado": "AAAA-MM-DD" } ]
}
```

**IDs:** ganchos usam `d0..d99` e `s0..s57` (não mexer, é o histórico do checklist).
Roteiro novo usa `r-slug`, ideia nova usa `i-slug`.

## Checklist e sincronização

A marcação de "gravado" fica no `localStorage` do aparelho, na chave `gb_ganchos_gravados_v1`
(a mesma da versão 1, então o histórico antigo foi preservado).

Como é uma página estática, essa marcação **não sincroniza sozinha entre aparelhos**.
Para tornar permanente: botão **Sincronizar** no rodapé gera a lista de IDs gravados,
copia e manda pro Claude falando "arquiva esses".

## Para adicionar conteúdo

Use a skill `/subir-roteiro` no Claude Code. Ela só acrescenta no `dados.json` e faz push.
