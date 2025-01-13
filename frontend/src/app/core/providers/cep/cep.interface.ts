export interface AddressInfo {
  cep: string; // Código postal
  logradouro: string; // Rua/avenida/praça
  complemento: string; // Complemento do endereço
  unidade: string; // Unidade administrativa, se aplicável
  bairro: string; // Bairro
  localidade: string; // Cidade
  uf: string; // Unidade federativa (estado)
  estado: string; // Nome completo do estado
  regiao: string; // Região geográfica
  ibge: string; // Código IBGE do município
  gia: string; // Código GIA (se aplicável)
  ddd: string; // Código DDD da região
  siafi: string; // Código SIAFI
}
