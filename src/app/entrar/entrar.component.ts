import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe(
      (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        environment.id = this.usuarioLogin.id;
        environment.token = this.usuarioLogin.token;
        environment.nomeUsuario = this.usuarioLogin.nomeUsuario;
        environment.emailUsuario = this.usuarioLogin.emailUsuario;
        this.router.navigate(['/sobre']);
      },
      (erro) => {
        if (erro.status == 400) {
          alert('Usuario ou senha incorretos');
        }
      }
    );
  }
}
