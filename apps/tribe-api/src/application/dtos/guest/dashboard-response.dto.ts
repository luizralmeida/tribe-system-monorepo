export class DashboardResponseDto {
  readonly total: number;
  readonly confirmed: number;
  readonly notConfirmed: number;
  readonly attended: number;

  constructor(props: {
    total: number;
    confirmed: number;
    notConfirmed: number;
    attended: number;
  }) {
    this.total = props.total;
    this.confirmed = props.confirmed;
    this.notConfirmed = props.notConfirmed;
    this.attended = props.attended;
  }
}
