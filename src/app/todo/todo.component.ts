import { Component } from '@angular/core';
import { Model } from '../model';
import { ToDoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  displayAll: boolean = true;
  selectedTodo: ToDoItem;

  constructor() {
  }

  message = 'no message';
  style = 'color:green';

  model = new Model();

  getName() {
    return this.model.name;
  }
  ChangeColor(tbody: any, tr: any) {
    for (let i = 0; i < tbody.children.length; i++) {
      let element = tbody.children[i];
      element.style.backgroundColor = 'white';
    }
    tr.style.backgroundColor = 'springgreen';

    var id:number = tr.children[0].innerHTML;
    this.selectedTodo = JSON.parse(JSON.stringify(this.model.items[id - 1]));
  }
  ChangeColorBlur(tbody: any){
    alert("working?");
    for (let i = 0; i < tbody.children.length; i++) {
      let element = tbody.children[i];
      element.style.backgroundColor = 'white';
    }
    this.selectedTodo = null;
  }
  addItem(value: string) {
    // this.message=value;
    // console.log(value);
    if (value != '') {
      this.model.items.push(new ToDoItem(1, value, false));
      this.message = '';
      value = '';
    } else {
      alert('Please input info');
    }
  }
  getItems() {
    if (this.displayAll) {
      return this.model.items;
    }
    return this.model.items.filter((item) => item.action == false);
  }

  changeSelectedTodo(act: any){
    if(act.checked){ this.selectedTodo.action = act.checked; }
    else if(!act.checked){ this.selectedTodo.action = !act.checked; }
  }

  changeAction(item: ToDoItem){
    if(item.action){
      item.action = false;
    }
    else if(!item.action){
      item.action = true;
    }
  }

  Update(){
    this.model.items[this.selectedTodo.id - 1] = this.selectedTodo;
    this.selectedTodo = null;
  }
}
