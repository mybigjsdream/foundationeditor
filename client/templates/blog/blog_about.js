/**
 * Created by dengjing on 16/4/15.
 */

Template.blog_about.onRendered(
    () => {
        let h = document.documentElement.clientHeight;
        let th = this.$('.blog_head').height();
        let fh = this.$('.footer').height();
        this.$('.base-content').css('min-height', h-th-fh);
    }
);

