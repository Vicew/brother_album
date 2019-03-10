import login from '../../utils/login.js'
import regeneratorRuntime from '../../libs/regenerator-runtime.js'
// import interaction from '../../utils/interaction.js';

Page({

  data: {

  },

  onLoad: function (options) {
    this.goPage()
  },

  async goPage() {
    await login()
  }
})