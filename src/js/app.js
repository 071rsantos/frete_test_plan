// Gerenciador de Interface - Sistema de Cálculo de Frete

class InterfaceCalculadora {
  constructor() {
    this.inicializarElementos();
    this.adicionarListeners();
  }

  inicializarElementos() {
    this.inputValorEntrega = document.getElementById('valorEntrega');
    this.selectRegiao = document.getElementById('regiao');
    this.botaoCalcular = document.getElementById('calcularBtn');
    this.areaResultado = document.getElementById('resultado');
    this.areaErro = document.getElementById('erro');
  }

  adicionarListeners() {
    this.botaoCalcular.addEventListener('click', () => this.handleCalcular());

    // Permitir cálculo ao pressionar Enter
    this.inputValorEntrega.addEventListener('keypress', (evento) => {
      if (evento.key === 'Enter') {
        this.handleCalcular();
      }
    });
  }

  handleCalcular() {
    this.limparMensagens();

    const valor = this.inputValorEntrega.value;
    const regiao = this.selectRegiao.value;

    // Validar valor
    if (!validarValorEntrega(valor)) {
      this.exibirErro('Informe um valor de entrega válido.');
      return;
    }

    // Validar região
    if (!validarRegiao(regiao)) {
      this.exibirErro('Selecione uma região.');
      return;
    }

    // Calcular frete
    const numeroValor = parseFloat(valor);
    const frete = calcularFrete(numeroValor, regiao);

    if (frete !== null) {
      this.exibirResultado(numeroValor, regiao, frete);
    }
  }

  exibirResultado(valorEntrega, regiao, frete) {
    const freteBase = obterFreteBase(regiao);
    let detalhes = '';

    // Mostrar detalhes do cálculo
    detalhes += `<strong>Detalhamento:</strong><br>`;
    detalhes += `Valor da entrega: R$ ${this.formatarMoeda(valorEntrega)}<br>`;
    detalhes += `Região: ${this.capitalizarRegiao(regiao)}<br>`;
    detalhes += `Frete base: R$ ${this.formatarMoeda(freteBase)}<br>`;

    if (valorEntrega >= 500) {
      detalhes += `<span style="color: #27ae60;">✓ Frete grátis (entrega ≥ R$ 500)</span><br>`;
    } else if (valorEntrega > 200) {
      detalhes += `<span style="color: #2980b9;">✓ Desconto de 50% aplicado (entrega > R$ 200)</span><br>`;
    }

    detalhes += `<hr>`;
    detalhes += `<strong style="font-size: 1.3em; color: #27ae60;">Valor do Frete: R$ ${this.formatarMoeda(frete)}</strong>`;

    this.areaResultado.innerHTML = detalhes;
    this.areaResultado.style.display = 'block';
  }

  exibirErro(mensagem) {
    this.areaErro.innerHTML = `<strong>⚠ Erro:</strong> ${mensagem}`;
    this.areaErro.style.display = 'block';
  }

  limparMensagens() {
    this.areaResultado.style.display = 'none';
    this.areaErro.style.display = 'none';
    this.areaResultado.innerHTML = '';
    this.areaErro.innerHTML = '';
  }

  formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  capitalizarRegiao(regiao) {
    const nomes = {
      'norte': 'Norte',
      'nordeste': 'Nordeste',
      'centro-oeste': 'Centro-Oeste',
      'sudeste': 'Sudeste',
      'sul': 'Sul'
    };
    return nomes[regiao.toLowerCase()] || regiao;
  }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new InterfaceCalculadora();
});
