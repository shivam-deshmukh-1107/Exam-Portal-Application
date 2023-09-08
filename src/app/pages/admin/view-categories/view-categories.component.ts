import { Component, OnInit } from '@angular/core';
import { faFolder, faList } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  folder = faFolder;
  category = faList;

  categories = [
    {
      c_Id: 0,
      title: '',
      description: '',
    },
  ];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        // css
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error loading Data', 'error');
      }
    );
  }

  deleteCategory(c_id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you Sure? \n You want to delete category?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete
        this._category.deleteCategory(c_id).subscribe(
          (data: any) => {
            this.categories = this.categories.filter(
              (category) => category.c_Id != c_id
            );
            Swal.fire('Success !!', 'Category Deleted !!', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error deleting Category !!', 'error');
          }
        );
      }
    });
  }
}
