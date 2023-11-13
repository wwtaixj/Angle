export const getNavLanguage = (): string => {
  let locale = '';
  if (typeof navigator === 'undefined') {
    return locale;
  }
  if (navigator.languages && navigator.languages.length) {
    // 支持HTML5的浏览器语言设置
    locale = navigator.languages[0];
  } else if ((navigator as any).userLanguage) {
    // IE浏览器使用用户操作系统语言
    locale = (navigator as any).userLanguage;
  } else {
    // 其他浏览器使用浏览器默认语言
    locale =
      navigator.language ||
      (navigator as any).browserLanguage ||
      (navigator as any).systemLanguage ||
      (navigator as any).userLanguage ||
      '';
  }
  if (locale && locale.indexOf('_') !== -1) {
    // 将语言转换成带下划线的格式
    locale = locale.split('_')[0] + '-' + locale.split('_')[1];
  }
  if (locale === 'en') return 'en-US';
  return locale;
};
interface Position {
  latitude: number;
  longitude: number;
}
/**
 * 获取地理位置
 * @returns
 */
export const getNavLocation = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('此浏览器不支持地理定位!'));
    }
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error: GeolocationPositionError) => {
        reject(new Error(error.message));
      }
    );
  });
};
