import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  taskArray: { taskName: string, isCompleted: boolean }[] = []
  alreadyExists = false;
  editAlreadyExists = false;
  // taskArray = [{taskName: 'Brush teeth', isCompleted: false}];
  editingIndex: number | null = null; // Track the index of the task being edited
  editedTaskName: string = '';
  onSubmit(form: NgForm){
    const newTaskName = form.controls['task'].value;
    // Check if the task already exists in the taskArray
  const taskExists = this.taskArray.some(task => task.taskName === newTaskName);
  if (!taskExists) {
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    })
  }else{
    this.alreadyExists = true;
    setTimeout(() => {
      this.alreadyExists = false;
    }, 1500);
  }
    form.reset();
  }
  onDelete(index: number){
    this.taskArray.splice(index,1);
  }

  onCheck(index: number){
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

   // Method to initiate the edit mode
   onEdit(index: number) {
    this.editingIndex = index;
    this.editedTaskName = this.taskArray[index].taskName;
    
  }

    // Method to save the edited task and exit edit mode
    onSaveEdit() {
      const newTaskName = this.editedTaskName;
      const taskExists = this.taskArray.some(task => task.taskName === newTaskName);
      if (this.editingIndex !== null && !taskExists) {
        this.taskArray[this.editingIndex].taskName = this.editedTaskName;
        this.editingIndex = null; // Reset editingIndex to exit edit mode
      }else{
        this.editAlreadyExists = true;
        setTimeout(() => {
          this.editAlreadyExists = false;
        }, 2000);
      }
    }
}
