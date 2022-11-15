import { Component, OnInit } from '@angular/core';  
import { ToastController } from '@ionic/angular';  
import { Router, ActivatedRoute } from '@angular/router';  
import { Passager, TodoService } from '../../services/todo.service';
  
@Component({  
  selector: 'app-todo-details',  
  templateUrl: './todo-details.page.html',  
  styleUrls: ['./todo-details.page.scss'],  
})  
export class TodoDetailsPage implements OnInit {  
  
  passager: Passager = {  
    name_prenom: '',  
    numero_tel: undefined 
  };  
  
  constructor(private activatedRoute: ActivatedRoute, private todoService: TodoService,  
              private toastCtrl: ToastController, private router: Router) { }  
  
  ngOnInit() { }  
  
  ionViewWillEnter() {  
    const id = this.activatedRoute.snapshot.paramMap.get('id');  
    if (id) {  
      this.todoService.recupérepassager(id).subscribe(passager => {  
        this.passager = passager;  
      });  
    }  
  }  
  
  ajouterpassager() {  
    this.todoService.ajouterpassager(this.passager).then(() => {  
      this.router.navigateByUrl('/');  
      this.showToast('un passager est ajouté');  
    }, err => {  
      this.showToast('There was a some problem in adding your passenger :(');  
    });  
  }  
  
  supprimerpassager() {  
    this.todoService.supprimerpassager(this.passager.id).then(() => {  
      this.router.navigateByUrl('/');  
      this.showToast('passenger deleted');  
    }, err => {  
      this.showToast('There was a some problem in deleting your passenger :(');  
    });  
  }  
  
  modifierpassager() {  
    this.todoService.modifierpassager(this.passager).then(() => {  
      this.showToast('passenger updated');  
    }, err => {  
      this.showToast('There was a some problem in updating your passenger :(');  
    });  
  }  
  
  showToast(msg) {  
    this.toastCtrl.create({  
      message: msg,  
      duration: 2000  
    }).then(toast => toast.present());  
  }  
  
}  