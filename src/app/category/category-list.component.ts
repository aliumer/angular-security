import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';

@Component({
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  securityObject: AppUserAuth = null;

  constructor(private categoryService: CategoryService,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.getCategories();
    this.securityService.securitySubject.subscribe((data) => {
      this.securityObject = data;
    });
  }

  private getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
