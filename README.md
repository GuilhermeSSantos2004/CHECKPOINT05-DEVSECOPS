# CHECKPOINT 05 - DEVSECOPS

![Security Pipeline](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/workflows/security.yml/badge.svg)

Checkpoint da disciplina **DevSecOps and Cloud Computing - FIAP / Engenharia de Software**.

O objetivo do projeto foi montar um pipeline de segurança no GitHub Actions para impedir que alterações com segredos expostos, código vulnerável ou imagens Docker com vulnerabilidades críticas avancem no processo.

## Integrantes

| Nome | RM |
|---|---:|
| Guilherme Silva dos Santos | 551168 |
| Enricco Rossi de Souza Carvalho Miranda | 551717 |
| Gabriel Marquez Trevisan | 99227 |
| Danilo Urze Aldred | 99465 |
| Laura Claro Mathias | 98747 |

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── security.yml
├── docs/
│   ├── CP05_RELATORIO_EVIDENCIAS.pdf
│   ├── RELATORIO_EVIDENCIAS.md
│   ├── evidencias/
│   └── logs/
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

O workflow `.github/workflows/security.yml` é executado em `push`, `pull_request` e também pode ser iniciado manualmente.

### Gitleaks

Faz a varredura do repositório em busca de chaves, tokens e outros segredos que possam ter sido versionados por engano.

### Semgrep

Executa análise estática do código. Para o teste do checkpoint foi criada uma regra que bloqueia o uso de `eval(...)` em Python.

### Trivy

Constrói a imagem Docker e verifica vulnerabilidades. O job é interrompido quando encontra vulnerabilidades `CRITICAL` corrigíveis.

## Testes realizados

Os testes de sabotagem foram feitos em branches separadas para manter a `main` limpa.

### Pipeline principal

Na execução utilizada como evidência, os três jobs terminaram com sucesso:

- Gitleaks - Secret Scanning
- Semgrep - SAST
- Trivy - Container CVE Scan

[Run #13 - main aprovada](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38664072536)

### Teste do Gitleaks

Foi adicionado um segredo falso na branch `test/gitleaks-sabotage`. O Gitleaks identificou os valores de teste e encerrou o job com falha.

[Run #9 - Gitleaks](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662683841)

### Teste do Semgrep

Na branch `test/semgrep-sabotage` foi utilizado `eval(user_input)`. A regra `python-dangerous-eval` encontrou o trecho como bloqueante e o job terminou com `exit code 1`.

[Run #8 - Semgrep](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662624561)

### Teste do Trivy

Na branch `test/trivy-sabotage` foi usada uma imagem antiga somente para o teste. O Trivy encontrou **27 vulnerabilidades CRITICAL** e bloqueou a execução.

[Run #11 - Trivy](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662696322)

## Executando o site

```bash
docker build -t cp05-devsecops .
docker run --rm -p 8080:8080 cp05-devsecops
```

Depois, acesse:

```text
http://localhost:8080
```

## Documentação

O diretório `docs/` reúne o relatório do checkpoint, os registros das execuções e o material utilizado para documentar os testes.

- [Relatório de evidências em Markdown](docs/RELATORIO_EVIDENCIAS.md)
- [Relatório em PDF](docs/CP05_RELATORIO_EVIDENCIAS.pdf)

## Conclusão

Os testes permitiram validar as três barreiras separadamente. O Gitleaks bloqueou o segredo falso, o Semgrep identificou o uso vulnerável de `eval(...)` e o Trivy interrompeu a execução ao encontrar CVEs críticos. Na branch `main`, o pipeline foi executado sem falhas.
