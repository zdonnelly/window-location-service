// emulate a full ES6 environment
// just import ONCE in this entry file is ok.
// http://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// normal code
import BaseSubject from './subjects/baseSubject';
import WindowLocationSubject from './subjects/windowLocationSubject';

export default {BaseSubject, WindowLocationSubject};