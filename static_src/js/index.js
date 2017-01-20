const Cookies = require('js-cookie');

import '../css/index.styl'

// для тестов нужно комментировать
import template from '../index.jade'

/* for test's mocha */
// const jsdom = require('jsdom');
// const document = jsdom.jsdom('');
// const window = document.defaultView;

document.addEventListener('DOMContentLoaded', addLink);

function addLink() {
	window.banner = function ($banner) {
		initialize($banner);
	}

	window.banner();
}

function initialize($banner) {
	$banner = $banner || document.querySelectorAll('[data-widget="banner-authorized"]');
	let bannerCookie;
	bannerCookie = cookieGet();
	if (!bannerCookie) {
		bannerCookie = coockieSet();
	}
	if (!$banner.length) {
		return;
	}
	dataLayerPush(bannerCookie);
	const bannerImg = bannerImage(bannerCookie.substr(-4));
	// const bannerImg = bannerCookie.substr(-4);
	// $banner.addClass(`msw-banner msw-banner-unauthorized${bannerImg}`);
	$banner[0].classList.add('msw-banner');
	$banner[0].insertAdjacentHTML('afterend', bannerImg);
}

function dataLayerPush(bannerCookie) {
	if (window.dataLayer) {
		window.dataLayer.push({ab_test: bannerCookie});
	} else {
		window.dataLayer = [];
		window.dataLayer.push({ab_test: bannerCookie});
	}
}

function bannerImage(name) {
	let content = `<div class='banner-authorized banner-authorized${name}'>
		<a href="javascript:void(0)" class="area-link"></a>
		<p class='font30'>Присоединяйтесь</p>
		<a href="javascript:void(0)" class='button-kit js-dataLayer'>Зарегистрироваться</a>
	</div>`;
	return content;
}

function cookieGet() {
	if (Cookies.get('ab_test')) {
		return Cookies.get('ab_test');
	}
}

function coockieSet() {
	const segmentCnt = 2; // количество значений
	let value = '';
	const hostName = window.location.hostname.split('.');
	const domainName = hostName.slice(-2, hostName.length).join('.');
	let number = Math.floor(Math.random() * segmentCnt) + 1;
	if (number === 1) {
		value = 'sing_up_man';
	} else {
		value = 'sing_up_axe';
	}
	Cookies.set('ab_test', value, {
		domain: domainName,
		expires: 30,
		path: '/'
	});
	return value;
}

export default coockieSet;