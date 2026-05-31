// Testes Unitários - Sistema de Cálculo de Frete

const testes = [];

// Função para adicionar testes
function adicionarTeste(nomeTeste, funcaoTeste) {
  testes.push({
    nome: nomeTeste,
    funcao: funcaoTeste,
    resultado: null,
    mensagem: ''
  });
}

// Função auxiliar para assertions
function assertEqual(obtido, esperado, mensagem = '') {
  if (obtido === esperado) {
    return true;
  } else {
    throw new Error(`Esperado: ${esperado}, Obtido: ${obtido}. ${mensagem}`);
  }
}

function assertTrue(valor, mensagem = '') {
  if (valor !== true) {
    throw new Error(`Esperado true, obtido ${valor}. ${mensagem}`);
  }
}

function assertFalse(valor, mensagem = '') {
  if (valor !== false) {
    throw new Error(`Esperado false, obtido ${valor}. ${mensagem}`);
  }
}

function assertNull(valor, mensagem = '') {
  if (valor !== null) {
    throw new Error(`Esperado null, obtido ${valor}. ${mensagem}`);
  }
}

// ==================== TESTES: obterFreteBase ====================

adicionarTeste('TU01 - obterFreteBase: Norte retorna 25', () => {
  assertEqual(obterFreteBase('norte'), 25.00, 'Frete do Norte deveria ser 25');
});

adicionarTeste('TU02 - obterFreteBase: Nordeste retorna 18', () => {
  assertEqual(obterFreteBase('nordeste'), 18.00, 'Frete do Nordeste deveria ser 18');
});

adicionarTeste('TU03 - obterFreteBase: Centro-Oeste retorna 15', () => {
  assertEqual(obterFreteBase('centro-oeste'), 15.00, 'Frete do Centro-Oeste deveria ser 15');
});

adicionarTeste('TU04 - obterFreteBase: Sudeste retorna 10', () => {
  assertEqual(obterFreteBase('sudeste'), 10.00, 'Frete do Sudeste deveria ser 10');
});

adicionarTeste('TU05 - obterFreteBase: Sul retorna 12', () => {
  assertEqual(obterFreteBase('sul'), 12.00, 'Frete do Sul deveria ser 12');
});

// ==================== TESTES: validarValorEntrega ====================

adicionarTeste('TU06 - validarValorEntrega: 100 é válido', () => {
  assertTrue(validarValorEntrega(100), 'Valor 100 deveria ser válido');
});

adicionarTeste('TU07 - validarValorEntrega: "100" (string) é válido', () => {
  assertTrue(validarValorEntrega('100'), 'String "100" deveria ser válida');
});

adicionarTeste('TU08 - validarValorEntrega: 0 é inválido', () => {
  assertFalse(validarValorEntrega(0), 'Valor 0 deveria ser inválido');
});

adicionarTeste('TU09 - validarValorEntrega: -50 é inválido', () => {
  assertFalse(validarValorEntrega(-50), 'Valor negativo deveria ser inválido');
});

adicionarTeste('TU10 - validarValorEntrega: null é inválido', () => {
  assertFalse(validarValorEntrega(null), 'null deveria ser inválido');
});

adicionarTeste('TU11 - validarValorEntrega: undefined é inválido', () => {
  assertFalse(validarValorEntrega(undefined), 'undefined deveria ser inválido');
});

adicionarTeste('TU12 - validarValorEntrega: string vazia é inválida', () => {
  assertFalse(validarValorEntrega(''), 'String vazia deveria ser inválida');
});

// ==================== TESTES: validarRegiao ====================

adicionarTeste('TU13 - validarRegiao: "norte" é válido', () => {
  assertTrue(validarRegiao('norte'), 'Região "norte" deveria ser válida');
});

adicionarTeste('TU14 - validarRegiao: "NORTE" (maiúscula) é válido', () => {
  assertTrue(validarRegiao('NORTE'), 'Região "NORTE" deveria ser válida');
});

adicionarTeste('TU15 - validarRegiao: "nordeste" é válido', () => {
  assertTrue(validarRegiao('nordeste'), 'Região "nordeste" deveria ser válida');
});

adicionarTeste('TU16 - validarRegiao: string vazia é inválida', () => {
  assertFalse(validarRegiao(''), 'String vazia deveria ser inválida');
});

adicionarTeste('TU17 - validarRegiao: null é inválido', () => {
  assertFalse(validarRegiao(null), 'null deveria ser inválido');
});

adicionarTeste('TU18 - validarRegiao: undefined é inválido', () => {
  assertFalse(validarRegiao(undefined), 'undefined deveria ser inválido');
});

adicionarTeste('TU19 - validarRegiao: região inválida é rejeitada', () => {
  assertFalse(validarRegiao('invalida'), 'Região inválida deveria ser rejeitada');
});

// ==================== TESTES: calcularFrete ====================

adicionarTeste('CT01 - calcularFrete: Valor 100, Sudeste = 10', () => {
  assertEqual(calcularFrete(100, 'sudeste'), 10.00, 'CT01 falhou');
});

adicionarTeste('CT02 - calcularFrete: Valor 250, Sul com desconto = 6', () => {
  assertEqual(calcularFrete(250, 'sul'), 6.00, 'CT02 falhou');
});

adicionarTeste('CT03 - calcularFrete: Valor 500, Norte frete grátis = 0', () => {
  assertEqual(calcularFrete(500, 'norte'), 0, 'CT03 falhou');
});

adicionarTeste('CT04 - calcularFrete: Valor 200, Nordeste sem desconto = 18', () => {
  assertEqual(calcularFrete(200, 'nordeste'), 18.00, 'CT04 falhou');
});

adicionarTeste('CT05 - calcularFrete: Valor 201, Nordeste com desconto = 9', () => {
  assertEqual(calcularFrete(201, 'nordeste'), 9.00, 'CT05 falhou');
});

adicionarTeste('CT06 - calcularFrete: Valor 600 frete grátis = 0', () => {
  assertEqual(calcularFrete(600, 'sudeste'), 0, 'CT06 falhou');
});

adicionarTeste('CT07 - calcularFrete: Valor inválido retorna null', () => {
  assertNull(calcularFrete(0, 'norte'), 'Deveria retornar null para valor inválido');
});

adicionarTeste('CT08 - calcularFrete: Região inválida retorna null', () => {
  assertNull(calcularFrete(100, ''), 'Deveria retornar null para região inválida');
});

// ==================== TESTES: aplicarDesconto ====================

adicionarTeste('TU20 - aplicarDesconto: Valor 100 com frete 10 sem desconto = 10', () => {
  assertEqual(aplicarDesconto(10, 100), 10.00, 'Desconto não deveria ser aplicado');
});

adicionarTeste('TU21 - aplicarDesconto: Valor 250 com frete 12 com desconto = 6', () => {
  assertEqual(aplicarDesconto(12, 250), 6.00, 'Desconto de 50% não foi aplicado corretamente');
});

adicionarTeste('TU22 - aplicarDesconto: Valor 200.01 com frete 18 com desconto = 9', () => {
  assertEqual(aplicarDesconto(18, 200.01), 9.00, 'Desconto de 50% não foi aplicado corretamente');
});

// ==================== EXECUTAR TESTES ====================

function executarTestes() {
  let aprovados = 0;
  let reprovados = 0;

  console.log('═══════════════════════════════════════════════════════════');
  console.log('  EXECUTANDO TESTES UNITÁRIOS - SISTEMA DE FRETE');
  console.log('═══════════════════════════════════════════════════════════\n');

  testes.forEach((teste, indice) => {
    try {
      teste.funcao();
      teste.resultado = 'aprovado';
      teste.mensagem = '';
      aprovados++;
      console.log(`✓ ${teste.nome}`);
    } catch (erro) {
      teste.resultado = 'reprovado';
      teste.mensagem = erro.message;
      reprovados++;
      console.log(`✗ ${teste.nome}`);
      console.log(`  └─ ${erro.message}`);
    }
  });

  // Resumo
  const total = testes.length;
  const percentual = ((aprovados / total) * 100).toFixed(2);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  RELATÓRIO DE TESTES');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Total de testes: ${total}`);
  console.log(`✓ Aprovados: ${aprovados}`);
  console.log(`✗ Reprovados: ${reprovados}`);
  console.log(`Percentual de sucesso: ${percentual}%`);
  console.log('═══════════════════════════════════════════════════════════\n');

  return {
    total,
    aprovados,
    reprovados,
    percentual,
    testes
  };
}

// Exportar função para uso no testRunner
function runTests() {
  return executarTestes();
}
