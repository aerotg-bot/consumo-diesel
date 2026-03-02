# Análise de Consumo Diesel por Embarcação

Aplicação web para consolidar dados de consumo de diesel e distância percorrida por embarcações.

## 🌐 Demo Online

Acesse: https://aerotg-bot.github.io/consumo-diesel/

## Funcionalidades

- Upload de planilhas Excel (consumo + distância)
- Processamento automático dos dados
- Geração de planilha consolidada com 3 abas:
  - Consumo (L)
  - Distância (MN)
  - Consumo por MN

## Uso

1. Faça upload da planilha de consumo (múltiplas abas, uma por embarcação)
2. Faça upload da planilha de distância (uma aba com embarcação, data e distância)
3. Clique em "Processar Dados"
4. Baixe a planilha consolidada

## Formato dos Arquivos

### Planilha de Consumo
- Múltiplas abas (uma por embarcação)
- Nome da embarcação: linha 3, coluna C
- Dados: a partir da linha 6
- Consumo: coluna L

### Planilha de Distância
- Uma única aba
- Colunas: Embarcação, Data, Distância (MN)

## Desenvolvimento Local

```bash
# Instalar dependências
bun install

# Rodar em desenvolvimento
bun run dev

# Build para produção
bun run build
```

## Deploy

### GitHub Pages (Automático)
O deploy é feito automaticamente via GitHub Actions quando você faz push para a branch `master`.

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`

## Tecnologias

- Next.js 16 (static export)
- SheetJS (xlsx) - processamento Excel
- JavaScript puro
