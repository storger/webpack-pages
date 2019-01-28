
import '../css/index.css'
import './_common/core.min.js'
import './_common/common.js'
import Router from './_common/router.js';

(function ($) {
	'use strict';
	$('.dropdown').on('show.bs.dropdown', function (e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
	});
	$('.dropdown').on('hide.bs.dropdown', function (e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
	});
	$('#navbarSupportedContent').on('click', '.dropdown-menu a.dropdown-toggle', function (e) {
		if (!$(this).next().hasClass('show')) {
			$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
		}
		let $subMenu = $(this).next(".dropdown-menu");
		$subMenu.toggleClass('show');

		$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
			$('.dropdown-submenu .show').removeClass("show");
		});
		return false;
	}).on('click', '.dropdown', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});
})(jQuery);

// 配置路由
const routes = {
	home: './home/home.html',
	modal: './component/modal.html',
	button: './component/button.html',
	alert: './component/alert.html',
	progress: './component/progress.html',
	tabs: './component/tabs.html',
	tippop: './component/tippop.html',

	baseform : './element/baseform.html',
	datatable:'./element/datatable.html',
}
// 路由切换后钩子函数
const afterEach = (route) => {
	$('.navbar-nav li').removeClass('active');
	$('[href="#' + route.name + '"]').parent().addClass('active').parents('li.dropdown').addClass('active');
	let contain = document.getElementById('main');
	$('iframe.show').fadeOut();
	$('iframe').removeClass('show');
	if ($("iframe[name='" + route.name + "']").length) {
		$("iframe[name='" + route.name + "']").fadeIn().addClass('show');
		return;
	}
	let iframe = document.createElement('iframe');
	iframe.className = 'show';
	iframe.src = route.path ;
	iframe.setAttribute('name', route.name);
	contain.appendChild(iframe);
}
// 实例化路由器
let router = new Router({
	routes: routes,
	afterEach: afterEach
});

let timeer = null;
clearInterval(timeer);
timeer = setInterval( () => {
	let firstIframe = $("iframe:first");
	if (firstIframe.length && !firstIframe.hasClass('show')) {
		firstIframe.remove();
	} else {
		clearInterval(timeer);
		return;
	}
}, 60000);