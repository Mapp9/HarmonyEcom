import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User [] = [];

  constructor(private adminUserService:AdminUserService){}

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.adminUserService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  deleteUser(id: number) {
    this.adminUserService.deleteUser(id).subscribe(
      response => {
        console.log("Usuario eliminado correctamente");
        this.listUsers(); // Volver a cargar la lista
      }
    );
  }

}
