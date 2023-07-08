import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular"
import { UserTokenModel } from "../models";

@Injectable()
export class NgRxStorageService {
  private storageInitialised = false;

  constructor(
    private storage: Storage
  ) {}

  async getUser(): Promise<UserTokenModel> {
    if(!this.storageInitialised) await this.storage.create();

    return (await this.storage.get('user')) || null;
  }

  async saveUser(user: UserTokenModel) {
    if(!this.storageInitialised) await this.storage.create();

    return this.storage.set('user', user);
  }
}
