import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('charts')
export class ChartsController {
    constructor(private readonly reportService: ReportService) {}

    @Get('amount-per-year')
    async amountPerYear(): Promise<any> {
        const curYearGroupByMonth = await this.reportService.rawQuery(
            `SELECT MONTH(date), COUNT(id) as amount
             FROM logistic_report.Report as t
             WHERE YEAR(t.date) = YEAR(CURRENT_DATE())
             GROUP BY MONTH(date);`
        );
        const prevYearGroupByMonth = await this.reportService.rawQuery(`
            SELECT MONTH(date), COUNT(id) as amount
            FROM logistic_report.Report as t
            WHERE YEAR(t.date) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))
            GROUP BY MONTH(date);
        `);

        const curYearChart = curYearGroupByMonth.map((val) => val.amount);
        const prevYearChart = prevYearGroupByMonth.map((val) => val.amount);
        return { curYearChart, prevYearChart };
    }

    @Get('top-routes')
    async topRoutes(): Promise<any> {
        const thisYear = await this.reportService.rawQuery(`
            SELECT t.routeId, COUNT(t.id) as amountThisYear, R.name
            FROM logistic_report.Report as t
                     JOIN logistic_report.Route R on t.routeId = R.id
            WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 31 DAY) AND NOW()
            GROUP BY routeId
            ORDER BY COUNT(t.id) DESC
            LIMIT 5;
        `);
        const prevYear = await this.reportService.rawQuery(`
            SELECT routeId, COUNT(t.id) as amountPrevYear, R.name
            FROM logistic_report.Report as t
                     JOIN logistic_report.Route R on t.routeId = R.id
            WHERE date BETWEEN DATE_SUB(DATE_SUB(CURDATE()
                                            , INTERVAL 1 YEAR)
                , INTERVAL 31 DAY)
                      AND DATE_SUB(CURDATE()
                    , INTERVAL 1 YEAR)
            GROUP BY routeId
            ORDER BY COUNT(t.id) DESC;
        `);

        return thisYear.map((repThisYear) => {
            const findInPrev = prevYear.find(
                (repPrevYear) => repThisYear.routeId === repPrevYear.routeId
            );
            repThisYear.amountPrevYear = findInPrev ? findInPrev.amountPrevYear : 0;
            repThisYear.amountThisYear = repThisYear.amountThisYear || 0;
            return repThisYear;
        });
    }
}
