import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  set(label: string, value: any, isString = true) {
    value = isString ? value : JSON.stringify(value);
    localStorage.setItem(label, value);
  }
  get(label: string, isString = true) {
    const lsValue = localStorage.getItem(label);
    if(!lsValue) return;
    return isString ? lsValue : JSON.parse(lsValue);
  }
}
