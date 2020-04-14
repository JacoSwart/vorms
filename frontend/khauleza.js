    var jobcardapp = angular.module('Jobcard_app', []);
    var wrapper = document.getElementById("signature-pad");

    class Trip {
      constructor() {
        this.date = new Date();
        this.departure = localStorage.getItem("departure");
        this.destination = "";
        this.startodo = localStorage.getItem("endkilos");
        this.endodo = 0;
        this.pvtkm = 0;
        this.client = "";
        this.tollgates = "";
        this.vehicle = "FT60LXGP";
      }
    }

    class Jobcard {
      constructor() {
        this.ov = {
          ss: localStorage.getItem("endkilos"),
          sse: 0,
          rs: 0,
          re: 0,
        }
        this.site = {
          street: "",
          building: "",
          site: "",
          floor: "",
          room: "",
          town: "",
          departure: localStorage.getItem("departure"),
        }
      }
    }

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }

    jobcardapp.controller('Jobcard_controller', function ($scope) {
      let forms = ['JOBCARD', 'PARTS_REPLACEMENT', 'USER_DAMAGE', 'EQUIPMENT_REMOVAL', 'FUEL', 'TRIPS'];
      $scope.activeForm = forms[0];

      $scope.padZeros = function (str_p) {
        if (str_p > 9) {
          return str_p;
        } else {
          return "0" + str_p;
        }
      };

      $scope.jsDatetoSQLDate = function (date) {
        return date.getFullYear() + "/" + $scope.padZeros((date.getMonth() + 1)) + "/" + $scope.padZeros(date.getDate());
      };


      let now = new Date();
      setInterval(() => {
        now = new Date();
      }, 3000);
      $scope.SMS = "";
      
      $scope.problem = {
        issue: "Problem Reported: ",
        resolution: "Problem Resolution: "
      }

      $scope.fsa = false;

      $scope.reporter = {
        name: "",
        tel: "",
        cell: ""
      }

      $scope.equipment = {
        asset: "",
        make: "",
        model: "",
        serial: "",
        barcode: "",
      }

      $scope.damage = {
        brokensealsyes: false,
        brokensealsvalue: "",
        spillageyes: false,
        spillagevalue: "",
        brokenyes: false,
        brokenvalue: "",
        missingyes: false,
        missingvalue: "",
        surgeyes: false,
        surgevalue: "",
      }
       
      $scope.sla = {
        // reported: now.getFullYear() + "/" + $scope.padZeros((now.getMonth() + 1)) + "/" + $scope.padZeros(now.getDate()),
        arrival: $scope.jsDatetoSQLDate(now),
        arrivetime: $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes()),
        completed: $scope.jsDatetoSQLDate(now),
        completedtime: "",
        arrive: false,
        complete: false,
      }

      $scope.faulty = {
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
      $scope.replacement = {
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
      $scope.equipmentrem = {
        make: "",
        model: "",
        serial: "",
        date: "",
        time: "",
        eqremautofill: false
      }
      $scope.backup = {
        make: "",
        model: "",
        serial: "",
        date: "",
        time: "",
        backupautorefill: false,
      }
      $scope.equipmentret = {
        make: "",
        model: "",
        serial: "",
        date: "",
        time: "",
        eqretautofill: false
      }
      $scope.slalvlsel = {
        excellent: true,
        good: false,
        avg: false,
        poor: false,
      }

      $scope.doc = {
        callid: "",
        sitaref: "",
        client: false,
      }

      $scope.signoff = {
        name: "",
        completed: false,
        notcompleted: false,
        samename: false,
        date: "",
      }

      $scope.fuel = {
        liters: 0,
        amount: 0,
        jobcard: "",
        vehicle: "FT60LXGP",
        date: now,
      }

      $scope.fuelReport = [];

      $scope.tripReport = [];

      $scope.trip = new Trip();
      $scope.jobcard = new Jobcard();

      $scope.setarrivaltime = () => {
        if ($scope.sla.arrivetime === "") {
          $scope.sla.arrivetime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.sla.arrivetime = "";
        }
      }

      $scope.setcompletedtime = () => {
        if ($scope.sla.completedtime === "") {
          $scope.sla.completedtime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.sla.completedtime = "";
        }
      }

      $scope.setBackupTime = () => {
        if ($scope.backup.time === "") {
          $scope.backup.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.backup.time = "";
        }
      }

      $scope.setRemovedTime = () => {
        if ($scope.equipmentrem.time === "") {
          $scope.equipmentrem.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.equipmentrem.time = "";
        }
      }
      $scope.setReturnTime = () => {
        if ($scope.equipmentret.time === "") {
          $scope.equipmentret.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.equipmentret.time = "";
        }
      }

      $scope.partsrep = {
        faultymb: "",
        faultymbserial: "",
        faultycpu: "",
        faultycpuserial: "unknown",
        faultyram1: "",
        faultyram1serial: "",
        faultyram2: "",
        faultyram2serial: "",
        faultydvd: "",
        faultydvdserial: "",
        faultyhdd: "",
        faultyhddserial: "",
        faultypsu: "",
        faultypsuserial: "",
        replacedmb: "",
        replacedmbserial: "",
        replacedcpu: "",
        replacedcpuserial: "",
        replacedram1: "",
        replacedram1serial: "",
        replacedram2: "",
        replacedram2serial: "",
        replaceddvd: "",
        replaceddvdserial: "",
        replacedhdd: "",
        replacedhddserial: "",
        replacedpsu: "",
        replacedpsuserial: "",
      }

      $scope.savekilos = function (departure, endkilos) {
        localStorage.setItem("endkilos", endkilos);
        localStorage.setItem("departure", departure);
      };

      $scope.newjobcard = () => {
        // $scope.reporter = "";
        $scope.equipment.serial = "";
        $scope.jobcard.site.street = "";
        $scope.signoff.completed = "";
        $scope.signoff.notcompleted = "";
        $scope.jobcard.ov.sse = "";
        $scope.faulty = "";
        $scope.replacement = "";
        $scope.problem.resolution = "Problem Resolution: ";
        $scope.SMS = "";
        document.querySelector("div#call").classList.remove("hide_on_screen");
      }

      $scope.displayTripDialog = false;

      $scope.toggleAddTrip = () => {
        // $scope.reporter = "";
        $scope.trip = new Trip();
        $scope.displayTripDialog = !$scope.displayTripDialog;
      }


      $scope.parseCallSMS = () => {
        $scope.SMS = $scope.SMS.split('/');
        for (let line of $scope.SMS) {
          line = line.split(':');
          if (line[0].trim().toLowerCase() === 'heatref') $scope.doc.callid = line[1];
          else if (line[0].trim().toLowerCase() === 'custref') $scope.doc.sitaref = line[1];
          else if (line[0].trim().toLowerCase() === 'user') $scope.reporter.name = line[1];
          else if (line[0].trim().toLowerCase() === 'tel') {
            line[1] = line[1].replace(/ /g, "");
            line[1] = line[1].replace(/-/g, "");
            line[1] = line[1].replace(/NONE/g, "          ");
            $scope.reporter.tel = line[1].slice(0, 10);
            $scope.reporter.cell = line[1].slice(10);
          } else if (line[0].trim().toLowerCase() === 'site') {
            let address = line[1].split(' - ');
            $scope.jobcard.site.town = address[0];
            $scope.jobcard.site.building = address[1];
            $scope.jobcard.site.site = address[2];
          } else if (line[0].trim().toLowerCase() === 'floor') $scope.jobcard.site.floor = line[1];
          else if (line[0].trim().toLowerCase() === 'room') $scope.jobcard.site.room = line[1];
          else if (line[0].trim().toLowerCase() === 'asset') {
            let asset = [];
            for (let assetAttribute of line[1].split('-')) {
              asset.push(assetAttribute.trim());
            }
            $scope.equipment.asset = asset[0];
            $scope.equipment.make = asset[2] + ' ' + asset[3];
            $scope.equipment.model = asset[4];
          } else if (line[0].trim().toLowerCase() === 'issue') $scope.problem.issue = 'Problem Reported :\n' + line[1].split('SLA ')[0];
        }
        document.querySelector("div#call").classList.add("hide_on_screen");
        $scope.sla.reported = '20' + $scope.doc.sitaref.slice(0,2) + '/' + $scope.doc.sitaref.slice(2,4) + '/' + $scope.doc.sitaref.slice(4,6);
      };

      $scope.navigateTo = (page) => {
        page = Math.min(page, forms.length);
        $scope.activeForm = forms[page];
      };

      $scope.printdoc = () => {
        window.print();

      };

      $scope.sign = (id) => {
        wrapper.classList.remove("hide_on_screen");
        resizeCanvas();
        active_signature = document.body.querySelector(id);
      };

      $scope.submitFuelData = async () => {
        response = await fetch('/api/fuel', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            liters: $scope.fuel.liters,
            amount: $scope.fuel.amount,
            vehicle: $scope.fuel.vehicle,
            date: $scope.fuel.date,
            jobcard: $scope.fuel.jobcard,
          }),
        });
      };

      $scope.submitTripData = () => {
        $scope.saveTripData({
          date: $scope.sla.arrival,
          departure: $scope.jobcard.site.departure || "Cradock",
          destination: $scope.jobcard.site.town,
          startodo: $scope.jobcard.ov.ss,
          endodo: $scope.jobcard.ov.sse,
          pvtkm: 0,
          client: $scope.reporter.name,
          tollgates: $scope.doc.callid,
          vehicle: "FT60LXGP",
        });
        $scope.jobcard = new Jobcard();
      };

      $scope.submitCustomTripData = () => {
        $scope.saveTripData($scope.trip);
        $scope.toggleAddTrip();
      }

      $scope.saveTripData = async (trip) => {
        $scope.savekilos(trip.departure, trip.endodo);
        response = await fetch('/api/trips', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(trip),              
        });
      };

      $scope.getFuelData = async() => {
        response = await fetch('/api/fuel', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        $scope.fuelReport = (await response.json());
      }

      $scope.getTripData = async() => {
        response = await fetch('/api/trips', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        $scope.tripReport = (await response.json());
      }

      $scope.getTitle = () => {
        return $scope.doc.callid + ' ' + toTitleCase($scope.activeForm);
      };

      $scope.autoFillEqRem = () => {
        if ($scope.equipmentrem.eqremautofill === true) {
          $scope.equipmentrem.make = $scope.equipment.make;
          $scope.equipmentrem.model = $scope.equipment.model;
          $scope.equipmentrem.serial = $scope.equipment.serial;
          $scope.equipmentrem.date = $scope.jsDatetoSQLDate(now);
          $scope.equipmentrem.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.equipmentrem.make = "";
          $scope.equipmentrem.model = "";
          $scope.equipmentrem.serial = "";
          $scope.equipmentrem.date = "";
          $scope.equipmentrem.time ="";
        }
        
      };

      $scope.autoFillBackup = () => {
        if ($scope.backup.backupautofill === true) {
          $scope.backup.make = $scope.equipment.make;
          $scope.backup.model = $scope.equipment.model;
          $scope.backup.serial = $scope.equipment.serial;
          $scope.backup.date = $scope.jsDatetoSQLDate(now);
          $scope.backup.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.backup.make = "";
          $scope.backup.model = "";
          $scope.backup.serial = "";
          $scope.backup.date = "";
          $scope.backup.time ="";
        }
        
      };

      $scope.autoFillEqRet = () => {
        if ($scope.equipmentret.eqretautofill === true) {
          $scope.equipmentret.make = $scope.equipment.make;
          $scope.equipmentret.model = $scope.equipment.model;
          $scope.equipmentret.serial = $scope.equipment.serial;
          $scope.equipmentret.date = $scope.jsDatetoSQLDate(now);
          $scope.equipmentret.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.equipmentret.make = "";
          $scope.equipmentret.model = "";
          $scope.equipmentret.serial = "";
          $scope.equipmentret.date = "";
          $scope.equipmentret.time ="";
        }
        
      };

      // window.onscroll = function() {myFunction()};
      //   var navbar = document.querySelector("nav");
      //   var sticky = navbar.offsetTop;

      //   function myFunction() {
      //     if (window.pageYOffset > sticky) {
      //       navbar.classList.add("sticky")
      //     } else {
      //       navbar.classList.remove("sticky");
      //     }
      //   };


    });