export class DashboardResponseDto {
  readonly total: number;
  readonly confirmed: number;
  readonly notConfirmed: number;
  readonly attended: number;
  readonly nonPayingChildrenCount: number;

  constructor(props: {
    total: number;
    confirmed: number;
    notConfirmed: number;
    attended: number;
    nonPayingChildrenCount: number;
  }) {
    this.total = props.total;
    this.confirmed = props.confirmed;
    this.notConfirmed = props.notConfirmed;
    this.attended = props.attended;
    this.nonPayingChildrenCount = props.nonPayingChildrenCount;
  }
}
