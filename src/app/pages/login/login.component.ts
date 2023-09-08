import { Router } from '@angular/router';
// login.component code
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = faUser;
  lock = faLock;

  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    // Username error response
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required!!!', '', {
        duration: 3000,
      });
      return;
    }
    // Password error response
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required!!!', '', {
        duration: 3000,
      });
      return;
    }

    // Requesting Server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Username & Password is Correct!!!');
        console.log(data);

        // Login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          // Redirrect ... ADMIN: admin-dashboard
          // Redirrect ... NORMAL: normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            // ADMIN Dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            // NORMAL User Dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !!!');
        console.log(error);
        this.snack.open('Invalid Details !! Try Again !!', '', {
          duration: 3000,
        });
      }
    );
  }
}
