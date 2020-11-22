serviceApp.service('servService', function ($http) {
    //Listar todos serviços
    this.getAllServices = function () {
        return $http.get('/Service/ListServices');
    },

        //Adiciona serviço
        this.addService = function (service) {
            var request = $http({
                method: 'post',
                url: '/Service/AddService',
                data: service
            });
            return request;
        },

        //Atualiza serviço
        this.updateService = function (service) {
            var request = $http({
                method: 'post',
                url: '/Service/UpdateService',
                data: service
            });
            return request;
        },

        //Remove serviço
        this.removeService = function (UpdatedServiceId) {
            return $http.post('/Service/RemoveService/' + UpdatedServiceId);
        }
});