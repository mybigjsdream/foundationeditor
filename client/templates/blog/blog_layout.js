/**
 * Created by dengjing on 16/3/14.
 */

Template.blog_layout.onRendered(() => {
    var loadfounfation = () => {
        $(document).foundation();
    };
    interval = setInterval(loadfounfation, 1000);
});
