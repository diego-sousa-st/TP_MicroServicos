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

	createProduto(produto: Produto): void {

		debugger
		const res = api.CREATE_PRODUTO.replace('{idToken}', this.idToken);

		this.httpClientService.post(api.BASE_PRODUTO_API+res, produto)
			.subscribe((data) => {

				debugger;

			});

	}

	updateProduto(): void{

	}

	deleteProduto(): void {

	}
}
