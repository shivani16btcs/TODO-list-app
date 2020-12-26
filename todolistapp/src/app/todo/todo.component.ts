import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';// TodoService is a Injected Service
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]//TodoSevice class is a service provider
})
export class TodoComponent implements OnInit {
 toDoListArray:any[];//toDoListArray is a array of any type 

 //toDoService is a object of injected service class'TodoService'
  constructor(private toDoService:TodoService) { }
  ngOnInit(){
    //this.injectedservicename.getToDoList() it return a AnguarFireList
    // so we need a Obervable so that we can subscribe to that ,
    // so we made another function call snapshotChanges it will return
    // an observable of angularFireAction
    // then we subscribe that observable
    // inside subscribe we have 'item' =parameter
    // we have a forEach loop
    //and x initialise propety 'element.payload.toJSON()' it will return a json data of our object type 
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item=>{
      this.toDoListArray=[];
      item.forEach(element => {
        var x=element.payload.toJSON();
        x["$key"]=element.key;// inorder to retrive a unique key we use 'element.key' and assign it into json key
        this.toDoListArray.push(x);// finally we push this object into array
      })
    });// here we a concerted a angularfirelist into a array so whenever we made any changes in
  }   // firebasedb then subscribe function call and array get updated


onAdd(itemTitle){
this.toDoService.addTitle(itemTitle.value);
itemTitle.value=null;
}

alterCheck($key: string,isChecked){
  this.toDoService.checkOrUnCheckTitle($key,!isChecked);
}

onDelete($key:string){
  this.toDoService.removeTitle($key);
}

}
