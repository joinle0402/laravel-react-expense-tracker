import dayjs from 'dayjs';

export function getCurrentDate() {
	return dayjs().format('YYYY-MM-DD');
}
