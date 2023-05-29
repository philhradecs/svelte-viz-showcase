import { max } from 'd3-array';
import pulitzerData from '../../../assets/datasets/pulitzer.csv?raw';
import { csvParse } from 'd3-dsv';

export const preparePulitzerData = () => {
	const re = new RegExp(/,/g);
	const parsedData = csvParse(pulitzerData).map((d) => ({
		newspaper: d.newspaper || '',
		daily_circulation_2004: Number(d.daily_circulation_2004?.replace(re, '') || 0),
		daily_circulation_2013: Number(d.daily_circulation_2013?.replace(re, '') || 0),
		pulitzer_prize_winners_and_finalists_1990_2003: Number(
			d.pulitzer_prize_winners_and_finalists_1990_2003 || 0
		),
		pulitzer_prize_winners_and_finalists_2004_2014: Number(
			d.pulitzer_prize_winners_and_finalists_2004_2014 || 0
		),
		pulitzer_prize_winners_and_finalists_1990_2014: Number(
			d.pulitzer_prize_winners_and_finalists_1990 || 0
		)
	}));

	const pulitzerScatter2004 = parsedData.map((d) => ({
		x: d.daily_circulation_2004,
		y: d.pulitzer_prize_winners_and_finalists_1990_2003,
		z: d.newspaper,
		meta: { circulationYear: '2004', pulitzerPeriod: '1990 - 2003' }
	}));

	const pulitzerScatter2013 = parsedData.map((d) => ({
		x: d.daily_circulation_2013,
		y: d.pulitzer_prize_winners_and_finalists_2004_2014,
		z: d.newspaper,
		meta: { circulationYear: '2013', pulitzerPeriod: '2004 - 2014' }
	}));

  const maxCirculation = max([...pulitzerScatter2004, ...pulitzerScatter2013], (d) => d.x) || 0;
	const maxWinners = max([...pulitzerScatter2004, ...pulitzerScatter2013], (d) => d.y) || 0;

	return { pulitzerScatter2004, pulitzerScatter2013, maxCirculation, maxWinners };
};
