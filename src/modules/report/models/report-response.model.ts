export class ReportResponse {
    id: number;
    date: string;
    routeId: number;
    cargoId: number;
    autoOwnerId: number | null;
    cargoOwnerId: number | null;
    autoNum: string | null;
    driver: string | null;
    rate: number | null;
}
