/**
 * Created by dengjing on 16/3/14.
 */
//Template.foundation.onRendered(function () {
//    $(document).foundation();
    //this.myRevealInstance = new Foundation.Reveal($('#foundation'));
//});

Template.foundation.onRendered(() => {
    $(document).foundation();
});

//Template.foundation.onDestroyed(function () {
//    let reveal = this.myRevealInstance;
//    if (reveal) {
//        reveal.destroy();
//    }
//});