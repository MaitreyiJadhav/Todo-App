import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
 toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(){
    this.toDoList = this.firebasedb.list('titles');
  
    return this.toDoList;
  }

  addTitle(title: string,createdAt:string){
    this.toDoList.push({
      title: title,
      isChecked: false,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  
  checkOrUncheckedTitle($key: string, flag: boolean){
    this.toDoList.update($key, { isChecked:flag });
  }
  addTestItem() {
    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    
    }

    this.firebasedb.list('titles').push(data);
  }

 
}
