import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { Employee } from '../Model/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{
  public employee: Employee = new Employee();
  employeeFormGroup!: FormGroup;

  departments: Array<any> = [
    {
      id: 1,
      name: "HR",
      value: "HR",
      checked: false
    },
    {
      id: 2,
      name: "Sales",
      value: "Sales",
      checked: false 
    },
    {
      id: 3,
      name: "Finance",
      value: "Finance",
      checked: false  
    },
    {
      id: 4,
      name: "Engineer",
      value: "Engineer",
      checked: false
    },
    {
      id: 5,
      name: "Other",
      value: "Other",
      checked: false 
    }
  ]

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
              private router: Router) { 

    this.employeeFormGroup  = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
      profilePic: new FormControl('', [Validators.required]),
      gender: new FormControl('', []),
      department: this.formBuilder.array([], []),
      salary: new FormControl('', []),
      startDate: new FormControl('', []),
      note: new FormControl('', []) 
    })
  }

  ngOnInit(): void {
    console.log(this.employee);
  }


  
   onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
      console.log(department);
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  // onSubmit(){
  //   this.employee = this.employeeFormGroup.value;
  //   // console.log(this.employeeFormGroup);
  //   console.log(this.employee);
  //   addEmployee(this.employee).subscribe((response: any) => {
  //   console.log(response);
  //   this.router.navigateByUrl("/home-page");
  //   });
  // }

  submitForm(){
    this.employee = this.employeeFormGroup.value;
    console.log(this.employeeFormGroup.value)
    this.httpService.addEmployee(this.employee).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl("/home-page");
    });
  }
/**
    * Salary slider
    */
formatLabel(value: number): string {
  if (value >= 1000) {
    return Math.round(value / 1000) + 'k';
  }

  return `${value}`;
}
  

}
