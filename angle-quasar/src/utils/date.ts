export function formatTimestamp(timestamp: number | string | Date) {
  if (!timestamp) return;
  const date = new Date(timestamp);
  const now = new Date();

  // 补零函数
  const padZero = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  // 如果是今天
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  }
  // 如果是本月
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  ) {
    return `${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  }

  // 如果是今年
  if (date.getFullYear() === now.getFullYear()) {
    return `${now.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
      date.getDate()
    )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  }

  // 默认情况
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
    date.getDate()
  )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}
