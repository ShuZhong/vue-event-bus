import { JSDOM } from 'jsdom'

let { window } = new JSDOM('<!doctype html><html><body></body></html>')

global['window'] = window
global['document'] = window.document
global['navigator'] = { userAgent: 'node.js' }
global['HTMLElement'] = window.HTMLElement
