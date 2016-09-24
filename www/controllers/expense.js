/**
 * Created by Greg on 16/07/2016.
 */
angular.module('bankroot')

    .controller('ExpenseCtrl', function($scope, $log,  $stateParams, $ionicHistory, $state, $rootScope, Storage, Project, Member, Expense) {

        $log.debug('ExpenseCtrl..');

        if ($stateParams.expenseId !== undefined) {
            loadFromProject($stateParams.projectId,$stateParams.expenseId)
        } else {
            loadFromNewProject($stateParams.projectId);
        }

        //Display page with data project
        function loadFromNewProject(projectId){
            //Instanciate a new project
            $scope.project = Storage.getProject(projectId);

            $scope.projectId = projectId;
            $scope.expense = new Expense();
            delete $scope.expenseId;
            $scope.pageTitle = 'Nouvelle dépense';
        }

        //Display page for new project creation
        function loadFromProject(projectId,expenseId){
            //Get project object
            $scope.project = Storage.getProject(projectId);
            $scope.projectId = projectId;

            $scope.expense =  $scope.project.expenses[expenseId];
            if($scope.expense === undefined){
                $ionicHistory.nextViewOptions({disableBack: true});
                $state.go('app.projectnew');
            }else {
                $scope.expenseId = expenseId;
                $scope.pageTitle = 'Modifier la dépense ' + $scope.expense.title;
            }
        }

        $scope.back = function(){

            $log.debug('back');

                $ionicHistory.nextViewOptions({disableBack: true});
                $state.go('app.projectexpenses', {projectId: $scope.projectId}, {reload: true});

        };


        $scope.saveExpense = function(expense){

            $log.debug('saveExpense');
            $scope.project.addExpense(expense, $scope.expenseId);
            Storage.save(expense);
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.projectedit', {projectId: $scope.projectId}, {reload: true});
        };

        $scope.saveExpenseAndCreateNew = function(){

            $log.debug('saveExpenseAndCreateNew..');
            $scope.project.addExpense($scope.expense);
            Storage.save();
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.projectnewexpense', {projectId: $scope.projectId}, {reload: true});
        };

    });