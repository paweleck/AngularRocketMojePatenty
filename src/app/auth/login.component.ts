import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
import { LoginService } from '@app/auth/login.service';
import { ServerErrorService } from '@shared/services/server-error.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private ses: ServerErrorService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;

    this.loginService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((loginResp: any) => {
        if (this.ses.handleErrors(loginResp, this.loginForm)) {
          const login$ = this.authenticationService.login(this.loginForm.value);
          login$
            .pipe(
              finalize(() => {
                this.loginForm.markAsPristine();
                this.isLoading = false;
              }),
              untilDestroyed(this)
            )
            .subscribe(
              (credentials) => {
                log.debug(`${credentials.username} successfully logged in`);
                this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
              },
              (error) => {
                log.debug(`Login error: ${error}`);
                this.error = error;
              }
            );
        }
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
