import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
 toDolist:AngularFireList<any>;//toDolist is a property & toDolist is list of 'AngularFireList'


// we have to create a object 'firebasedb' of class 'AngularFireDatabase' 
  constructor( private firebasedb:AngularFireDatabase ){
  }
//inorder to retrive all list item into variable 'toDolist' we crete gettoDoList function
  getToDoList(){
    this.toDolist=this.firebasedb.list('title');
    return this.toDolist;
  }
// inorder to add a toDolist item into a firebasedb we create addTitle function
  addTitle(title:string){
    this.toDolist.push({
      title:title,
      isChecked:false// isChecked is used to check whether this item/job is completed or not
    });
  }

  checkOrUnCheckTitle($key: string,flag:boolean){
    this.toDolist.update($key,{isChecked:flag});
  }
//inorder to remove a record fom firebasedb we create a removeTitle function
  removeTitle($key: string){
    this.toDolist.remove($key);
  }
}
