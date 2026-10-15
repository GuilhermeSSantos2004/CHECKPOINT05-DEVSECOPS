# CP05 - Relatório de Evidências do Pipeline DevSecOps

## Objetivo

O pipeline foi criado para impedir três classes de risco antes da entrega:

1. vazamento de segredos;
2. padrões de código vulnerável;
3. imagem de container com vulnerabilidade crítica.

O workflow está em `.github/workflows/security.yml` e executa **Gitleaks, Semgrep e Trivy**.

## 1. Pipeline limpo

**Branch:** `main`  
**Run:** [#6](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662611345)  
**Resultado:** SUCCESS

Os três jobs terminaram com sucesso. No Trivy, a imagem baseada em Alpine 3.24.2 apresentou **0 vulnerabilidades** dentro da política configurada.

![Main limpa](evidencias/01_main_sucesso.svg)

## 2. Prova 1 - Gitleaks

**Branch:** `test/gitleaks-sabotage`  
**Run:** [#9](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662683841)  
**Resultado:** FAILURE

Foi versionado um arquivo de sabotagem contendo somente credenciais falsas. O Gitleaks apontou:

- `aws-access-token` na linha 3;
- `generic-api-key` na linha 4;
- **2 leaks encontrados**.

O job terminou com falha, comprovando que o pipeline barra o vazamento antes da aprovação da alteração.

![Gitleaks](evidencias/02_gitleaks_bloqueio.svg)

## 3. Prova 2 - Semgrep

**Branch:** `test/semgrep-sabotage`  
**Run:** [#8](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662624561)  
**Resultado:** FAILURE

O arquivo `security-tests/vulnerable_eval.py` contém propositalmente:

```python
result = eval(user_input)
```

A regra `python-dangerous-eval` gerou **1 finding bloqueante** e o processo terminou com `exit code 1`.

![Semgrep](evidencias/03_semgrep_bloqueio.svg)

## 4. Barreira de imagem - Trivy

**Branch:** `test/trivy-sabotage`  
**Run:** [#11](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662696322)  
**Resultado:** FAILURE

A sabotagem usa deliberadamente uma imagem antiga apenas para a prova. O Trivy detectou Debian 9.8 fora de suporte e retornou:

- **Total: 27 (CRITICAL: 27)**;
- exemplo: `CVE-2022-1664`, severidade `CRITICAL`;
- processo encerrado com `exit code 1`.

![Trivy](evidencias/04_trivy_bloqueio.svg)

## 5. Como cada barreira protege a entrega

**Gitleaks:** evita que chaves, tokens e credenciais sejam incorporados ao histórico do repositório.

**Semgrep:** faz análise estática do código e interrompe a entrega quando encontra padrões classificados como inseguros pela política do projeto.

**Trivy:** analisa a imagem realmente construída pelo Dockerfile e impede que uma imagem com CVE crítico corrigível avance no pipeline.

## 6. Conclusão

As três verificações funcionam como gates independentes. A `main` passa quando o projeto está dentro da política, enquanto as branches de sabotagem provam que cada tipo de problema é detectado e bloqueado automaticamente.

As evidências visuais deste documento foram produzidas a partir dos trechos oficiais dos logs das execuções identificadas pelos Run IDs acima.

## PDF

[Baixar/abrir o PDF de evidências](CP05_RELATORIO_EVIDENCIAS.pdf)
