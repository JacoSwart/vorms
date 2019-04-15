    var jobcardapp = angular.module('Jobcard_app', []);
    var wrapper = document.getElementById("signature-pad");

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }

    jobcardapp.controller('Jobcard_controller', function ($scope) {
      let forms = ['JOBCARD', 'PARTS_REPLACEMENT', 'USER_DAMAGE', 'EQUIPMENT_REMOVAL', 'FUEL'];
      $scope.activeForm = forms[0];

      $scope.padZeros = function (str_p) {
        if (str_p > 9) {
          return str_p;
        } else {
          return "0" + str_p;
        }
      }

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
        reported: now.getFullYear() + "/" + $scope.padZeros((now.getMonth() + 1)) + "/" + $scope.padZeros(now.getDate()),
        arrival: now.getFullYear() + "/" + $scope.padZeros((now.getMonth() + 1)) + "/" + $scope.padZeros(now.getDate()),
        arrivetime: $scope.padZeros(now.getHours()) + ":" + $scope.padZeros(now.getMinutes()),
        completed: now.getFullYear() + "/" + $scope.padZeros((now.getMonth() + 1)) + "/" + $scope.padZeros(now.getDate()),
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
        date: "",
      }

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
            $scope.site.town = address[0];
            $scope.site.building = address[1];
            $scope.site.site = address[2];
          } else if (line[0].trim().toLowerCase() === 'floor') $scope.site.floor = line[1];
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
          } else if (line[0].trim().toLowerCase() === 'issue') $scope.problem.issue = 'Problem Reported :\n' + line[1].split('SLA ')[0];
        }
        document.querySelector("div#call").classList.add("hide_on_screen");
      }

      $scope.navigateTo = (page) => {
        page = Math.min(page, forms.length);
        $scope.activeForm = forms[page];
      };

      $scope.print = () => {
        window.print();
      };

      

      $scope.sign = (id) => {
        wrapper.classList.remove("hide_on_screen");
        resizeCanvas();
        active_signature = document.body.querySelector(id);
      };

      $scope.getTitle = () => {
        return $scope.doc.callid + ' ' + toTitleCase($scope.activeForm);
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