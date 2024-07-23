import { Component, Input } from '@angular/core';
import { DefaultLayoutComponent } from '../../components/default-layout/default-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent

  ],
  providers: [
    LoginService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ){
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.minLength(5), Validators.required]),
      senha: new FormControl('', [ Validators.required, Validators.minLength(6)])
    })
  }
  submit(){
    this.loginService.login(this.loginForm.value.usuario, this.loginForm.value.senha).subscribe({
      next: () => this.toastr.success("Login Realizado com Sucesso!"),
      error: () => this.toastr.error("Erro ao realizar Login, Tente novamente mais tarde!")
    })
  }
  
}
