# CP05 - Relatório de Evidências do Pipeline DevSecOps

## Integrantes

| Nome | RM |
|---|---:|
| Guilherme Silva dos Santos | 551168 |
| Enricco Rossi de Souza Carvalho Miranda | 551717 |
| Gabriel Marquez Trevisan | 99227 |
| Danilo Urze Aldred | 99465 |
| Laura Claro Mathias | 98747 |

## Objetivo

O pipeline foi configurado para bloquear três situações durante a integração do projeto:

1. segredos versionados no repositório;
2. código vulnerável;
3. imagem Docker com vulnerabilidade crítica.

O workflow está em `.github/workflows/security.yml` e utiliza Gitleaks, Semgrep e Trivy.

## Pipeline principal

**Branch:** `main`  
**Run:** [#13](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38664072536)  
**Resultado:** SUCCESS

Os três jobs foram concluídos com sucesso na branch principal.

## Teste 1 - Gitleaks

**Branch:** `test/gitleaks-sabotage`  
**Run:** [#9](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662683841)  
**Resultado:** FAILURE

Para testar a primeira barreira foi adicionado um arquivo com credenciais falsas. O Gitleaks encontrou:

- `aws-access-token` na linha 3;
- `generic-api-key` na linha 4;
- 2 leaks no total.

O teste mostra que o job é interrompido quando um segredo é versionado.

## Teste 2 - Semgrep

**Branch:** `test/semgrep-sabotage`  
**Run:** [#8](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662624561)  
**Resultado:** FAILURE

O arquivo de teste contém:

```python
result = eval(user_input)
```

A regra `python-dangerous-eval` identificou o trecho como bloqueante. O Semgrep registrou 1 finding e encerrou o job com `exit code 1`.

## Teste 3 - Trivy

**Branch:** `test/trivy-sabotage`  
**Run:** [#11](https://github.com/GuilhermeSSantos2004/CHECKPOINT05-DEVSECOPS/actions/runs/38662696322)  
**Resultado:** FAILURE

Para validar a análise da imagem foi usada uma versão antiga do Nginx somente na branch de teste. O Trivy detectou Debian 9.8 e apresentou **27 vulnerabilidades CRITICAL**. Entre os resultados aparece a `CVE-2022-1664` no pacote `dpkg`.

## Conclusão

Os testes foram separados por branch para facilitar a identificação de cada falha. O Gitleaks bloqueou o segredo falso, o Semgrep apontou o uso de `eval(...)` e o Trivy bloqueou a imagem vulnerável. Depois dos testes, a branch `main` permaneceu com os três jobs aprovados.
