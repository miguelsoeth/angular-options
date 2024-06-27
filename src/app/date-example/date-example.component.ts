//Imports do angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Imports para fazer o form funcionar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Import do moment para datas e ngx-mask para mascara
import moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

//Imports do material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-date-example',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatButtonModule
  ],
  providers: [
    provideNgxMask(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  templateUrl: './date-example.component.html',
  styleUrl: './date-example.component.css'
})
export class DateExampleComponent implements OnInit {  
  myForm!: FormGroup; //Cria o grupo do formulario

  documentType: string[] = ['CPF', 'CNPJ']; //define os tipos possíveis de documento

  //define os intervalos de data (escrita/valor em meses)
  dateInterval: { label: string; value: number }[] = [
    { label: '3 meses', value: 3 },
    { label: '6 meses', value: 6 },
    { label: '1 ano', value: 12 },
    { label: '5 anos', value: 60 },
    { label: '10 anos', value: 120},
    { label: '50 anos', value: 600},
  ];

  //data máxima que o datepicker aceita
  maxDate = new Date();    

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Inicializa o grupo do formulario
    this.myForm = this.formBuilder.group({
      typeField: ['', Validators.required],
      documentField: ['', Validators.required],
      dateField: ['', Validators.required],
      intervalField: ['', Validators.required],
    });

    //desabilita o campo de documento
    this.myForm.get('documentField')?.disable();

    //Fica vigiando se o valor do campo do tipo muda
    this.myForm.get('typeField')!.valueChanges.subscribe((value) => {
      //Se valor existir, ative o campo do documento
      if (value) {
        this.myForm.get('documentField')?.enable();
      }
    });
  }

  search(): void {
    //Pega o texto equivalente ao intervalo selecionado
    const selectedInterval = this.dateInterval.find(interval => interval.value === this.myForm.value.intervalField);

    //cria o obj para mandar, recomendado criar uma interface/modelo
    var obj = {
      type: this.myForm.value.typeField,
      referredDate: moment(this.myForm.value.dateField).format('YYYY-MM-DD'),
      document: this.myForm.value.documentField,
      interval: this.myForm.value.intervalField.toString(), 
      interval_label: selectedInterval!.label
    }

    //Envia obj, no caso, para teste é impresso no console
    console.log(obj);
    
  }

  closeDialog(): void {
    console.log("Fechar dialogo")
  }

}
