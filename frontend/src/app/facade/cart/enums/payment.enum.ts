export enum PaymentMethodIndex {
  DEBIT_CARD = 1,
  CREDIT_CARD,
  PIX,
  BOLETO,
  DINHEIRO,
}

export enum PaymentMethod {
  DEBIT_CARD = 'Débito',
  CREDIT_CARD = 'Crédito',
  PIX = 'PIX',
  BOLETO = 'Boleto',
  DINHEIRO = 'Dinheiro',
}

export enum PaymentStatus {
  PENDING = 1,
  COMPLETED,
  FAILED,
  REFUNDED,
}
