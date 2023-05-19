import moment from 'moment'

export function chunkify(intervals, selectedDay, duration = 2) {
  const res = []

  for (let i = intervals.startTime; i < intervals.endTime; i += duration) {
    if (moment().hour() < i && moment().isSame(selectedDay, 'day')) {
      res.push(i)
    }
    if (moment(selectedDay).isAfter(moment(), 'day')) {
      res.push(i)
    }
  }
  return res
}
