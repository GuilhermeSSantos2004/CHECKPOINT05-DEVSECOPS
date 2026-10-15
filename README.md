# CHECKPOINT 05 - DEVSECOPS

![Security Pipeline](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/workflows/security.yml/badge.svg)

Checkpoint prático de **DevSecOps e Cloud Computing - FIAP / Engenharia de Software**.

O objetivo é implementar um pipeline de segurança no GitHub Actions capaz de bloquear:

- vazamento de segredos com **Gitleaks**;
- padrões de código vulnerável com **Semgrep**;
- imagens Docker com vulnerabilidades **CRITICAL** com **Trivy**.

## Integrantes

| Nome | RM |
|---|---:|
| Guilherme Santos | 551168 |
| Enricco | 551717 |
| Gabriel | 99227 |
| Danilo | 99465 |
| Laura | 98747 |

## Estrutura

```text
.
├── .github/workflows/security.yml
├── docs/
│   └── RELATORIO_EVIDENCIAS.md
├── site/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .dockerignore
├── .gitignore
├── .semgrep.yml
├── Dockerfile
└── README.md
```

## Pipeline de segurança

O workflow `.github/workflows/security.yml` executa três barreiras independentes em `push` e `pull_request`:

1. **Gitleaks** - procura credenciais, tokens e outros segredos no repositório.
2. **Semgrep** - executa análise estática e bloqueia uso de `eval(...)` no código Python.
3. **Trivy** - constrói a imagem Docker e falha se encontrar CVEs de severidade `CRITICAL`.

## Testes de sabotagem

As provas são feitas em branches separadas para não deixar vulnerabilidades na `main`:

- `test/gitleaks-sabotage`: contém um segredo propositalmente falso apenas para validar o bloqueio do Gitleaks.
- `test/semgrep-sabotage`: contém um arquivo Python com `eval(...)` apenas para validar o bloqueio do Semgrep.

Os resultados, links das execuções e explicações ficam em [docs/RELATORIO_EVIDENCIAS.md](docs/RELATORIO_EVIDENCIAS.md).

> Nenhuma credencial real é usada nos testes.

## Executar o site localmente

### Docker

```bash
docker build -t cp05-devsecops .
docker run --rm -p 8080:8080 cp05-devsecops
```

Acesse `http://localhost:8080`.

### Sem Docker

Abra `site/index.html` no navegador.

## Validar o Semgrep localmente

Com Docker:

```bash
docker run --rm -v "${PWD}:/src" semgrep/semgrep semgrep scan --config /src/.semgrep.yml --error /src
```

## Critérios atendidos

- [x] Repositório com site.
- [x] Dockerfile.
- [x] Workflow de segurança.
- [x] Job Gitleaks.
- [x] Job Semgrep.
- [x] Job Trivy para CVE crítico.
- [x] Teste de sabotagem de segredo falso.
- [x] Teste de sabotagem com `eval`.
- [x] Documentação das barreiras e evidências.
