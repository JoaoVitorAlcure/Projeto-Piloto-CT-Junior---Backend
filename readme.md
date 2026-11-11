# Inicialização do sistema

#### Inicialize o Docker
```
docker compose up -d
```

#### Crie o banco de dados
```
npx prisma migrate dev
```
#### Inicialize o servidor
```
npm run start:dev
```
---

## Documentação das rotas (Swagger)

Para acessar a documentação das rotas visualmente coloque o seguinte parametro a frente da URL em que o servidor está rodando:

```
/docs 
```

Ou caso deseje visualizar em JSON:
```
/docs/json
```
##### Exemplo:
```
http://localhost:5555/docs
http://localhost:5555/docs/json
```

## Caminho para a pasta de imagens (Opcional)
Será a pasta **@/imgs**, na qual @ é o caminho raiz de onde o projeto está rodando 
```
./imgs/
```