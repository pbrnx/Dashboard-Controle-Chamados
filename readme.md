# Dashboard DPT — Controle de Chamados

Projeto real desenvolvido para a área de Processamento de Texto (DPT) da PwC. O dashboard foi criado para facilitar o controle e acompanhamento dos chamados, trazendo uma visão clara e ágil do status operacional, filtragem por etapas e navegação intuitiva.  
**Todos os dados sensíveis e identidades do cliente foram ocultados nesta publicação.**

---

## 🚀 Visão Geral

- **Objetivo:**  
  Automatizar e centralizar o controle de chamados do DPT, substituindo planilhas e controles manuais por uma visualização interativa, didática e eficiente.

- **Tecnologias Utilizadas:**  
  - HTML5
  - CSS3 (estilização customizada)
  - JavaScript (ES6+, sem frameworks)

---


## 📦 Estrutura do Projeto


    ├── index.html # Estrutura principal da página e markup dos dados
    └── assets/ # Imagens, logos e arquivos auxiliares (opcional)
        ├── style.css # Estilos customizados, animações e responsividade
        ├── script.js # Lógica de filtros, ordenação e cor de status

---


---

## 💡 Funcionalidades

- **Tabela dinâmica de chamados** com atualização em tempo real e status visual (cores).
- **Ordenação de colunas:**  
  - Prazo, Sequência e Data de abertura podem ser ordenadas ao clicar no cabeçalho.
- **Filtro por etapa:**  
  - Dropdown permite visualizar apenas tickets de determinada etapa.
- **Busca textual:**  
  - Pesquise por qualquer termo no conteúdo das linhas.
- **Legenda interativa:**  
  - Clicando nas cores, filtra apenas os chamados daquele status.
- **Lógica de cores automática:**  
  - Aplica regras visuais para fácil identificação do estado de cada chamado.
- **Animação de linhas:**  
  - Ao filtrar ou buscar, as linhas aparecem com transição suave.
- **Design responsivo:**  
  - Interface amigável, adaptável e sem poluição visual.

---

## 🧩 Lógica de Negócio

As regras de cor e filtro foram desenhadas para mapear o workflow do DPT.  
Abaixo, um resumo das classes e suas funções:

| Status                  | Classe CSS      | Cor         | Descrição                                              |
|-------------------------|-----------------|-------------|--------------------------------------------------------|
| Novo                    | `novo`          | Verde       | Ticket novo, ainda não tratado pela DPT                |
| Atrasado (fora do prazo)| `foraDoPrazo`   | Vermelho    | Prazo expirado                                         |
| Retorno da dúvida       | `duvida`        | Azul        | Ticket aguardando resposta do solicitante              |
| Assumido                | `assumido`      | Preto/Cinza | Em tratamento por responsável fora do DPT              |
| Não tratado             | `naoTratado`    | Roxo        | Transferido para operador/revisor, mas não processado  |

A aplicação dessas cores ocorre via função `applyColorLogic()` em [script.js](./script.js), baseada nos valores das células "Prazo", "Etapa" e "Setor".

---

## 🖥️ Demonstração

![image](https://github.com/user-attachments/assets/3fe70199-cfc4-47fa-9df1-e3d43688cca3)

*(Imagem ilustrativa, dados fictícios)*

---

## 🔍 Exemplos de Uso

- **Filtrar chamados atrasados:**  
  Clique no quadrado vermelho na legenda.
- **Buscar chamado pelo nome:**  
  Digite qualquer termo no campo "Pesquisa por texto".
- **Ver só uma etapa:**  
  Selecione a etapa desejada no dropdown "Filtrar por Step".
- **Ordenar por prazo:**  
  Clique no título da coluna "Prazo".

---

## 📑 Como Usar

1. Clone ou baixe este repositório.
2. Salve os arquivos em um diretório acessível (não é necessário backend).
3. Abra `index.html` em qualquer navegador moderno.
4. Personalize o arquivo conforme a necessidade da sua área ou projeto.

---

## 🛡️ Boas Práticas e Segurança

- Nenhum dado sensível do cliente é exposto na versão pública.
- Não há coleta de informações do usuário.
- Código 100% client-side, seguro para deploy interno.

---

## 🏆 Diferenciais e Resultados

- **Redução drástica** no tempo de resposta e gestão dos chamados.
- Facilidade na priorização e acompanhamento pelos gestores.
- Otimização da rotina do time DPT com um painel único e integrado.
- Eliminou duplicidade de controle e inconsistências de planilhas.

---

## 📝 Observações

- Este projeto foi criado como MVP e pode ser adaptado para consumir dados de APIs, bancos de dados, planilhas Google, etc.
- Layout e lógica podem ser facilmente customizados para outras áreas/processos.

---

## 👨‍💻 Autor

Desenvolvido por Pedro Barone (2025), como solução customizada para a área de Processamento de Texto da PwC.  
Contato para dúvidas, suporte ou customizações:  
[LinkedIn](https://www.linkedin.com/in/pedro-barone/) | [GitHub](https://github.com/pbrnx)

---

