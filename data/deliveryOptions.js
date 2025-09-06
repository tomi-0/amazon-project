import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
	{
		id: 1,
		deliveryDays: 7,
		priceCents: 0,
	},{
		id: 2,
		deliveryDays: 3,
		priceCents: 499,
	}, {
		id: 3,
		deliveryDays: 1,
		priceCents: 999,
	}
];

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOpt;
	deliveryOptions.forEach((option) => {
		if (option.id === deliveryOptionId) {
			deliveryOpt = option;
		}
	})

	return deliveryOpt || deliveryOptions[0];
}


// checks to see if day is a weekend
function isWeekend(day) {
	const weekday = day.format('dddd');
	return weekday==='Saturday' || weekday==='Sunday';
}

export function calculateDeliveryDate(deliveryOpt) {

	let daysLeft = deliveryOpt.deliveryDays;
	let deliveryDate = dayjs();

	// skips weekend delivery dates
	while (daysLeft > 0) {
			deliveryDate = deliveryDate.add(1, 'day');
			//deliveryDay = deliveryDate.format('dddd');
			console.log(!(isWeekend(deliveryDate)));
			if (!isWeekend(deliveryDate)) {
				daysLeft--;
			}
		}

	// formats delivery date
	const dateString = deliveryDate.format('dddd, MMMM, D');
	return dateString;
}

