import Counter from './components/counter.vue'
import Simple from './components/simple.vue'
import Event from './components/event.vue'
import Vue from 'vue'
//import Nest from './components/nest.vue'

const errorHandler = (error, vm) => {
  console.error('--------------------------------------------------------------------')
  throw error

}

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);

describe('base', () => {
  let scratch

  before(() => {
    scratch = document.createElement('div')
    scratch.id = 'app'
    document.body.appendChild(scratch)
  })

  beforeEach(() => {
    scratch.innerHTML = ''
  })

  after(() => {
    scratch.parentNode && scratch.parentNode.removeChild(scratch)
    scratch = null
  })

  it('simple test', () => {

    new Vue({
      render: h => h(Counter)
    }).$mount('#app')

    // Vue.nextTick(()=>{
    //   done()
    // })

    expect(document.querySelector('#app').innerHTML).to.equal('<span class="count">0</span> <button>Increment</button>')

  })

  it('simple test', () => {

    new Vue({
      render: h => h(Simple)
    }).$mount('#app')

    expect(document.querySelector('#app').innerHTML).to.equal('<span class="count">2</span> <button>Increment</button>')

  })


  it('simple event test', (done) => {

    new Vue({
      render: h => h(Event)
    }).$mount('#app')

    document.querySelector('#btn').click()

    Vue.nextTick(() => {
      done()
      expect(document.querySelector('#app').innerHTML)
        .to.equal('<span class="count">3</span> <button id="btn">Increment</button>')
    })
  })

  it('multi-store test', (done) => {

    new Vue({
      render: h => h(require('./components/multi-store.vue')
        .default)
    }).$mount('#app')

    document.querySelector('#btn').click()

    Vue.nextTick(() => {
      done()
      expect(document.querySelector('#app').innerHTML)
        .to.equal('<span class="count">1</span> <button id="btn">sub</button>')
    })
  })

  // it('nest test', (done) => {
  //   reset()
  //   new Vue({
  //     render: h => h(require('./components/nest.vue')
  //       .default)
  //   }).$mount('#app')

  //   //document.querySelector('#btn').click()

  //   Vue.nextTick(() => {
  //     done()
  //     expect(document.querySelector('#app').innerHTML)
  //       .to.equal('<span class="count">1</span> <button id="btn">sub</button>')
  //   })
  // })


})