/**
 * Created by dengjing on 16/3/7.
 */
Template.layout.onCreated(() => {
    // favicon
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/favicon.ico';
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src = 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js';
    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(elem);
    $('html').attr("xmlns:wb","http://open.weibo.com/wb");
});