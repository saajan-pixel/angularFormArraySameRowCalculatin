import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      arr: this.fb.array(
        (() => {
          if (!item.arr) {
            return [
              this.addFormArray(),
              this.addFormArray(),
              this.addFormArray(),
            ];
          } else {
            return item.arr.map((data) => this.addFormArray(data));
          }
        })()
      ),
    });
  }

  reset() {
    this.Arr.reset();
  }

  sumGoods() {
    // Get the goods form control values for the 0th and 1st index rows
    const goods0 = this.form.get('arr.0.goods').value;
    const goods1 = this.form.get('arr.1.goods').value;
    // Calculate the sum
    const sum = goods0 + goods1;
    const lastIndex = this.Arr.controls.length - 1;
    this.form.get(`arr.${lastIndex}.goods`).patchValue(sum);
  }

  addFormArray(item: any = {}) {
    return this.fb.group({
      goods: [item.goods ? item.goods : 0],
      works: [item.works ? item.works : 1],
      services: [item.services ? item.services : 2],
    });
  }

  get Arr() {
    return this.form.get('arr') as FormArray;
  }
  cal() {
    console.log(this.Arr);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
