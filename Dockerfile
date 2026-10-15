# Imagem antiga usada SOMENTE para provar o bloqueio do Trivy no CP05.
FROM nginx:1.14.2

COPY site/ /usr/share/nginx/html/

EXPOSE 80
