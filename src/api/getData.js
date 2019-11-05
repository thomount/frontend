import fetch from '@/config/fetch'

export const mylogin = data => fetch('/api/user_login/', data, 'POST');

export const myregister = data => fetch('/api/user_register/', data, 'POST');

export const richtext = data => fetch('/api/rich_upload/', data, 'POST');

export const getrich = data => fetch('/api/rich_render/', data, 'POST');

export const changetop = data => fetch('/api/rich_top_rev/', data, 'POST');

export const getRichlist = data => fetch('/api/rich_list/', data, 'POST');

export const deleteRich = data => fetch('/api/rich_delete/', data, 'POST');

export const getUserlist = data => fetch('/api/user_list/', data, 'POST');

export const signout = () => fetch('/api/user_logout/', {}, 'POST');

export const getAdminInfo = data => fetch('/api/user_get_info/', data, 'POST');

export const changeUserauth = data => fetch('/api/user_change_auth/', data, 'POST');

export const changePsw = data => fetch('/api/user_change_psw/', data, 'POST');

export const getChargelist = data => fetch('/get_discount/', data, 'POST');
