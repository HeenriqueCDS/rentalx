import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const endDateToUTC = this.convertToUTC(end_date)
        const startDatetoUTC = this.convertToUTC(start_date)

        return dayjs(endDateToUTC).diff(startDatetoUTC, "hours")
    }
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format()
    }

    dateNow(): Date {
        return dayjs().toDate()
    }

}

export { DayjsDateProvider }