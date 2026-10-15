# CHECKPOINT 05 - DEVSECOPS

![Security Pipeline](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/workflows/security.yml/badge.svg)

Checkpoint prático de **DevSecOps e Cloud Computing - FIAP / Engenharia de Software**.

O projeto implementa um pipeline obrigatório capaz de barrar **segredos**, **código vulnerável** e **imagem Docker com CVE crítico**.

## Integrantes

| Nome | RM |
|---|---:|
| Guilherme Santos | 551168 |
| Enricco | 551717 |
| Gabriel | 99227 |
| Danilo | 99465 |
| Laura | 98747 |

## Pipeline

O workflow [`.github/workflows/security.yml`](.github/workflows/security.yml) executa três jobs independentes em `push`, `pull_request` e execução manual:

1. **Gitleaks - Secret Scanning**: detecta credenciais e tokens versionados.
2. **Semgrep - SAST**: análise estática; a política local bloqueia `eval(...)` em Python.
3. **Trivy - Container CVE Scan**: constrói a imagem e falha diante de CVEs `CRITICAL` corrigíveis.

## Resultado final

A execução limpa da `main` passou nos três jobs:

- [Run #6 - main limpa](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662611345)

As sabotagens foram mantidas em branches separadas para preservar a `main` segura:

- [Run #9 - Gitleaks bloqueando segredo falso](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662683841)
- [Run #8 - Semgrep bloqueando `eval()`](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662624561)
- [Run #11 - Trivy bloqueando imagem com 27 CVEs CRITICAL](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662696322)

> Os segredos usados na sabotagem são propositalmente falsos e não correspondem a nenhuma conta real.

## Evidências

### Pipeline limpo

![Pipeline limpo](docs/evidencias/01_main_sucesso.svg)

### Gitleaks

![Gitleaks bloqueando segredo falso](docs/evidencias/02_gitleaks_bloqueio.svg)

### Semgrep

![Semgrep bloqueando eval](docs/evidencias/03_semgrep_bloqueio.svg)

### Trivy

![Trivy bloqueando imagem vulnerável](docs/evidencias/04_trivy_bloqueio.svg)

## Relatório de entrega

- [Relatório detalhado em Markdown](docs/RELATORIO_EVIDENCIAS.md)
- [PDF de evidências](docs/CP05_RELATORIO_EVIDENCIAS.pdf)

## Executar o site

```bash
docker build -t cp05-devsecops .
docker run --rm -p 8080:8080 cp05-devsecops
```

Acesse `http://localhost:8080`.

## Estrutura

```text
.
├── .github/workflows/security.yml
├── docs/
│   ├── CP05_RELATORIO_EVIDENCIAS.pdf
│   ├── RELATORIO_EVIDENCIAS.md
│   └── evidencias/
│       ├── 01_main_sucesso.svg
│       ├── 02_gitleaks_bloqueio.svg
│       ├── 03_semgrep_bloqueio.svg
│       └── 04_trivy_bloqueio.svg
├── site/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .semgrep.yml
├── Dockerfile
└── README.md
```

## Checklist CP05

- [x] Repositório com site.
- [x] Dockerfile funcional.
- [x] Workflow `security.yml`.
- [x] Job Gitleaks.
- [x] Job Semgrep.
- [x] Job Trivy para imagem com CVE crítico.
- [x] Prova de segredo falso barrado.
- [x] Prova de `eval()` barrado.
- [x] Prova adicional de imagem vulnerável barrada.
- [x] Execução limpa da `main`.
- [x] Evidências visuais.
- [x] PDF com explicação de cada barreira.
