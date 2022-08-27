import { DateTime } from 'luxon';

function getDeadline(estimationMinutes: number): DateTime {
	let startDate = DateTime.now();
	let monday = startDate.startOf('week').set({ hour: 10 });
	const offset = startDate.diff(monday, ['days', 'hours', 'minutes']);
	startDate = monday;
	const workMinutesPerHour = 60;
	const workMinutesPerDay = workMinutesPerHour * (19 - 10);
	const workMinutesPerWeek = workMinutesPerDay * 5;
	let deadlineTotalMinutes =
		estimationMinutes +
		Math.min(
			workMinutesPerWeek,
			offset.days * workMinutesPerDay +
				offset.hours * workMinutesPerHour +
				offset.minutes,
		);
	const deadlineWeeks = Math.floor(deadlineTotalMinutes / workMinutesPerWeek);
	deadlineTotalMinutes -= deadlineWeeks * workMinutesPerWeek;
	const deadlineDays = Math.floor(deadlineTotalMinutes / workMinutesPerDay);
	deadlineTotalMinutes -= deadlineDays * workMinutesPerDay;
	const deadlineHours = Math.floor(deadlineTotalMinutes / workMinutesPerHour);
	const deadlineMinutes = deadlineTotalMinutes % workMinutesPerHour;
	return startDate.plus({
		weeks: deadlineWeeks,
		days: deadlineDays,
		hours: deadlineHours,
		minutes: deadlineMinutes,
	});
}

console.log(getDeadline(1 * 60).toLocaleString(DateTime.DATETIME_FULL));
console.log(getDeadline(10 * 60).toLocaleString(DateTime.DATETIME_FULL));
console.log(getDeadline(15 * 60).toLocaleString(DateTime.DATETIME_FULL));
console.log(getDeadline(21 * 60).toLocaleString(DateTime.DATETIME_FULL));
// console.log(getDeadline(100 * 60).toLocaleString(DateTime.DATETIME_FULL));
