import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) {}
  ngOnInit(): void {}

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };
  formSubmit() {
    if (this.user.username == '') {
      this.snack.open('Username is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.password == '') {
      this.snack.open('Password is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.firstname == '') {
      this.snack.open('Firstname is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.lastname == '') {
      this.snack.open('Lastname is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.email == '') {
      this.snack.open('Email is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.phone == '0') {
      this.snack.open('Phone Number is required!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.user.phone <= '0') {
      this.snack.open('Please Enter Valide Phone Number!!!', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    // Add user Function
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        // Successful
        console.log(data);
        // alert('Data Submitted!!!!');
        Swal.fire(
          'Success',
          'User is Registered!' + ' User Id is ' + data.id,
          'success'
        );
      },
      (error) => {
        // Error
        console.log(error);
        // alert('Something Went Wrong!!!!');
        this.snack.open('Something Went Wrong!!!', '', {
          duration: 3000,
        });
      }
    );
  }
}
