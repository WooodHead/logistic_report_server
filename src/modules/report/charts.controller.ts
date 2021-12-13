import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { User } from '@prisma/client';
import { UserModel } from '../user/models/user.model';
import { MomentService } from '../../services/moment.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('charts')
export class ChartsController {
    constructor(
        private readonly reportService: ReportService,
        private readonly momentService: MomentService
    ) {}

    @Get('amount-per-year')
    async amountPerYear(@Req() req: { user: User }): Promise<any> {
        const curYearGroupByMonth = await this.reportService.rawQuery(
            `SELECT MONTH(date), COUNT(id) as amount
             FROM logistic_report.Report as t
             WHERE YEAR(t.date) = YEAR(CURRENT_DATE()) 
             AND t.userId = ${req.user.id}
             GROUP BY MONTH (date);`
        );
        const prevYearGroupByMonth = await this.reportService.rawQuery(`
            SELECT MONTH(date), COUNT(id) as amount
            FROM logistic_report.Report as t
            WHERE YEAR(t.date) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))
            AND t.userId = ${req.user.id}
            GROUP BY MONTH(date);
        `);

        const curYearChart = curYearGroupByMonth.map((val) => val.amount);
        const prevYearChart = prevYearGroupByMonth.map((val) => val.amount);
        return { curYearChart, prevYearChart };
    }

    @Get('top-routes')
    async topRoutes(@Req() req: { user: UserModel }): Promise<any> {
        const thisYear = await this.reportService.rawQuery(`
            SELECT t.routeId, COUNT(t.id) as amountThisYear, R.name
            FROM logistic_report.Report as t
                     JOIN logistic_report.Route R on t.routeId = R.id
            WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 31 DAY) AND NOW()
            AND t.userId = ${req.user.id}
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
            AND t.userId = ${req.user.id}
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

    @Get('races-per-week')
    async racesPerWeek(@Req() req: { user: UserModel }): Promise<any> {
        const weekRacesAmount = await this.reportService.rawQuery(`
            SELECT t.date, COUNT(t.id) as amount
            FROM logistic_report.Report as t
                     JOIN logistic_report.Route R on t.routeId = R.id
            WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 8 DAY) AND NOW()
              AND t.userId = ${req.user.id}
            GROUP BY date;
        `);

        const weekDays = [];
        const weekValues = [];

        const dateAmountMap = {};
        weekRacesAmount.forEach((data) => {
            const date = this.momentService.dateTimeFormat(data.date, 'YYYY-MM-DD');
            dateAmountMap[date] = data.amount;
        });

        const dayAmountMap = {};

        for (let i = 7; i >= 0; i--) {
            const date = this.momentService.extractFromToday(i, 'd');
            const dayName = this.momentService.weekDayByDate(date);
            dayAmountMap[i === 0 ? 'Today' : dayName] = dateAmountMap[date] || 0;
        }

        Object.keys(dayAmountMap).forEach((k) => {
            weekDays.push(k);
            weekValues.push(dayAmountMap[k]);
        });

        return { weekDays, weekValues };
    }

    @Get('cargo')
    async cargo(@Req() req: { user: UserModel }): Promise<any> {
        const cargosAmount = await this.reportService.rawQuery(`
            SELECT report.cargoId, COUNT(report.id) as amount, cargo.name
            FROM logistic_report.Report as report
                     JOIN logistic_report.Cargo cargo on report.cargoId = cargo.id
            WHERE report.userId = ${req.user.id}
            GROUP BY report.cargoId;
        `);

        const cargoNames = [];
        const cargoValues = [];

        cargosAmount.forEach(({ name, amount }) => {
            cargoNames.push(name);
            cargoValues.push(amount);
        });

        return { cargoNames, cargoValues };
    }
}
