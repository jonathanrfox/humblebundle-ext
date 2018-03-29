const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');
const React = require('react');

Enzyme.configure({
    adapter: new Adapter()
});

global.React = React;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
global.shallow = Enzyme.shallow;
