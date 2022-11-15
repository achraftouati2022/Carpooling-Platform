import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

export interface Passager {
  id?: string;
  name_prenom: string;
  numero_tel: number;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private passagers: Observable<Passager[]>;
  private passagerCollection: AngularFirestoreCollection<Passager>;

  constructor(private db: AngularFirestore) {
    this.passagerCollection = this.db.collection<Passager>('passagers');
    this.passagers = this.passagerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  voirpassagers(): Observable<Passager[]> {
    return this.passagers;
  }

  recupérepassager(id: string): Observable<Passager> {
    return this.passagerCollection.doc<Passager>(id).valueChanges().pipe(
      take(1),
      map(passager => {
        passager.id = id;
        return passager;
      })
    );
  }

  ajouterpassager(passager: Passager): Promise<DocumentReference> {
    return this.passagerCollection.add(passager);
  }

  modifierpassager(passager: Passager): Promise<void> {
    return this.passagerCollection.doc(passager.id).update({ name: passager.name_prenom, notes: passager.numero_tel });
  }

  supprimerpassager(id: string): Promise<void> {
    return this.passagerCollection.doc(id).delete();
  }

      }

