import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import * as firebase from 'firebase';
import { getLocaleDateFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
 toDoList: AngularFireList<any>;
  pipe: any;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(){
    this.toDoList = this.firebasedb.list('titles');
  
    return this.toDoList;
  }

  addTitle(title: string,createdAt: string){
    this.toDoList.push({
      title: title,
      isChecked: false,
      createdAt: createdAt
    });
  }

  
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
