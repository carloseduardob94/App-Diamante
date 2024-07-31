export type UserDTO = {
  id: string
  apolice: string
  customerName: string
  fim_vigencia: Date
  inicio_vigencia: Date
  objeto_segurado: string
  premio_total: string
  segurado: string
  seguradora: string
  ramo: string
  urlLogo: string
  vl_franquia: string
  cpf: string
  nascimento: string
  premioServico?: string | null | number
  vencimentoPrimeiraParcela?: string | null | number
  situacao: string
}