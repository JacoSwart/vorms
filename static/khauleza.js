    var jobcardapp = angular.module('Jobcard_app', []);


    jobcardapp.controller('Jobcard_controller', function($scope) { 
      $scope.padZeros = function(str_p) {
          if (str_p.length = 2) {
            return str_p;
          } else {
            return "0" + str_p;
          }
      }

      let now = new Date();
      setInterval(function() { 
        now = new Date();
      }, 3000);
      $scope.SMS = '';
      $scope.issue = '';
      $scope.fsa = false; 
      $scope.reporter = { 
        name: "", 
        tel: "", 
        cell: "" 
      } 
      $scope.site = { 
        street: "", 
        building: "", 
        site: "", 
        floor: "", 
        room: "", 
        town: "", 
      } 
      $scope.equipment = { 
        asset: "", 
        make: "", 
        model: "", 
        serial: "",
        barcode: "" ,
      } 
      $scope.sla = { 
        reported: "" + now.getFullYear() + "/" + $scope.padZeros("" + (now.getMonth() + 1)) + "/" + $scope.padZeros("" + now.getDate()), 
        arrival: now.getFullYear() + "/" + $scope.padZeros((now.getMonth() + 1)) + "/" + $scope.padZeros(now.getDate()), 
        arrivetime: $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes()),
        completed: "" + now.getFullYear() + "/" + $scope.padZeros("" + (now.getMonth() + 1)) + "/" + $scope.padZeros("" + now.getDate()), 
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
      $scope.ov = { 
        ss: "", 
        sse: "", 
        rs: "", 
        re: "", 
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
      }

      $scope.signoff = {
        name: "",
        completed: false,
        notcompleted: false,
        samename: false,
        date: "" , 
      }

      // $scope.setarrivaltime = function() {
      //   if ($scope.sla.arrivetime === "") {
      //     $scope.sla.arrivetime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
      //   } else {
      //     $scope.sla.arrivetime = "";
      //   }
      // }

      $scope.setcompletedtime = function() {
        if ($scope.sla.completedtime === "") {
          $scope.sla.completedtime = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else {
          $scope.sla.completedtime = "";
        }
      } 

      $scope.setBackupTime = function() { 
        if ($scope.backup.time === "") { 
          $scope.backup.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else { 
          $scope.backup.time = ""; 
        }
      }

      $scope.setRemovedTime = function() { 
        if ($scope.equipmentrem.time === "") { 
          $scope.equipmentrem.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else { 
          $scope.equipmentrem.time = ""; 
        }
      } 
      $scope.setReturnTime = function() { 
        if ($scope.equipmentret.time === "") { 
          $scope.equipmentret.time = $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes());
        } else { 
          $scope.equipmentret.time = ""; 
        } 
      } 

      $scope.parseCallSMS = function() {

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
          }
          else if (line[0].trim().toLowerCase() === 'site') {
            let address = line[1].split(' - ');
            $scope.site.town = address[0];
            $scope.site.building = address[1];
            $scope.site.site = address[2];
          }
          else if (line[0].trim().toLowerCase() === 'floor') $scope.site.floor = line[1];
          else if (line[0].trim().toLowerCase() === 'room') $scope.site.room = line[1];
          else if (line[0].trim().toLowerCase() === 'asset') {
            let asset = [];
            for (let assetAttribute of line[1].split('-')) {
              asset.push(assetAttribute.trim());
            }
            console.log(asset);
            $scope.equipment.asset = asset[0];
            $scope.equipment.make = asset[2] + ' ' + asset[3];
            $scope.equipment.model = asset[4];
          }
          else if (line[0].trim().toLowerCase() === 'issue') $scope.issue = 'Problem Reported :\n' + line[1];
        }
        document.querySelector("div#call").classList.add("hide_on_screen");
      }
    });
 