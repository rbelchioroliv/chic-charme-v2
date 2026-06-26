// src/lib/pix.ts

export function gerarPixCopiaECola(valor: number, chavePix: string, nomeBeneficiario: string, cidade: string) {
  const valorFormatado = valor.toFixed(2);

  // 1. Limpeza da chave
  let chaveFormatada = chavePix.replace(/\D/g, ''); 
  if (chaveFormatada.length === 11) chaveFormatada = '+55' + chaveFormatada;

  
  const formatar = (id: string, valor: string) => {
    const tamanho = valor.length.toString().padStart(2, '0');
    return `${id}${tamanho}${valor}`;
  };

  // 2. Montagem do Campo 26 (Identificador da Chave)
  const tag00_26 = formatar("00", "br.gov.bcb.pix");
  const tag01_26 = formatar("01", chaveFormatada);
  const campo26 = formatar("26", tag00_26 + tag01_26);

  // 3. Montagem do Campo 62 (Dados Adicionais)
  const tag50_00 = formatar("00", "br.gov.bcb.brcode");
  const tag50_01 = formatar("01", "1.0.0");
  const tag50 = formatar("50", tag50_00 + tag50_01);
  const campo62 = formatar("62", formatar("05", "***") + tag50);

  // 4. Montagem final
  const payload = [
    formatar("00", "01"), // Payload Format Indicator
    campo26,
    formatar("52", "0000"), // Merchant Category Code
    formatar("53", "986"),  // Moeda (BRL)
    formatar("54", valorFormatado),
    formatar("58", "BR"),
    formatar("59", nomeBeneficiario.substring(0, 25).toUpperCase()),
    formatar("60", cidade.substring(0, 15).toUpperCase()),
    campo62,
    "6304" // Prefixo do CRC16
  ].join('');

  return payload + calcularCRC16(payload);
}

function calcularCRC16(payload: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : (crc << 1);
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}