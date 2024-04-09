import { SET_LOADER } from "./actiontypes"

export const setLoader = (loader) => {
	return {
		type: SET_LOADER,
		payload: loader,
	}
}