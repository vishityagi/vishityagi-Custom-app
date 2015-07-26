angular.module('reviewBook.services', [])
.factory('user', function(){

	var o = {
		customers:[]

	}
	o.add = function(customer) {
    
    // add to favorites array
    o.customers.unshift(customer);
  	}
	
	o.removecustomer = function(customer, index) {
    

    // add to favorites array
    o.customers.splice(index, 1);
  }
  return o;
})
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
 
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        var output = [];
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service example
.factory('Document', function(DB) {
    var self = this;
  self.add = function(customer) {
    var parameters = [customer.name,customer.email];
    return DB.query("INSERT INTO documents (name, email) VALUES (?,?)", parameters);
  }
 
  self.removecustomer= function(customer) {
    var parameters = [customer.name];
    return DB.query("DELETE FROM documents WHERE name = (?)", parameters);
     
  }
     self.all = function() {
        return DB.query('SELECT * FROM documents')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.searchcustomer = function(name) {
        return DB.query('SELECT * FROM documents WHERE name = ?', [name])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    return self;
});