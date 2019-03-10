import regeneratorRuntime from '../../libs/regenerator-runtime.js'
import interaction from '../../utils/interaction.js';
import login from '../../utils/login.js'

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