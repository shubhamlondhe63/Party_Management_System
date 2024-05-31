import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css']
})
export class PartyFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephoneNo: ['', [Validators.pattern(/^\d{10}$/)]],
      whatsappNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      dateOfBirth: [''],
      anniversaryDate: [''],
      gstin: ['', Validators.required],
      panNo: ['', Validators.required],
      applyTds: [false],
      creditLimit: [0, Validators.required],
      is_active: [true],
      bank_id: this.fb.array([]),
      address: this.fb.array([]),
      userid: this.fb.group({
        username: ['', Validators.required],
        is_active: [true]
      }),
      login_access: [false]
    });
  }

  ngOnInit() {
    // Initialize form with existing data if needed
  }

  get bankForms() {
    return this.myForm.get('bank_id') as FormArray;
  }

  get addressForms() {
    return this.myForm.get('address') as FormArray;
  }

  addBank() {
    const bank = this.fb.group({
      bank_ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_no: ['', Validators.required],
      account_holder_name: ['', Validators.required],
      is_active: [true]
    });

    this.bankForms.push(bank);
  }

  addAddress() {
    const address = this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      is_active: [true]
    });

    this.addressForms.push(address);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
