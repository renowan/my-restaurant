/*
 * 時間処理の関数群
 */

/**
 * 1時間4コマ、24時間分合計96個のelmを持つ、時間計算用の配列を取得
 * @return {array} 空の96個elmが入ってる配列
 */
export const createEmptyLine = () => {
  const timeLine = []
  for (let i = 0; i < 96; i++) {
    timeLine.push(0)
  }
  return timeLine
}

/**
 * 四桁の時間文字列を入れて、0600から何コマ目にあたるかを返す
 * @param  {string} time 0600から2900までの四桁の時間
 * @return {number}      0600から何コマ目にあたるかを返す
 */
export const getTimePoint = (time) => {
  const h = (Number(time.slice(0, 2)) - 6) * 4
  const m = Number(time.slice(2, 4)) / 15
  return h + m
}

/**
 * 0600から何コマ目の数字を入れて、四桁の時間文字列を返す
 * @param  {number} point 0600から何コマ目にあたるかの数字
 * @return {string}      0600から2900までの四桁の時間
 */
export const getTimeStrFromPoint = (point, format = 'HH:mm') => {
  const hours = Math.floor(point / 4)
  let hoursStr = String(6 + hours)
  const min = point % 4
  const minArr = ['00', '15', '30', '45']
  const minStr = minArr[min]

  return format.replace(
    /HH/g, ('0' + hoursStr).slice(-2)
  ).replace(
    /H/g, hoursStr
  ).replace(
    /mm/g, ('0' + minStr).slice(-2)
  ).replace(
    /m/g,
  )
}

/**
 * 開始時間と終了時間を入れてタイムラインを上書きする
 * @param  {array}  timeLine   タイムライン
 * @param  {string} startPoint 開始時間
 * @param  {string} endPoint   終了時間
 * @return {array}             変更済みの配列
 */
export const reWriteTimeLine = (timeLine, startPoint, endPoint, value = 1) => {
  const myTimeLine = timeLine.slice(0)
  for (let i = 0; i < myTimeLine.length; i++) {
    if (i >= startPoint && i < endPoint) {
      myTimeLine[i] = value
    }
  }
  return myTimeLine
}

export const getTimeLineIsEmpty = (timeLine, startPoint, endPoint) => {
  let result = true
  let index = 0
  while (index < timeLine.length) {
    if (index >= startPoint && index <= endPoint && timeLine[index] !== 0) {
      result = false
      break
    }
    index++
  }
  return result
}
