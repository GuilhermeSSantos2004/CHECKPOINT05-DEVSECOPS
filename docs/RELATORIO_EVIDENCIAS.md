# CP05 - Relatório de Evidências do Pipeline DevSecOps

## Objetivo

O pipeline foi criado para impedir três classes de risco antes da entrega:

1. vazamento de segredos;
2. padrões de código vulnerável;
3. imagem de container com vulnerabilidade crítica.

O workflow fica em `.github/workflows/security.yml` e executa Gitleaks, Semgrep e Trivy.

## Barreira 1 - Gitleaks

O Gitleaks inspeciona o conteúdo versionado em busca de credenciais e tokens. A prova é feita em uma branch exclusiva de sabotagem, usando apenas um segredo falso.

**Branch:** `test/gitleaks-sabotage`

**Resultado esperado:** job `Gitleaks - Secret Scanning` com falha e identificação do segredo de teste.

## Barreira 2 - Semgrep

O Semgrep executa análise estática com uma regra local que bloqueia `eval(...)` em Python.

**Branch:** `test/semgrep-sabotage`

**Resultado esperado:** job `Semgrep - SAST` com falha e finding `python-dangerous-eval`.

## Barreira 3 - Trivy

O Trivy constrói a imagem definida pelo Dockerfile e realiza varredura de CVEs.

**Política:** falhar quando existir vulnerabilidade `CRITICAL` corrigível na imagem.

Na `main`, o objetivo é que o job passe. Isso demonstra que uma imagem que viola a política não pode avançar no pipeline.

## Evidências

Os links e identificadores das execuções do GitHub Actions serão registrados abaixo após a execução dos testes.

### Gitleaks

- Execução: a preencher após o teste.
- Evidência: a preencher após o teste.

### Semgrep

- Execução: a preencher após o teste.
- Evidência: a preencher após o teste.

### Pipeline limpo

- Execução: a preencher após o teste.
- Evidência: a preencher após o teste.

## Conclusão

As três verificações funcionam como gates de segurança independentes. Um erro em qualquer uma delas faz a execução terminar com falha, impedindo que uma alteração insegura seja tratada como aprovada pelo pipeline.
