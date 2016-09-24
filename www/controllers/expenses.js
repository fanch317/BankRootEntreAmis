angular.module('bankroot')

    .controller('ExpensesCtrl', function($scope, $log, $stateParams, $state, $ionicHistory, $rootScope, Storage, Project, Member, Expense) {

        $log.debug('ExpensesCtrl..');
        loadFromProject($stateParams.projectId);

        
        //Display page for new project creation
        function loadFromProject(projectId){
            //Get project object
            $scope.project = Storage.getProject(projectId);
            if($scope.project === undefined){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.projectnew');
            }else {
                $scope.projectId = projectId;
                $scope.pageTitle = 'Dépenses du projet ' + $scope.project.name;
            }
        }

        // Add Participant to theproject
        $scope.addExpense = function () {

            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.projectnewexpense', {projectId: $scope.projectId}, {reload: true});

        };


        $scope.back = function(){

            $log.debug('back');

            if ($stateParams.expenseId === undefined) {
                $ionicHistory.nextViewOptions({disableBack: true});
                $state.go('app.projectedit', {projectId: $scope.projectId}, {reload: true});
            } else {
                $ionicHistory.nextViewOptions({disableBack: true});
                $state.go('app.projectexpenses', {projectId: $scope.projectId}, {reload: true});
            }

        };

        // Remove a expense from project
        $scope.deleteExpense = function(expenseId){

            $log.debug('deleteExpense '+expenseId);
            $scope.project.removeExpenseId(expenseId);

        };

        $scope.createExpense = function(){

            $log.debug('createExpense..');

            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.projectnewexpense', {projectId: $scope.projectId}, {reload: true});
            
        };

        $scope.editExpense = function(expenseId){

            $log.debug('editExpense..');

            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.projectexpense', {projectId: $scope.projectId, expenseId: expenseId}, {reload: true});

        };

    });