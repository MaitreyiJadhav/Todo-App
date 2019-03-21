import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'

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

  addTitle(title: string){
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  addDate(date: string){
    this.toDoList.push({
      date: date,
      isChecked: false
    });
  }
  checkOrUncheckedTitle($key: string, flag: boolean){
    this.toDoList.update($key, { isChecked:flag });
  }
  formatDate(date: Date): string{
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;

  }
 
}
