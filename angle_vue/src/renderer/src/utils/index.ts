export const getLanguage = (lang: string = 'zh-cn'): string => {
    if (typeof navigator === 'undefined') {
      return lang
    }
    if (navigator.languages && navigator.languages.length) {
      // 支持HTML5的浏览器语言设置
      lang = navigator.languages[0]
    } else if ((navigator as any).userLanguage) {
      // IE浏览器使用用户操作系统语言
      lang = (navigator as any).userLanguage
    } else {
      // 其他浏览器使用浏览器默认语言
      lang = navigator.language || (navigator as any).browserLanguage || (navigator as any).systemLanguage || (navigator as any).userLanguage || ''
    }
    if (lang && lang.indexOf('_') !== -1) {
      // 将语言转换成带下划线的格式
      lang = lang.split('_')[0] + '-' + lang.split('_')[1];
    }
    return lang.toLowerCase()
}
interface Position {
  latitude: number;
  longitude: number;
}
export const getLocation = (): Promise<Position> => {
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
        reject(new Error(`地理位置错误: ${error.message}`));
      }
    );
  });
}
