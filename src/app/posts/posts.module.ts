import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
declarations: [
  PostCreateComponent,
  PostListComponent
],
imports: [
  CommonModule,
  AngularMaterialModule,
  ReactiveFormsModule,
  RouterModule
]
})
export class PostModule {}
