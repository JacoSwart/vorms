    var jobcardapp = angular.module('Jobcard_app', []);


    jobcardapp.controller('Jobcard_controller', function($scope) { 
      $scope.padZeros = function(str_p) {
          if (str_p.length >= 2) {
            return str_p;
          } else {
            return "0" + str_p;
          }
      }

      let now = new Date();
      setInterval(function() { 
        now = new Date();
      }, 3000);
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
        arrival:"" + now.getFullYear() + "/" + $scope.padZeros("" + (now.getMonth() + 1)) + "/" + $scope.padZeros("" + now.getDate()), 
        arrivetime: "",
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
        samename: false,
        date: "" , 
      }





      $scope.setarrivaltime = function() {
        if ($scope.sla.arrivetime === "") {
          $scope.sla.arrivetime = "" + $scope.padZeros(""+now.getHours()) + ":" + $scope.padZeros("" + now.getMinutes());
        } else {
          $scope.sla.arrivetime = "";
        }
      }

      $scope.setcompletedtime = function() {
        if ($scope.sla.completedtime === "") {
          $scope.sla.completedtime = "" + $scope.padZeros(""+now.getHours()) + ":" + $scope.padZeros("" + now.getMinutes());
        } else {
          $scope.sla.completedtime = "";
        }
      } 

      $scope.setBackupTime = function() { 
        if ($scope.backup.time === "") { 
          $scope.backup.time = "" + $scope.padZeros(""+now.getHours()) + ":" + $scope.padZeros("" + now.getMinutes());
        } else { 
          $scope.backup.time = ""; 
        }
      }

      $scope.setRemovedTime = function() { 
        if ($scope.equipmentrem.time === "") { 
          $scope.equipmentrem.time = "" + $scope.padZeros(""+now.getHours()) + ":" + $scope.padZeros("" + now.getMinutes());
        } else { 
          $scope.equipmentrem.time = ""; 
        }
      } 
      $scope.setReturnTime = function() { 
        if ($scope.equipmentret.time === "") { 
          $scope.equipmentret.time = "" + $scope.padZeros("" + now.getHours()) + ":" + $scope.padZeros("" + now.getMinutes());
        } else { 
          $scope.equipmentret.time = ""; 
        } 
      } 
    });
 