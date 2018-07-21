import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from './Produto.model';
import { UserService } from './user.service';
import { ProdutoService } from './produto.service';
import { erroPadrao } from './estoque.constants';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'app';

	isLogin: boolean = true;
	isCadastro: boolean = false;
	isCadastroProduto: boolean = false;

	email: string = '';
	senha: string = '';

	formularioLogin: FormGroup;
	formularioProduto: FormGroup;

	dataAfterLogin: any;
	dataAfterSignIn: any;

	//produto a ser adicionado
	produto: Produto = new Produto();

	//lista de produtos adicionados na api
	produtosAdicionados: Produto[] = [];

	canMakeActions: boolean = false;
	isProductUpdatee: boolean = false;
	keyUsed: string;

	constructor(private formBuilder: FormBuilder, private userService: UserService, private produtoService: ProdutoService) {

		this.loadForm();

	}

	ngOnInit(): void {

	}

	loadForm() {

		this.formularioLogin = this.formBuilder.group({
			email: [null],
			senha: [null]
		});

		this.formularioProduto = this.formBuilder.group({
			nome: [null],
			descricao: [null],
			valor: [null],
			usuario: [null],
			imageUrl: [null]
		});


	}

	cadastro() {

		this.userService.cadastrar(this.email, this.senha)
			.subscribe((data) => {

				this.dataAfterSignIn = data;
				this.setMakeActions(true);

			});

	}

	login() {

		this.userService.logar(this.email, this.senha)
			.subscribe((data) => {

				this.dataAfterLogin = data;
				this.produto.usuario = data.localId;
				this.setMakeActions(true);
				this.produtoService.setIdToken(this.dataAfterLogin.idToken);

			});

	}

	setMakeActions(value: boolean) {

		this.canMakeActions = value;
		this.isCadastro = false;
		this.isLogin = false;

		this.getProdutos();

	}

	deslogar() {

		this.isLogin = true;
		this.canMakeActions = false;

	}

	showCadastroProduto() {

		this.isCadastroProduto = true;
		this.isProductUpdatee = false;
		this.resetProduto();

	}

	resetProduto() {

		this.produto.descricao = undefined;
		this.produto.imageUrl = undefined;
		this.produto.nome = undefined;
		this.produto.key = undefined;
		this.produto.valor = undefined;

	}

	cadastrarProduto() {

		this.produtoService.createProduto(this.produto).subscribe(
			(key) => {

				this.isCadastroProduto = false;
				this.getProdutos();

			},
			error => alert(erroPadrao)
		);

	}

	getProdutos() {

		this.produtoService.getProdutos()
			.subscribe((produtos: any[]) => {

				let keys = Object.keys(produtos);

				keys.forEach(key => {

					const newProduct = produtos[key];
					newProduct.key = key;

					this.produtosAdicionados.push(newProduct)


				});

			});

	}

	findIndexProduto(elemento: any) {

		return elemento.key === this.keyUsed;

	}

	updateProduto(key: string) {

		this.isProductUpdatee = true;
		this.isCadastroProduto = true;
		this.keyUsed = key;

		this.produtosAdicionados.forEach(produto => {

			if(produto.key === key) {

				this.produto = produto;
				return;

			}

		});

	}


	atualizarProduto() {

		this.produtoService.updateProduto(this.produto).subscribe(
			(response) => {

				this.isCadastroProduto = false;
				this.getProdutos();

			},
			error => {
				debugger;
				alert(erroPadrao)
			}
		);

		this.isProductUpdatee = false;
		this.isCadastroProduto = false;

	}

	isProductUpdate(): boolean  {

		return this.isProductUpdatee;

	}

	deleteProduto(key: string) {

		this.produtosAdicionados.forEach(produto => {

			if(produto.key === key) {

				this.produto = produto;
				return;

			}

		});


		this.produtoService.deleteProduto(this.produto).subscribe(
			(response) => {

				this.isCadastroProduto = false;
				this.getProdutos();

			},
			error => {
				debugger;
				alert(erroPadrao)
			}
		);

		this.isProductUpdatee = false;
		this.isCadastroProduto = true;

	}

}
