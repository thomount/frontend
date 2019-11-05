import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'
import Global from '@/config/global'

Vue.use(Vuex)

const state = {
	adminInfo: {
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {

	async getAdminData({commit}){
		if (Global.islogin == true)
			try{
				const res = await getAdminInfo({username: Global.username})
				if (res.status == 200) {
					let userinfo = res.data;
					userinfo.username = Global.username;
					commit('saveAdminInfo', userinfo);
				}else{
					throw new Error(res.type)
				}
			}catch(err){
				// console.log(err.message)
			}
	}

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
