# 📦 Sistema de Cálculo de Frete

> Uma aplicação web de cálculo de frete desenvolvida com JavaScript puro, com testes unitários customizados e testes E2E automatizados com Cypress.

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Tests](https://img.shields.io/badge/Tests-22%2B%20Unit%20%2B%20E2E-brightgreen?style=flat)](#-cobertura-de-testes)

## 🎯 Sobre o Projeto

Um sistema funcional e responsivo para calcular fretes em diferentes regiões do Brasil, demonstrando habilidades em:

- ✅ **Desenvolvimento Frontend** - HTML5, CSS3, JavaScript moderno
- ✅ **Arquitetura e Padrões** - Separação de responsabilidades, lógica isolada
- ✅ **Testes Unitários** - Test runner customizado com 22+ testes
- ✅ **Testes E2E** - Cypress com cenários realistas de uso
- ✅ **UI/UX Design** - Interface responsiva e moderna
- ✅ **Boas Práticas** - Código limpo, organizado e bem documentado

## 🚀 Quick Start

### Executar a Aplicação

```bash
# Simplesmente abra no navegador
src/index.html
```

### Executar Testes Unitários

```bash
# Abra no navegador
src/tests/testRunner.html
```

### Executar Testes E2E (Cypress)

```bash
# Instale dependências
cd cy_frete
npm install

# Execute os testes com Cypress
npx cypress open

# Ou rode em modo headless
npx cypress run
```

## 📊 Cobertura de Testes

| Tipo | Quantidade | Status |
|------|-----------|--------|
| Testes Unitários | 22+ | ✅ Todos passando |
| Testes E2E (Cypress) | 8+ | ✅ Todos passando |
| Cenários Cobertos | 30+ | ✅ 100% |

### Testes Unitários

- ✅ Validação de valores de entrega
- ✅ Validação de regiões
- ✅ Cálculo de frete com desconto
- ✅ Frete grátis (valores altos)
- ✅ Casos extremos (null, undefined, zero)

### Testes E2E (Cypress)

```
CT01 - Validação de Valores
  TC01 - Erro com valor negativo
  TC02 - Erro com valor zero
  TC03 - Sucesso com valor positivo
  TC04 - Sucesso com frete grátis

CT02 - Validação de Região
  TC01 - Erro sem selecionar região
  TC02 - Sucesso com região válida

CT03 - Cálculo por Região
  TC01-TC05 - Frete calculado corretamente por região
```

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
projeto/
├── src/                          # Aplicação principal
│   ├── index.html               # Entry point
│   ├── css/
│   │   └── style.css            # Estilos responsivos (290 linhas)
│   ├── js/
│   │   ├── frete.js             # Lógica de negócio (65 linhas)
│   │   └── app.js               # Gerenciador de interface (90 linhas)
│   └── tests/
│       ├── frete.test.js        # 22+ testes unitários
│       └── testRunner.html      # Interface de testes
│
├── cy_frete/                     # Cypress E2E tests
│   ├── cypress/
│   │   ├── e2e/                 # Specs de teste
│   │   ├── fixtures/            # Dados de teste
│   │   └── support/             # Configurações e helpers
│   ├── cypress.config.js
│   └── package.json
│
└── README.md
```

### Separação de Responsabilidades

**frete.js** - Lógica de Negócio Pura
```javascript
function calcularFrete(valorEntrega, regiao)
function obterFreteBase(regiao)
function aplicarDesconto(valorFrete, valorEntrega)
function validarValorEntrega(valor)
function validarRegiao(regiao)
```

**app.js** - Interface e Apresentação
```javascript
class InterfaceCalculadora {
  handleCalcular()
  exibirResultado()
  exibirErro()
  formatarMoeda()
}
```

## 🎨 Interface

### Design Responsivo
- 📱 Mobile-first approach
- 💻 Responsivo em todos os tamanhos
- ✨ Gradiente moderno
- 🎯 Card centralizado com sombras suaves

### Features da Interface
- Campo numérico com validação real-time
- Select dropdown com 5 regiões
- Botão com feedback visual
- Resultado destacado com detalhamento
- Mensagens de erro amigáveis
- Suporte a Enter para calcular

## 💼 Regras de Negócio

### RN01 - Frete Base por Região
| Região | Valor |
|--------|-------|
| Norte | R$ 25,00 |
| Nordeste | R$ 18,00 |
| Centro-Oeste | R$ 15,00 |
| Sudeste | R$ 10,00 |
| Sul | R$ 12,00 |

### RN02 - Desconto
- 50% de desconto se valor da entrega > R$ 200,00
- Exemplo: R$ 250 + Nordeste = R$ 9,00 (ao invés de R$ 18,00)

### RN03 - Frete Grátis
- Frete = R$ 0,00 se valor da entrega >= R$ 500,00

### RN04 - Validação de Valor
- Valor deve ser > 0
- Rejeita: zero, negativo, null, undefined
- Mensagem: "Informe um valor de entrega válido."

### RN05 - Validação de Região
- Região é obrigatória
- Rejeita: vazio, null, undefined, valor inválido
- Mensagem: "Selecione uma região."

## 🧪 Exemplos de Teste

### Teste Unitário
```javascript
adicionarTeste('CT02 - calcularFrete: Valor 250, Sul com desconto = 6', () => {
  assertEqual(calcularFrete(250, 'sul'), 6.00, 'CT02 falhou');
});
```

### Teste E2E (Cypress)
```javascript
it('TC01 - Validar ERRO com valor negativo', () => {
  cy.fillValue('negativeValue');
  cy.get('#regiao').select('Norte');
  cy.get('#calcularBtn').click();
  cy.get('#erro').should('be.visible')
    .and('contain', 'Informe um valor de entrega válido');
})
```

## 📈 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de Código (app) | ~245 |
| Linhas de Código (testes) | 500+ |
| Cobertura de Testes | 100% |
| Funcionalidades | 5 |
| Regiões Suportadas | 5 |
| Responsividade | Mobile-first |

## 🌟 Destaques Técnicos

### Positivos Demonstrados

✅ **Sem Dependências Externas**
- 100% JavaScript puro
- Sem frameworks (React, Vue, Angular)
- Sem bibliotecas de UI
- Aplicação roda offline

✅ **Código Limpo**
- Nomes em português (domínio do projeto)
- Funções pequenas e focadas
- Comentários apenas quando necessário
- Sem código duplicado

✅ **Arquitetura Sólida**
- Lógica de negócio isolada (frete.js)
- Interface separada (app.js)
- Estilos modulares (style.css)
- Testes desacoplados

✅ **Qualidade Assegurada**
- Testes unitários completos
- Testes E2E com Cypress
- Validações em todos os pontos críticos
- Tratamento de casos extremos

✅ **User Experience**
- Interface moderna e intuitiva
- Mensagens de erro claras
- Resultado detalhado com cálculos
- Design responsivo

## 🧠 Aprendizados Demonstrados

1. **JavaScript Vanilla**
   - Manipulação do DOM
   - Event listeners
   - Validação de formulários
   - Formatação de valores

2. **CSS Moderno**
   - Flexbox e Grid
   - Media queries responsivas
   - Gradientes
   - Animações suaves

3. **Testes de Software**
   - Testes unitários
   - Testes E2E
   - Test runners
   - Assertions customizadas

4. **Engenharia de Software**
   - SOLID principles
   - Separação de responsabilidades
   - Padrões de design
   - Code organization

5. **Ferramentas de Teste**
   - Cypress
   - Fixtures
   - Custom commands
   - Page object pattern

## 📋 Casos de Uso Testados

### Fluxo Feliz
```
✓ Usuário informa valor válido
✓ Usuário seleciona região
✓ Clica em "Calcular Frete"
✓ Resultado é exibido com detalhamento
```

### Validações
```
✓ Rejeita valor negativo
✓ Rejeita valor zero
✓ Rejeita região não selecionada
✓ Exibe mensagens apropriadas
```

### Casos Especiais
```
✓ Desconto aplicado corretamente (valor > 200)
✓ Frete grátis aplicado (valor >= 500)
✓ Case-insensitive para regiões
✓ Formatação de moeda brasileira
```

## 🛠️ Tech Stack

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura e semântica |
| **CSS3** | Estilização e responsividade |
| **JavaScript** | Lógica e interatividade |
| **Cypress** | Testes E2E automatizados |
| **npm** | Gerenciamento de dependências |

## 📚 Como Este Projeto Demonstra Competências

### Para Recrutadores
Este projeto demonstra:

1. **Capacidade de Implementação**
   - Código funcional e bem estruturado
   - Atenção aos detalhes (validações, casos extremos)
   - UI/UX considerada

2. **Qualidade de Código**
   - Separação clara de responsabilidades
   - Código legível e mantível
   - Sem dependências desnecessárias

3. **Mindset de Qualidade**
   - Cobertura completa de testes
   - Testes unitários + E2E
   - Validação automática

4. **Pensamento Crítico**
   - Identificação de casos de uso
   - Tratamento de erros
   - Planejamento arquitetural

5. **Versatilidade**
   - Frontend e testes
   - HTML, CSS, JavaScript
   - Ferramentas de teste modernas (Cypress)

## 🔄 Fluxo de Teste

```
1. Testes Unitários (frete.test.js)
   ↓ Validam lógica isolada
   
2. Testes E2E (Cypress)
   ↓ Validam experiência do usuário
   
3. Interface Visual
   ↓ Validação manual opcional
```

## 📝 Próximas Melhorias Possíveis

- [ ] Backend API (Node.js/Express)
- [ ] Banco de dados (regiões dinâmicas)
- [ ] Autenticação de usuários
- [ ] Histórico de cálculos
- [ ] Exportar relatórios (PDF)
- [ ] Modo dark/light theme
- [ ] Internacionalização (i18n)
- [ ] Progressive Web App (PWA)
- [ ] CI/CD pipeline
- [ ] Docker containerization

## 🤝 Contribuindo

Este é um projeto de portfólio, mas sugestões são bem-vindas!

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido como projeto de aprendizado e demonstração de competências em desenvolvimento web.

---

**Desenvolvido com ❤️ usando JavaScript puro**

[![Veja o Projeto](https://img.shields.io/badge/Ver%20Projeto-src/index.html-blue?style=flat&logo=github)](./src/index.html)
[![Rodar Testes](https://img.shields.io/badge/Rodar%20Testes-Cypress-green?style=flat&logo=cypress)](./cy_frete/)
