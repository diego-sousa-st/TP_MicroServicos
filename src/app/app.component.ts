import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from './Produto.model';
import { UserService } from './user.service';
import { ProdutoService } from './produto.service';

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
				this.setMakeActions(true);
				this.produtoService.setIdToken(this.dataAfterLogin.idToken);
				debugger;

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

	}

	cadastrarProduto() {

		this.produtoService.createProduto(this.produto);

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

}
