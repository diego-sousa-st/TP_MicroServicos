import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from './estoque.constants';

@Injectable({
	providedIn: 'root'
})
export class UserService {



	constructor(private httpClientService: HttpClient) { }

	cadastrar(email: string, senha: string): Observable<any> {

		const data = {
			email: email,
			password: senha,
			returnSecureToken: true
		}

		return this.httpClientService.post(api.BASE_USER_API+api.USER_SIGN_UP, data);

	}

	logar(email: string, senha: string): Observable<any> {

		const data = {
			email: email,
			password: senha,
			returnSecureToken: true
		}

		return this.httpClientService.post(api.BASE_USER_API+api.USER_LOGIN, data);

	}
}
