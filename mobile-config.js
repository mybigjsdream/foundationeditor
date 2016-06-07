/* globals App */
/* eslint-disable quote-props */

App.info({
  name: 'Todos',
  description: 'A simple todo list app built in Meteor.',
  author: 'Percolate Studio Team',
  email: 'chinadengjing@gmail.com',
  website: 'http://oforever.net',
  version: '0.0.1',
});

App.icons({
  // iOS
  'iphone_2x': 'public/resources/icons/icon-60x60@2x.png',
  'ipad': 'public/resources/icons/icon-76x76.png',
  'ipad_2x': 'public/resources/icons/icon-76x76@2x.png',

  // Android
  'android_mdpi': 'public/resources/icons/icon-48x48.png',
  'android_hdpi': 'public/resources/icons/icon-72x72.png',
  'android_xhdpi': 'public/resources/icons/icon-96x96.png',
});

App.launchScreens({
  // iOS
  'iphone_2x': 'public/resources/splash/splash-320x480@2x.png',
  'iphone5': 'public/resources/splash/splash-320x568@2x.png',
  'ipad_portrait': 'public/resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'public/resources/splash/splash-768x1024@2x.png',
  'ipad_landscape': 'public/resources/splash/splash-1024x768.png',
  'ipad_landscape_2x': 'public/resources/splash/splash-1024x768@2x.png',

  // Android
  'android_mdpi_portrait': 'public/resources/splash/splash-320x480.png',
  'android_mdpi_landscape': 'public/resources/splash/splash-480x320.png',
  'android_hdpi_portrait': 'public/resources/splash/splash-480x800.png',
  'android_hdpi_landscape': 'public/resources/splash/splash-800x480.png',
  'android_xhdpi_portrait': 'public/resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape': 'public/resources/splash/splash-1280x720.png',
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
