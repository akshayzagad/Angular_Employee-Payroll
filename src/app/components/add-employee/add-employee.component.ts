import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;


  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]


  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: new FormControl(''),
      profilePic: new FormControl(''),
      gender: new FormControl(''),
      department: new FormArray([]),
      salary: new FormControl(''),
      startDate: new FormControl(''),
      note: new FormControl('')
    })
   }


  ngOnInit(): void {
  }
  onDepartmentChange(event: any){
    const departmentValue = event.source.value
    const selectedDepartment = event.checked
    const departmentArray: FormArray = this.employeeForm.get('department') as FormArray;


    if (selectedDepartment) {
      departmentArray.push(new FormControl(departmentValue));
    } else {
      const index = departmentArray.controls.findIndex(x => x.value === departmentValue);
      departmentArray.removeAt(index);
    }
  }


  /**
   * To read Salary value from slider
   */
  salary: number = 400000;
  updateSetting(event: any) {
    this.salary = event.value;
  }


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }


  submitForm(){
    console.log(this.employeeForm.value)
  }


}
