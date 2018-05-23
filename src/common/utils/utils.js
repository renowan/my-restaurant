export const changeDateFormat = (val, format) => {
  if (val.indexOf('/') > -1) {
    return val.replace(/\//g, '')
  } else {
    const y = val.slice(0, 4)
    const m = val.slice(4, 6)
    const d = val.slice(6, 8)
    return `${y}/${m}/${d}`
  }
}
