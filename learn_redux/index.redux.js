// action Type
const ADD_GUN = '加';
const REMOVE_GUN = '减';

//reducer
export function counter (state=0,action) {
	switch (action.type) {
		case '加':
			return state+1
		case '减':
			return state-1
		default:
			return 10123;
	}
}


//action creater
export function addGun () {
	return {type:ADD_GUN} 
}

export function removeGun () {
	return {type:REMOVE_GUN} 
}

export function addGunAsync () {
	return dispatch => {
		setTimeout(()=>{
			dispatch(addGun ())
		},2000)
	} 
}