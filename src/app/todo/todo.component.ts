//import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

import { TodoService} from './shared/todo.service';
import * as firebase from 'firebase';
import {formatDate} from '@angular/common';

 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]

})


export class TodoComponent implements OnInit {
  toDoListArray: any[];
  firebase: any;

  constructor(private toDoService: TodoService ) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

    });

    this.toDoListArray = this.toDoService.getToDoList() as any;

  }

  onAdd(itemTitle){
    this.toDoService.addTitle(itemTitle.value,new Date().toDateString());    
    itemTitle.value = "";
    itemTitle.createdAt= new Date(); 
    //itemTitle.createdAt = getLocaleDateFormat
    console.log(itemTitle.createdAt);
  
  }
  alterCheck($key: string, isChecked){
    this.toDoService.checkOrUncheckedTitle($key, !isChecked);
  }
  onDelete($key: string){
    this.toDoService.removeTitle($key);
  }

}
