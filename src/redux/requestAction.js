export const REQUEST = 'REQUEST';
export default function request(params) {
	return {
		...params, oldType: params.type, type: REQUEST
	};
}

