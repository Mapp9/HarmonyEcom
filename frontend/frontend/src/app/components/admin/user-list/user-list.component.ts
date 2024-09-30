import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/user';
import { AdminUserService } from 'src/app/services/admin-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User [] = [];

  constructor(private adminUserService:AdminUserService, private toastr:ToastrService){}

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
    console.log('El ID de la categoria antes de eliminar es: '+id);

    Swal.fire({
      title: "¿Está seguro que desea eliminar el registro?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminUserService.deleteUser(id).subscribe(
          ()=> this.listUsers()
        );
        Swal.fire({
          title: "¡Categorías!",
          text: "Categoría eliminada correctamente.",
          icon: "success"
        });
        this.listUsers();
      }
    });

}
}
