import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../shared/task.model';
import { TableModule } from 'primeng/table'; // For p-table
import { ButtonModule } from 'primeng/button'; // For pButton
import { DialogModule } from 'primeng/dialog'; // For p-dialog

import { DropdownModule } from 'primeng/dropdown'; // For p-dropdown
import { InputTextModule } from 'primeng/inputtext'; // For pInputText
import { CheckboxModule } from 'primeng/checkbox'; // For p-checkbox
import { FormsModule } from '@angular/forms'; // For [(ngModel)] two-way binding

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = []; // Task list
  displayDialog = false; // Control dialog visibility

  newTask: Partial<Task> = { name: '', priority: 'Medium' }; // New task details

  priorityOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ]; // Priority options for dropdown

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Subscribe to task updates from TaskService
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    // Validate task input
    if (this.newTask.name && this.newTask.priority) {
      const task: Task = {
        id: this.tasks.length + 1, // Generate task ID
        name: this.newTask.name,
        priority: this.newTask.priority as 'High' | 'Medium' | 'Low',
        completed: false, // Default to incomplete
      };

      // Add task via service
      this.taskService.addTask(task);

      // Reset dialog and form
      this.resetDialog();
    } else {
      alert('Please provide task details.');
    }
  }

  deleteTask(taskId: number) {
    // Delete task via service
    this.taskService.deleteTask(taskId);
  }

  resetDialog() {
    // Reset dialog state and form inputs
    this.newTask = { name: '', priority: 'Medium' };
    this.displayDialog = false;
  }
}