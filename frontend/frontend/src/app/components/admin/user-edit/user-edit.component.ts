import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number = 0;
  username : string = '';
  name : string = '';
  surname : string = '';
  email : string = '';
  address : string = '';
  cellphone : string = '';
  password : string = '';
  userType : string = '';
  isEditMode: boolean = false;

  constructor( 
    private adminUserService: AdminUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;

      this.id = +id; // Convertir el id a número
      this.adminUserService.getUserById(this.id).subscribe((data) => {
        this.username = data.username;
        this.name = data.firstName;
        this.surname = data.lastName;
        this.email = data.email;
        this.address = data.address;
        this.cellphone = data.cellphone;
        this.userType = data.userType;});
    }
  }

  saveUser(){
    this.username = this.email;
    let user = new User(
      this.id,  // Pasar el id actual en caso de edición
      this.username,
      this.name,
      this.surname,
      this.email,
      this.address,
      this.cellphone,
      this.password,
      this.userType
    );
    if(this.isEditMode) {
      this.adminUserService.updateUser(user).subscribe(
        () => {
          console.log('Usuario actualizado');
          this.router.navigate(['/admin/users']);
        });
    } else{
      this.adminUserService.createUser(user).subscribe(
        () => {
          console.log('Usuario creado');
          this.router.navigate(['/admin/users']);
        }
      )
    }
  }

}
