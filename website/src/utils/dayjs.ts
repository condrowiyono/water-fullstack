import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customeParseFormat from "dayjs/plugin/customParseFormat";

const defaultTimezone = "Asia/Singapore";

dayjs.extend(customeParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

dayjs.tz.setDefault(defaultTimezone);

const formatDateTime = (
  date: string | Date | dayjs.Dayjs = dayjs().tz(defaultTimezone),
  format = "DD MMMM YYYY HH:mm"
) => {
  return dayjs(date).tz(defaultTimezone).format(format);
};

const formatString = (date: string | Date | dayjs.Dayjs = dayjs().tz(defaultTimezone)) => {
  return dayjs(date).tz(defaultTimezone).format();
};

const setTimeToDate = (date: string | Date | dayjs.Dayjs, h = 0, m = 0, s = 0) => {
  return dayjs(date).tz(defaultTimezone).set("hour", h).set("minute", m).set("second", s);
};

const today = () => {
  return dayjs().tz(defaultTimezone);
};

const dayjsTz = (date: string | Date | dayjs.Dayjs = dayjs().tz(defaultTimezone)) => {
  return dayjs(date).tz(defaultTimezone);
};

export { defaultTimezone, formatString, today, setTimeToDate, formatDateTime, dayjsTz };
export default dayjs;
