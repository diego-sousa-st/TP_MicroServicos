export const api = {
	BASE_USER_API: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
	USER_SIGN_UP: '/signupNewUser?key=AIzaSyCPJo3FzQtWe989lTzjq83Sb0oCjGgf5Uk',
	USER_LOGIN: '/verifyPassword?key=AIzaSyCPJo3FzQtWe989lTzjq83Sb0oCjGgf5Uk',

	BASE_PRODUTO_API: 'https://treinamento-b24ad.firebaseio.com',
	CREATE_PRODUTO: '/produtos.json?auth={idToken}',
	UPDATE_PRODUTO: '/produtos/{idProduto}.json?auth={idToken}',
	GET_PRODUTOS: '/produtos.json',
	DELETE_PRODUTOS: '/produtos/{idProduto}.json?auth={idToken}'
}