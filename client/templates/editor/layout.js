/**
 * Created by dengjing on 16/3/7.
 */
Template.layout.onCreated(() => {
    // favicon
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
});