    var jobcardapp = angular.module('Jobcard_app', []);
    var wrapper = document.getElementById("signature-pad");

    class Trip {
      constructor() {
        this.date = new Date();
        this.departure = "";
        this.destination = "";
        this.startodo = "";
        this.endodo = 0;
        this.pvtkm = 0;
        this.client = "";
        this.tollgates = "";
        this.vehicle = "JP28LRGP";
      }
    }

    class Jobcard {
      constructor() {
        this.client = false;
        this.ov = {
          ss: 0,
          sse: 0,
          rs: 0,
          re: 0,
        };
        this.site = {
          street: "",
          building: "",
          site: "",
          floor: "",
          room: "",
          town: "",
          departure: "",
        };
        this.reporter = {
          name: "",
          tel: "",
          cell: ""
        };
        this.problem = {
          issue: "Problem Reported: ",
          resolution: "Problem Resolution: "
        };
        this.equipment = {
          asset: "",
          make: "",
          model: "",
          serial: "",
          barcode: "",
        };
        this.sla = {
          arrival: 0,
          arrivetime: 0,
          completed: 0,
          completedtime: "",
          arrive: false,
          complete: false,
        };

        this.faulty = {
          make1: "",
          model1: "",
          serial1: "",
          make2: "",
          model2: "",
          serial2: "",
          make3: "",
          model3: "",
          serial3: "",
        };
        this.replacement = {
          make1: "",
          model1: "",
          serial1: "",
          make2: "",
          model2: "",
          serial2: "",
          make3: "",
          model3: "",
          serial3: "",
        };
        this.equipmentrem = {
          make: "",
          model: "",
          serial: "",
          date: "",
          time: "",
          eqremautofill: false
        };
        this.backup = {
          make: "",
          model: "",
          serial: "",
          date: "",
          time: "",
          backupautorefill: false,
        };
        this.equipmentret = {
          make: "",
          model: "",
          serial: "",
          date: "",
          time: "",
          eqretautofill: false
        };
        this.signoff = {
          name: "",
          completed: false,
          notcompleted: false,
          samename: false,
          date: "",
        };
        this.slalvlsel = {
          excellent: true,
          good: false,
          avg: false,
          poor: false,
        };
      }

      setarrivaltime() {
        if (this.sla.arrivetime === "") {
          this.sla.arrivetime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          this.sla.arrivetime = "";
        }
      }
    }

    class Partsreplacement {
      constructor(call) {
        this.partsrep = {
          faultymb: "",
          faultymbserial: "",
          faultycpu: "",
          faultycpuserial: "UNKNOWN",
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
        };

      }
    }

    class CallHeader {
      constructor( callid = "",sitaref = "", assetnr = "", date="") {
        this.callid = callid;
        this.sitaref = sitaref;
        this.assetnr = assetnr;
        this.calldate = date;
      }
    }

    class Fuel {
      constructor(jobcard = "") {
        this.liters = 0;
        this.amount = 0;
        this.jobcard = jobcard;
        this.vehicle = "JP28LRGP";
        this.fueldate = new Date();
      }
    }

    class Audit {
      constructor() {
        this.compNr = 0;
        this.subCompNr = 0;
        this.persal = "";
        this.rank = "";
        this.suburb = "";
        


        

      }
    }

    jobcardapp.controller('Jobcard_controller', function ($scope) {
      

  
      function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

      let forms = ['JOBCARD', 'PARTS_REPLACEMENT', 'USER_DAMAGE', 'EQUIPMENT_REMOVAL', 'FUEL', 'TRIPS' ,'AUDIT'];
      $scope.activeForm = forms[0];
      let now = new Date();

      setInterval(() => {
        now = new Date();
      }, 3000);


      $scope.SMS = "";

      $scope.fsa = false;

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
        description: "",
      };

      $scope.fuelReport = [];

      $scope.tripReport = [];
      $scope.newDeparture = [];
      $scope.newCallHeader = new CallHeader();
      $scope.trip = new Trip();
      
      $scope.jobcard = new Jobcard();
      $scope.newparts = new Partsreplacement();
     

      $scope.padZeros = (str_p) => {
        if (str_p > 9) {
          return str_p;
        } else {
          return "0" + str_p;
        }
      };

      $scope.jsDatetoSQLDate = (date) => {
        return date.getFullYear() + "/" + $scope.padZeros((date.getMonth() + 1)) + "/" + $scope.padZeros(date.getDate());
      };

      $scope.setarrivaltime = () => {
        if ($scope.jobcard.sla.arrivetime === "") {
          $scope.jobcard.sla.arrivetime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.jobcard.sla.arrivetime = "";
        }
      };

      $scope.setcompletedtime = () => {
        if ($scope.jobcard.sla.completedtime === "") {
          $scope.jobcard.sla.completed = $scope.jsDatetoSQLDate(now);
          $scope.jobcard.sla.completedtime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.jobcard.sla.completedtime = "";
        }
      };

      $scope.setBackupTime = () => {
        if ($scope.backup.time === "") {
          $scope.backup.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.backup.time = "";
        }
      };

      $scope.setRemovedTime = () => {
        if ($scope.equipmentrem.time === "") {
          $scope.equipmentrem.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.equipmentrem.time = "";
        }
      };
      $scope.setReturnTime = () => {
        if ($scope.equipmentret.time === "") {
          $scope.equipmentret.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.equipmentret.time = "";
        }
      };

      $scope.newjobcard = () => {
        $scope.jobcard = new Jobcard();
        $scope.SMS = "";
        document.querySelector("div#call").classList.remove("hide_on_screen");
      };

      $scope.displayTripDialog = false;

      $scope.toggleAddTrip = () => {
        $scope.determineDeparture();
        switch ($scope.displayTripDialog) {
          case true:    /* Close current window*/
            $scope.displayTripDialog = false; 
            break;

          case false:  /*Start new Window*/
            $scope.trip = new Trip();
            $scope.displayTripDialog = true;
            break;
        }
      };
     
      $scope.parseCallSMS = () => {
        $scope.SMS = $scope.SMS.split('/');
        let newCallId, newSitaRef, newAssetNr, callDate;
        for (let line of $scope.SMS) {
          line = line.split(':');
          if (line[0].trim().toLowerCase() === 'heatref' || line[0].trim().toLowerCase() === 'hearef') newCallId = line[1];
          else if (line[0].trim().toLowerCase() === 'custref') newSitaRef = line[1];
          else if (line[0].trim().toLowerCase() === 'user') $scope.jobcard.reporter.name = line[1];
          else if (line[0].trim().toLowerCase() === 'tel') {
            line[1] = line[1].replace(/ /g, "");
            line[1] = line[1].replace(/-/g, "");
            line[1] = line[1].replace(/NONE/g, "          ");
            $scope.jobcard.reporter.tel = line[1].slice(0, 10);
            $scope.jobcard.reporter.cell = line[1].slice(10);
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
            newAssetNr = asset[0];
            $scope.jobcard.equipment.make = asset[2] + ' ' + asset[3];
            $scope.jobcard.equipment.model = asset[4];
          } else if (line[0].trim().toLowerCase() === 'issue') $scope.jobcard.problem.issue = 'Problem Reported :\n' + line[1].split('SLA ')[0];
        }
        document.querySelector("div#call").classList.add("hide_on_screen");
        $scope.jobcard.sla.reported = '20' + newSitaRef.slice(0,2) + '/' + newSitaRef.slice(2,4) + '/' + newSitaRef.slice(4,6);
        $scope.jobcard.sla.arrivetime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        callDate = $scope.jsDatetoSQLDate(now);
        $scope.newCallHeader = new CallHeader(newCallId, newSitaRef, newAssetNr, callDate);
        $scope.fuelEntry = new Fuel(newCallId, callDate);
        $scope.determineDeparture();

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
            liters: $scope.fuelEntry.liters,
            amount: $scope.fuelEntry.amount,
            vehicle: $scope.fuelEntry.vehicle,
            fueldate: $scope.jsDatetoSQLDate($scope.fuelEntry.fueldate),
            jobcard: $scope.fuelEntry.jobcard,
          }),
        });
        switch (response.status) {
          case 200: 
            $scope.alertDialog("Fuel record submitted successfully");
            break;
          default:
            $scope.alertDialog("An error occurred");
            break;
        }
      };

      $scope.determineDeparture = async () => {
        response = await fetch('/api/trips/departure', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        $scope.newDeparture = (await response.json());
        
        switch ($scope.newDeparture[0].date == $scope.jsDatetoSQLDate(now)) {
          case true: // TODO: ==
            $scope.jobcard.site.departure = $scope.newDeparture[0].destination;
            $scope.trip.departure = $scope.newDeparture[0].destination;
            break;

          case false:
            $scope.jobcard.site.departure = "CRADOCK";
            $scope.trip.departure = "CRADOCK";
            break;
        }
        $scope.jobcard.ov.ss = $scope.newDeparture[0].endodo;
        $scope.trip.startodo = $scope.newDeparture[0].endodo;
        $scope.$apply();
      };
    


      $scope.submitTripData = () => {

        $scope.saveTripData({
          date: $scope.newCallHeader.calldate,
          departure: $scope.jobcard.site.departure,
          destination: $scope.jobcard.site.town,
          startodo: $scope.jobcard.ov.ss,
          endodo: $scope.jobcard.ov.sse,
          pvtkm: 0,
          client: $scope.jobcard.reporter.name,
          tollgates: $scope.newCallHeader.callid,
          vehicle: "JP28LRGP",
        });
      };

      $scope.submitCustomTripData = () => {
        $scope.saveTripData($scope.trip);
        $scope.toggleAddTrip();

      };

      $scope.saveTripData = async (trip) => {
        response = await fetch('/api/trips', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(trip),              
        });
        switch (response.status) {
          case 200: 
            $scope.alertDialog("Trip submitted successfully");
            break;
          default:
            $scope.alertDialog("An error occurred");
            break;
        }
      };

      $scope.alertDialog = async (message) => {
        alert(message);
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
        $scope.$apply();
      };

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
        $scope.$apply();
    
        // console.log($scope.tripReport);
      };

      $scope.getTitle = () => {
        if ($scope.newCallHeader.callid) {
          return $scope.newCallHeader.callid + ' ' + toTitleCase($scope.activeForm); 
        } else {
          return toTitleCase($scope.activeForm); 
        }
      };

      $scope.autoFillEqRem = () => {
        if ($scope.jobcard.equipmentrem.eqremautofill === true) {
          $scope.jobcard.equipmentrem.make = $scope.jobcard.equipment.make;
          $scope.jobcard.equipmentrem.model = $scope.jobcard.equipment.model;
          $scope.jobcard.equipmentrem.serial = $scope.jobcard.equipment.serial;
          $scope.jobcard.equipmentrem.date = $scope.jsDatetoSQLDate(now);
          $scope.jobcard.equipmentrem.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.jobcard.equipmentrem.make = "";
          $scope.jobcard.equipmentrem.model = "";
          $scope.jobcard.equipmentrem.serial = "";
          $scope.jobcard.equipmentrem.date = "";
          $scope.jobcard.equipmentrem.time ="";
        }
        
      };

      $scope.autoFillBackup = () => {
        if ($scope.jobcard.backup.backupautofill === true) {
          $scope.jobcard.backup.make = $scope.jobcard.equipment.make;
          $scope.jobcard.backup.model = $scope.jobcard.equipment.model;
          $scope.jobcard.backup.serial = $scope.jobcard.equipment.serial;
          $scope.jobcard.backup.date = $scope.jsDatetoSQLDate(now);
          $scope.jobcard.backup.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.jobcard.backup.make = "";
          $scope.jobcard.backup.model = "";
          $scope.jobcard.backup.serial = "";
          $scope.jobcard.backup.date = "";
          $scope.jobcard.backup.time ="";
        }
        
      };

      $scope.autoFillEqRet = () => {
        if ($scope.jobcard.equipmentret.eqretautofill === true) {
          $scope.jobcard.equipmentret.make = $scope.jobcard.equipment.make;
          $scope.jobcard.equipmentret.model = $scope.jobcard.equipment.model;
          $scope.jobcard.equipmentret.serial = $scope.jobcard.equipment.serial;
          $scope.jobcard.equipmentret.date = $scope.jsDatetoSQLDate(now);
          $scope.jobcard.equipmentret.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        }
        else {
          $scope.jobcard.equipmentret.make = "";
          $scope.jobcard.equipmentret.model = "";
          $scope.jobcard.equipmentret.serial = "";
          $scope.jobcard.equipmentret.date = "";
          $scope.jobcard.equipmentret.time ="";
        }
        
      };

      window.onscroll = function() {myFunction()};
        var navbar = document.querySelector("nav");
        var sticky = navbar.offsetTop;

        function myFunction() {
          if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
          } else {
            navbar.classList.remove("sticky");
          }
        };


    });