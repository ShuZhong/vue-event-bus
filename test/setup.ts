import { JSDOM } from 'jsdom'
import * as chai from 'chai'
import * as spies from 'chai-spies'

let { window } = new JSDOM('<!doctype html><html><body></body></html>')

global['window'] = window
global['document'] = window.document
global['navigator'] = { userAgent: 'node.js' }
global['HTMLElement'] = window.HTMLElement
global['chai'] = chai
global['expect'] = chai.expect

chai.use(spies)
