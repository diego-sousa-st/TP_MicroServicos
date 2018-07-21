import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from './estoque.constants';
import { Produto } from './Produto.model';

@Injectable({
	providedIn: 'root'
})
export class ProdutoService {

	idToken: string;

	constructor(private httpClientService: HttpClient) { }

	setIdToken(id: string) {

		this.idToken = id;

	}

	getProdutos(): Observable<any> {

		return this.httpClientService.get(api.BASE_PRODUTO_API+api.GET_PRODUTOS);

	}

	createProduto(produto: Produto): Observable<any> {

		const res = api.CREATE_PRODUTO.replace('{idToken}', this.idToken);

		return this.httpClientService.post(api.BASE_PRODUTO_API+res, produto);

	}

	updateProduto(produto: Produto): Observable<any> {

		return this.httpClientService.put(api.BASE_PRODUTO_API+api.UPDATE_PRODUTO.replace('{idProduto}', produto.key)
			.replace('{idToken}',this.idToken), produto);

	}

	deleteProduto(produto: Produto): Observable<any>{

		return this.httpClientService.delete(api.BASE_PRODUTO_API+api.DELETE_PRODUTOS.replace('{idProduto}', produto.key)
			.replace('{idToken}',this.idToken));

	}
}
