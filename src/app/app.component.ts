import { Component, OnInit, ViewChild } from '@angular/core';
import 'reflect-metadata';
import { Router } from '@angular/router';
import { FilterPipe } from './app.filterPipe.pipe';
import * as Papa from 'papaparse';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FilterPipe]
})
export class AppComponent implements OnInit {
    title = 'Data Visualization of Uploaded .CSV File';
    file = null;
    successMsg= null;
    errorMsg= null;
    error = null;
    public outputData = [];
  
    constructor(filterPipe: FilterPipe) {

    }
    
    @ViewChild('data')
    data: any;

    ngOnInit() {

    }

    getFiles(files: any) {
        let empDataFiles: FileList = files.files;
        this.file = empDataFiles[0];
    }

    postfile() {

        if(!this.isValidCSVFile(this.file)){
            alert("Please import valid .csv file.");
            this.fileReset();
          }

        if (this.file !== undefined) {
            Papa.parse(this.file, {
                header: true,
                skipEmptyLines: true,
                complete: (result,file) => {
                this.outputData = result.data;
               
                }
            });
            
        }
    }

    //To Reset the file records
    fileReset(){
        this.data.nativeElement.value = "";
        this.outputData = [];
    }
    
    //To check file has valid format or not 
    isValidCSVFile(file: any) {   
        return file.name.endsWith(".csv");
        
    }
    
}
