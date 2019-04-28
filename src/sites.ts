export default {
	'danbooru.donmai.us': {
		aliases: ['danbooru'],
		nsfw: true,
		endpoint: '/posts.json?',
		random: true
	},
	'konachan.com': {
		aliases: ['konachan'],
		nsfw: true,
		endpoint: '/post.json?',
		random: true
	},
	'konachan.net': {
		aliases: ['konachannet'],
		nsfw: false,
		endpoint: '/post.json?',
		random: true
	},
	'yande.re': {
		aliases: ['yandere'],
		nsfw: true,
		endpoint: '/post.json?',
		random: true
	},
	'lolibooru.moe': {
		aliases: ['loli', 'lolibooru'],
		nsfw: true,
		endpoint: '/post/index.json?',
		random: true
	},
	'gelbooru.com': {
		aliases: ['gelbooru'],
		nsfw: true,
		endpoint: '/index.php?page=dapi&s=post&q=index&json=1&',
		random: false
	},
	'rule34.xxx': {
		aliases: ['r34', 'rule34'],
		nsfw: true,
		endpoint: '/index.php?page=dapi&s=post&q=index&json=1&',
		random: false
	},
	'safebooru.org': {
		aliases: ['safebooru'],
		nsfw: false,
		endpoint: '/index.php?page=dapi&s=post&q=index&json=1&',
		random: false
	},
	'tbib.org': {
		aliases: ['tbib'],
		nsfw: false,
		endpoint: '/index.php?page=dapi&s=post&q=index&json=1&',
		random: false
	},
	'xbooru.com': {
		aliases: ['xbooru'],
		nsfw: false,
		endpoint: '/index.php?page=dapi&s=post&q=index&json=1&',
		random: false
	}
};
