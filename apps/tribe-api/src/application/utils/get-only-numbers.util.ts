/**
 * Remove todos os caracteres não numéricos de uma string.
 * @param value - A string original (ex: "123.456.789-00")
 * @returns Apenas os números (ex: "12345678900")
 */
export function getOnlyNumbers(value: string): string {
  return value ? value.replace(/\D/g, '') : '';
}