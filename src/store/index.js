import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainServer:'http://127.0.0.1:8088',

    isAlert:false,
    alertText:'',
    alertType:'error',

    isCreateItem:false,
    isHeaderSidebar:false,

    isServerError:false,
    isLoading:true,


    openItemId: 0,
    openItemObject:{},
    isOpenItem:false,

    orderByObject:{},

    createdItem:{}




  },
  getters: {

  },
  mutations: {
    setError(state,{typeErr='error',textErr=''}){
      state.isAlert=true;
      state.alertText=textErr;
      state.alertType=typeErr;
      setTimeout(()=>{
        state.isAlert=false;
      }, 2000)

      if(textErr==='Ошибка сервера!'){
        state.isServerError=true;
      }
    },

    setIsServerError(state,isIt){
      state.isServerError=isIt
    },
    setIsCreateItem(state,isIt){
      state.isCreateItem=isIt;
    },

    setIsHeaderSidebar(state, isIt){
      state.isHeaderSidebar=isIt;

    },

    setCreatedItem(state, isIt){
      state.createdItem=isIt;
      state.isCreateItem=false;
      state.isOpenItem=false;

    },

    setIsLoading(state,isIt){
      state.isLoading=isIt;
    },

    setOpenItemUrl(state,urlText){
      state.openItemUrl=urlText
      state.orderByObject = {}
    },

    setOpenItemId(state,itemId){
      state.openItemId=itemId
    },

    setIsOpenItem(state,isIt){
      state.isOpenItem=isIt
    },

    setOpenItemObject(state,itemObj){
      state.openItemObject=itemObj

    },
    setOrderByObject(state,orderName){
      if(state.orderByObject.orderName===orderName){
        if (state.orderByObject.orderOrder === 'asc') {
          state.orderByObject = {orderName: orderName, orderOrder: 'desc'}
        } else {
          state.orderByObject = {orderName: orderName, orderOrder: 'asc'}
        }
      }
      else{
        state.orderByObject = {orderName: orderName, orderOrder: 'desc'}
      }
      },
      setOrderByObjectNull(state){
        state.orderByObject = {}
      }
  },



  actions: {
  },
  modules: {
  }
})
