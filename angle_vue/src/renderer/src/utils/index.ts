export const getNavLanguage = (lang: string = 'zh-cn'): string => {
	if (typeof navigator === 'undefined') {
		return lang;
	}
	if (navigator.languages && navigator.languages.length) {
		// 支持HTML5的浏览器语言设置
		lang = navigator.languages[0];
	} else if ((navigator as any).userLanguage) {
		// IE浏览器使用用户操作系统语言
		lang = (navigator as any).userLanguage;
	} else {
		// 其他浏览器使用浏览器默认语言
		lang =
			navigator.language ||
			(navigator as any).browserLanguage ||
			(navigator as any).systemLanguage ||
			(navigator as any).userLanguage ||
			'';
	}
	if (lang && lang.indexOf('_') !== -1) {
		// 将语言转换成带下划线的格式
		lang = lang.split('_')[0] + '-' + lang.split('_')[1];
	}
	return lang.toLowerCase();
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
declare type TargetContext = '_self' | '_blank';
export function openWindow(
	url: string,
	opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
	const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
	const feature: string[] = [];

	noopener && feature.push('noopener=yes');
	noreferrer && feature.push('noreferrer=yes');

	window.open(url, target, feature.join(','));
}
