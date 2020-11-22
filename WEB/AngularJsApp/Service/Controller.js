//Controller - Services

serviceApp.controller('serviceCtrl', function ($scope, servService) {

    loadServices();

    //Carrega todos serviços
    function loadServices() {
        var listService = servService.getAllServices();

        listService.then(function (res) {
            $scope.Services = res.data
        },
            function () {
                alert('Ocorreu um erro ao listar todos os serviços!')
            });
    }

    //Adiciona serviços
    $scope.addService = function () {
        var service = {
            serviceId: $scope.serviceId,
            description: $scope.description,
            date: $scope.date,
            type: $scope.type
        };

        var addInfo = servService.addService(service);

        addInfo.then(function (res) {
            if (res.data.success == true) {
                loadServices();
                alert('Serviço agendado com sucesso!');
                $scope.clearData();
            }
            else {
                alert('Serviço não agendado!');
            }
        },
            function () {
                alert('Erro ao tentar agendar novo serviço!');
            });
    }


    $scope.updateServiceById = function (service) {

        $scope.UpdatedServiceId = service.ServiceId;
        $scope.UpdatedDescription = service.Description;
        $scope.UpdatedDate = service.Date;
        $scope.UpdatedType = service.Type;
    }

    $scope.updateService = function () {
        var service = {
            ServiceId: $scope.UpdatedServiceId,
            Description: $scope.UpdatedDescription,
            Date: $scope.UpdatedDate,
            Type: $scope.UpdatedType
        };

        var updateInfo = servService.updateService(service);

        updateInfo.then(function (res) {
            if (res.data.success == true) {
                loadServices();
                alert('Serviço atualizado com sucesso!');
                $scope.clearDataUpdated();
            } else {
                alert('Serviço não atualizado');
            }
        }, function () {
            alert('Erro ao tentar atualizar serviço');
        });
    }

    //Método que recupera o serviço para ser removido
    $scope.removeServiceById = function (service) {
        $scope.UpdatedServiceId = service.ServiceId;
        $scope.UpdatedDescription = service.Description;
    }

    //Remove o serviço agendado
    $scope.removeService = function (UpdatedServiceId) {
        var removeInfo = servService.removeService($scope.UpdatedServiceId);
        removeInfo.then(function (res) {
            if (res.data.success == true) {
                loadServices();

                alert('Serviço removido com sucesso!')
            } else {
                alert('Serviço não removido.')
            }
        }, function () {
            alert('Erro ao tentar remover serviço agendado.');
        });
    }

    //Limpa os campos
    $scope.clearData = function () {
        $scope.serviceId = '',
            $scope.description = '',
            $scope.date = '',
            $scope.type = ''
    }

    $scope.clearDataUpdated = function () {
        $scope.UpdatedServiceId = '',
            $scope.UpdatedDescription = '',
            $scope.UpdatedDate = '',
            $scope.UpdatedType = ''
    }
});

