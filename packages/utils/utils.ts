/**
 * 创建定时器
 */
export class CreatTimer {
  diff: number
  counting: boolean
  endTime: number
  time: number
  timerId: any
  constructor(startTime: number) {
    this.diff = startTime ? Date.now() - startTime : 0
    this.counting = false
    this.endTime = 0
    this.time = 0
  }
  start(callback: (time: number) => void) {
    if (this.counting) {
      return
    }
    this.counting = true
    this.endTime = Date.now() - this.time
    this.microTick(callback)
  }
  pause() {
    if (!this.counting) {
      return
    }
    this.counting = false
    window.cancelAnimationFrame(this.timerId)
  }
  clear() {
    if (!this.counting) {
      return
    }
    this.counting = false
    window.cancelAnimationFrame(this.timerId)
  }
  microTick(callback: (time: number) => void) {
    this.timerId = window.requestAnimationFrame(() => {
      this.time = Date.now() - this.endTime
      callback(this.time + this.diff)
      this.microTick.call(this, callback)
    })
  }
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
export function parseTimeData(time: number) {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }
}

interface timeData {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function parseFormat(format: string, timeData: timeData) {
  const days = timeData.days
  let hours = timeData.hours,
    minutes = timeData.minutes,
    seconds = timeData.seconds,
    milliseconds = timeData.milliseconds

  if (format.indexOf('DD') === -1) {
    hours += days * 24
  } else {
    format = format.replace('DD', padZero(days))
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60
  } else {
    format = format.replace('HH', padZero(hours))
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60
  } else {
    format = format.replace('mm', padZero(minutes))
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000
  } else {
    format = format.replace('ss', padZero(seconds))
  }

  if (format.indexOf('S') !== -1) {
    const ms = padZero(milliseconds, 3)

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms)
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.charAt(0))
    }
  }
  return format
}

export function padZero(num: number, targetLength?: number): string {
  if (!targetLength) {
    targetLength = 2
  }

  let str = `${num}`

  while (str.length < targetLength) {
    str = `0${str}`
  }

  return str
}

export function parseStyleSize(size: number | string): number {
  if (typeof size === 'number') {
    return size
  }
  if (typeof size === 'string') {
    if (/^\d+(?:px)?$/.test(size)) {
      return parseInt(size, 10)
    } else {
      return parseInt(size)
    }
  }
  return 0
}
