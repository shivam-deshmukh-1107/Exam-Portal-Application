import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  // Loading All categories
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  // Adding New Categories
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  // Deleting Category
  deleteCategory(c_id: any) {
    return this._http.delete(`${baseUrl}/category/${c_id}`);
  }
}
