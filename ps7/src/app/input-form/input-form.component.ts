import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  model = {year:''}
  @Output() getData: EventEmitter<string> = new EventEmitter()


  onSubmit() {
    console.log('submitted!')
    this.getData.emit(this.model.year)
  }
}
