---
title: Como automatizei a coleta de dados do eSocial com Python
description: Um robô que navega página por página, retoma de onde parou e se recupera sozinho de quedas de sessão.
date: 2026-11-13
tags: Python, Automação, Web Scraping
draft: true
---

Algumas tarefas não são difíceis, só são **longas e repetitivas**. Coletar dados de remuneração no portal do eSocial era uma delas: abrir a listagem, copiar as informações de cada página, avançar, repetir. Dezenas de vezes.

O problema não era só o tempo. Era o risco: no meio do caminho a sessão caía, e lá se ia a coleta. Recomeçar do zero virou rotina.

Foi isso que me levou a escrever o [Scraping eSocial](https://github.com/VenturaCerqueira/Scraping-eSocial).

## O que o robô precisava fazer

Antes de abrir o editor, listei o que uma pessoa fazia manualmente:

1. Abrir a página de listagem.
2. Ler nome, CPF e situação da remuneração de cada pessoa.
3. Passar para a próxima página.
4. Ao terminar, finalizar a competência.

E o que dava errado: sessão expirando, página que não carregava, coleta interrompida sem saber onde parou.

## A solução em quatro partes

### 1. Simular a navegação

Usei o `pyautogui` para fazer o que a pessoa fazia: abrir páginas, copiar o HTML e clicar nos botões. É uma abordagem simples, que funciona mesmo quando não há uma API disponível.

### 2. Extrair os dados do HTML

Com o HTML copiado, o `BeautifulSoup` encontra as informações que interessam: nome, CPF e status. Assim a lógica de extração fica separada da navegação, e uma mudança no layout afeta só um ponto do código.

### 3. Salvar o progresso

Essa foi a parte que mais fez diferença. A cada página processada, o robô grava em um arquivo JSON qual foi a última página concluída. Se algo der errado, ele **retoma exatamente de onde parou**, sem repetir trabalho e sem perder o que já foi coletado.

```python
# versão simplificada da ideia
progresso = carregar_json("progresso.json")
for pagina in range(progresso["ultima_pagina"] + 1, total_paginas + 1):
    html = copiar_pagina(pagina)
    registros += extrair(html)
    salvar_json("progresso.json", {"ultima_pagina": pagina})
```

### 4. Tolerar falhas

Quando uma página falha, o robô tenta de novo automaticamente. Se a sessão estiver comprometida, ele abre uma nova sessão anônima e continua. No final, os dados vão para um CSV com `pandas`, e a competência é finalizada.

## O que eu aprendi

- **Resiliência vale mais que velocidade.** Um robô rápido que recomeça do zero a cada falha perde para um robô mais lento que sabe retomar.
- **Separar responsabilidades ajuda na manutenção.** Navegação, extração e persistência em partes diferentes do código deixam cada mudança pequena.
- **Automação boa é a que alguém consegue usar.** Arquivos simples (JSON e CSV) tornam o resultado fácil de conferir e de levar para outras ferramentas.

O código está aberto no [GitHub](https://github.com/VenturaCerqueira/Scraping-eSocial). Se você tem uma rotina parecida, a mesma estrutura serve para muitos outros portais.
