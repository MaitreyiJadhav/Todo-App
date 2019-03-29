import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import * as firebase from 'firebase';
import { getLocaleDateFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //store all todo list, type is angularfirelist
 toDoList: AngularFireList<any>;
  pipe: any;

  //created firebasedb object of type angularfiredatabase to work with firebase
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(){

    //initialise with results from firebase
    this.toDoList = this.firebasedb.list('titles');
    
  
    return this.toDoList;
  }

  addTitle(title: string,createdAt: string){
    //push function to add to firebase
    this.toDoList.push({
      //inserting objects
      title: title,
      isChecked: false,
      createdAt: createdAt
    });
  }

  //key is unique
  checkOrUncheckedTitle($key: string, flag: boolean){
    this.toDoList.update($key, { isChecked:flag });
  }
  addTestItem() {
    const data = {
      createdAt: new Date () 
    }
    this.firebasedb.list('titles').push(data);
  }

  removeTitle($key: string){
    this.toDoList.remove($key);
  }

}
