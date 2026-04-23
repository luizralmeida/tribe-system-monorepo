export const UserRole = {
  SUPER: 'SUPER',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
  CHECKER: 'CHECKER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.SUPER]: 'Admin',
  [UserRole.EDIT]: 'Anfitrião',
  [UserRole.VIEW]: 'Visualização',
  [UserRole.CHECKER]: 'Segurança',
};

export const GuestStatus = {
  CONFIRMED: 'CONFIRMED',
  NOT_CONFIRMED: 'NOT_CONFIRMED',
  NOT_COMING: 'NOT_COMING',
} as const;

export type GuestStatus = (typeof GuestStatus)[keyof typeof GuestStatus];

export const BrazilianState = {
  AC: 'AC',
  AL: 'AL',
  AP: 'AP',
  AM: 'AM',
  BA: 'BA',
  CE: 'CE',
  DF: 'DF',
  ES: 'ES',
  GO: 'GO',
  MA: 'MA',
  MT: 'MT',
  MS: 'MS',
  MG: 'MG',
  PA: 'PA',
  PB: 'PB',
  PR: 'PR',
  PE: 'PE',
  PI: 'PI',
  RJ: 'RJ',
  RN: 'RN',
  RS: 'RS',
  RO: 'RO',
  RR: 'RR',
  SC: 'SC',
  SP: 'SP',
  SE: 'SE',
  TO: 'TO',
} as const;

export type BrazilianState = (typeof BrazilianState)[keyof typeof BrazilianState];

