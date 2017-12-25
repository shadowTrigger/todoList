import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo: Todo;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      let id: string = params['id'];
      this.todoService.getTodo(id).subscribe(todo => {
        this.todo = todo.json() as Todo;
        this.todoForm.setValue({
          id: this.todo.id,
          action: this.todo.action,
          dueDate: this.todo.dueDate
        });
      });
    });
  }
  createForm() {
    this.todoForm = this.fb.group({
      'id': '',
      'action': '',
      'dueDate': ''
    });

  }
  onSubmit() {
    this.todoService.saveTodo(this.todoForm.value).subscribe(() => {
      this.todoService.getTodos();
      this.router.navigate([{ outlets: { editOutlet: null } }]);
    });
  }
}
