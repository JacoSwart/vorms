import { Component } from '@angular/core';

let padZeros = function(str_p) {
  if (str_p.length === 2) {
    return str_p;
  } else {
    return "0" + str_p;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    setInterval(function() { 
      this.now = new Date();
    }, 3000);
  }

  now = new Date();

  fsa = false; 
  reporter = { 
    name: "", 
    tel: "", 
    cell: "" 
  } 
  site = { 
    street: "", 
    building: "", 
    site: "", 
    floor: "", 
    room: "", 
    town: "", 
  } 
  equipment = { 
    asset: "", 
    make: "", 
    model: "", 
    serial: "",
    barcode: "" ,
  } 
  sla = { 
    reported: "" + this.now.getFullYear() + "/" + padZeros("" + (this.now.getMonth() + 1)) + "/" + padZeros("" + this.now.getDate()), 
    arrival: this.now.getFullYear() + "/" + padZeros((this.now.getMonth() + 1)) + "/" + padZeros(this.now.getDate()), 
    arrivetime: padZeros(this.now.getHours()) + ":" + padZeros(this.now.getMinutes()),
    completed: "" + this.now.getFullYear() + "/" + padZeros("" + (this.now.getMonth() + 1)) + "/" + padZeros("" + this.now.getDate()), 
    completedtime: "",
    arrive: false,
    complete: false,
  } 

  faulty = { 
    make1: "", 
    model1: "", 
    serial1: "", 
    make2: "", 
    model2: "", 
    serial2: "", 
    make3: "", 
    model3: "", 
    serial3: "", 
  } 
  replacement = { 
    make1: "", 
    model1: "", 
    serial1: "", 
    make2: "", 
    model2: "", 
    serial2: "", 
    make3: "", 
    model3: "", 
    serial3: "", 
  } 
  ov = { 
    ss: "", 
    sse: "", 
    rs: "", 
    re: "", 
  } 
  equipmentrem = { 
    make: "", 
    model: "", 
    serial: "", 
    date: "", 
    time: "", 
    eqremautofill: false 
  } 
  backup = { 
    make: "", 
    model: "", 
    serial: "", 
    date: "", 
    time: "",
    backupautorefill: false, 
  } 
  equipmentret = { 
    make: "", 
    model: "", 
    serial: "", 
    date: "", 
    time: "", 
    eqretautofill: false 
  } 
  slalvlsel = {
    excellent: true,
    good: false,
    avg: false,
    poor: false,
  }

  doc = {
    callid: "",
    sitaref: "",
  }

  signoff = {
    name: "",
    completed: false,
    notcompleted: false,
    samename: false,
    date: "" , 
  }

  setcompletedtime = function() {
    if (this.sla.completedtime === "") {
      this.sla.completedtime = padZeros(this.now.getHours()) + ":" + padZeros(this.now.getMinutes());
    } else {
      this.sla.completedtime = "";
    }
  } 

  setBackupTime = function() { 
    if (this.backup.time === "") { 
      this.backup.time = padZeros(this.now.getHours()) + ":" + padZeros(this.now.getMinutes());
    } else { 
      this.backup.time = ""; 
    }
  }

  setRemovedTime = function() { 
    if (this.equipmentrem.time === "") { 
     this.equipmentrem.time = padZeros(this.now.getHours()) + ":" + padZeros(this.now.getMinutes());
    } else { 
     this.equipmentrem.time = ""; 
    }
  } 
  setReturnTime = function() { 
    if (this.equipmentret.time === "") { 
      this.equipmentret.time = padZeros(this.now.getHours()) + ":" + padZeros(this.now.getMinutes());
    } else { 
      this.equipmentret.time = ""; 
    } 
  }

    padZeros = function(str_p) {
      if (str_p.length === 2) {
        return str_p;
      } else {
        return "0" + str_p;
      }
  }
}
  // <!-- Script Links -->
  // <script src="khauleza.js" type="text/javascript"></script>
  //