import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TableModule, CheckboxModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'] // Corrected property name
})
export class TodoListComponent {
  tasks: { name: string; completed: boolean }[] = [];
  newTask: string = '';

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  deleteTask(task: { name: string; completed: boolean }): void {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
