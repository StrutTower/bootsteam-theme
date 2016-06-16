(function () {
    'use strict';

    angular
        .module('app', ['ngAnimate', 'ui.bootstrap'])
        .controller('demoController', demoController);

    function demoController($uibModal) {
        var vm = this;
        vm.test = "test";
        vm.openModal = openModal
        vm.pager = {
            totalItems: 100,
            pageNumber: 1,
            disable: false
        }

        function openModal(size) {
            $uibModal.open({
                templateUrl: 'modal-template',
                controller: modalController,
                controllerAs: 'vm',
                size: size
            });
        }
    }

    function modalController() {
        var vm = this;
        vm.ok = okClicked;
        vm.cancel = cancelClicked;

        function okClicked($close) {
            $close();
        }

        function cancelClicked($close) {
            $close();
        }
    }
})();