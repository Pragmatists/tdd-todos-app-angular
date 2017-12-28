import {Component, NgModule, ViewChild} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
    templateUrl: 'todo-new.html'
})
export class TodoNewComponent {

    @ViewChild('form')
    form: NgForm;

    saveResult: string = "";

    constructor(private http: HttpClient){}

    onSave() {
        this.http.post('http://localhost:3000/todos', this.form.value).subscribe(() => {
            this.saveResult = "Todo saved successfully"
        });
    }
}

@NgModule({
    declarations: [TodoNewComponent],
    imports: [HttpClientModule, FormsModule],
    exports: [TodoNewComponent]
})
export class TodoNewModule{}