import pulitzerData from '../../../assets/datasets/pulitzer.csv?raw'
import {csvParse} from 'd3-dsv'

export const preparePulitzerData = () => {
  const re = new RegExp(/,/g)
  return csvParse(pulitzerData).map(d => ({
    newspaper: d.newspaper || '',
    daily_circulation_2004: Number(d.daily_circulation_2004?.replace(re,'') || 0),
    daily_circulation_2013: Number(d.daily_circulation_2013?.replace(re,'') || 0),
    pulitzer_prize_winners_and_finalists_1990_2003: Number(d.pulitzer_prize_winners_and_finalists_1990_2003 || 0),
    pulitzer_prize_winners_and_finalists_2004_2014: Number(d.pulitzer_prize_winners_and_finalists_2004_2014 || 0),
    pulitzer_prize_winners_and_finalists_1990_2014: Number(d.pulitzer_prize_winners_and_finalists_1990 || 0),
  }))
}