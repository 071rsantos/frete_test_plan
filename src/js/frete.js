// Lógica de Negócio - Sistema de Cálculo de Frete

// RN01 - Obter frete base conforme região
function obterFreteBase(regiao) {
  const fretes = {
    'norte': 25.00,
    'nordeste': 18.00,
    'centro-oeste': 15.00,
    'sudeste': 10.00,
    'sul': 12.00
  };

  return fretes[regiao.toLowerCase()] || null;
}

// RN02 - Aplicar desconto de 50% se valor > 200
function aplicarDesconto(valorFrete, valorEntrega) {
  if (valorEntrega > 200) {
    return valorFrete * 0.5;
  }
  return valorFrete;
}

// RN03 - Frete grátis se valor >= 500
function calcularFrete(valorEntrega, regiao) {
  // Validar entrada
  if (!validarValorEntrega(valorEntrega)) {
    return null;
  }

  if (!validarRegiao(regiao)) {
    return null;
  }

  // RN03 - Frete grátis para entregas >= 500
  if (valorEntrega >= 500) {
    return 0;
  }

  // RN01 - Obter frete base
  let frete = obterFreteBase(regiao);

  // RN02 - Aplicar desconto se aplicável
  frete = aplicarDesconto(frete, valorEntrega);

  return frete;
}

// RN04 - Validar valor da entrega
function validarValorEntrega(valor) {
  // Verificar se é null ou undefined
  if (valor === null || valor === undefined) {
    return false;
  }

  // Converter para número se for string
  const numeroValor = parseFloat(valor);

  // Verificar se é um número válido e maior que zero
  if (isNaN(numeroValor) || numeroValor <= 0) {
    return false;
  }

  return true;
}

// RN05 - Validar se região foi selecionada
function validarRegiao(regiao) {
  if (regiao === null || regiao === undefined || regiao === '') {
    return false;
  }

  const regioesValidas = ['norte', 'nordeste', 'centro-oeste', 'sudeste', 'sul'];
  return regioesValidas.includes(regiao.toLowerCase());
}
