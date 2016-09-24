/**
 * Created by Greg on 06/07/2016.
 */

    angular.module('bankroot')
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
    .factory('Project', function($log, Member, Expense) {

        var Project = function (project) {

            this.memberId = 0;
            this.members = {};
            this.expenseId = 0;
            this.expenses = {};

            if(project !== undefined){
                //angular.extend(this, project);
                angular.merge(this, project);


                //Extend members objects if exists
                if(project.members !== undefined){
                    this.members = {};
                    members = this.members;
                    angular.forEach(project.members, function(member,id){
                        members[id] = new Member(member);
                    });
                }

                //Extend expenses objects if exists
                if(project.expenses !== undefined){
                    this.expenses = {};
                    expenses = this.expenses;
                    angular.forEach(project.expenses, function(expense,id){
                        expenses[id] = new Expense(expense);
                    });
                }

            }

        };

        Project.prototype.getMembers = function () {
            return this.members;
        };

        Project.prototype.addMember = function (member) {
            this.members[this.memberId] = member;
            this.memberId++;
        };


        Project.prototype.removeMemberId = function (memberId) {
            if(memberId in this.members)
                delete this.members[memberId];
        };

        Project.prototype.addExpense = function (expense, expenseId) {
            if(expenseId !== undefined) {
                //Update a existant expense
                this.expenses[expenseId] = expense;
            }else{
                //Add a new expense and increment id
                this.expenses[this.expenseId] = expense;
                this.expenseId++;
            }
        };


        Project.prototype.removeExpenseId = function (expenseId) {
            if(expenseId in this.expenses)
                delete this.expenses[expenseId];
        };


        Project.prototype.getExpensesDetailForMemberId = function (memberId) {
            var memberDetail = {};
            memberDetail.debtorIdList = [];
            memberDetail.recipientIdList = [];
            angular.forEach(this.expenses, function(expense,id){
                if(memberId in expense.debtors)
                {
                    memberDetail.debtorIdList.push(id);
                }
                if(memberId in expense.recipients)
                {
                    memberDetail.recipientIdList.push(id);
                }
            });
            return memberDetail;
        };

        Project.prototype.getAllRecipientExpensesForMemberId = function (memberId) {

            return getExpensesDetailForMemberId(memberId).recipientIdList;
        };

        Project.prototype.getAllDebtorExpensesForMemberId = function (memberId) {
            return getExpensesDetailForMemberId(memberId).debtorIdList;
        };

        Project.prototype.getBalanceForMemberId = function (memberId) {
            var balanceDetail = {};
            balanceDetail.totalSpent = 0;
            balanceDetail.totalReceive = 0;

            var memberDetail = getExpensesDetailForMemberId(memberId);

            angular.forEach(memberDetail.debtorIdList, function(expenseID){
                balanceDetail.totalSpent += this.expenses[expenseID].debtors[memberId];
            });

            angular.forEach(memberDetail.recipientIdList, function(expenseID){
                var v = this.expenses[expenseID].recipients[memberId] * this.expenses[expenseID].totalAmount();
                balanceDetail.totalReceive += v;
            });

            return balanceDetail;
        };

        return Project;

    });