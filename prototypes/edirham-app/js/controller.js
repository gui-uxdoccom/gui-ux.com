angular.module('website', ['ngRoute','gaugejs']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/cards', {templateUrl: 'partials/cards.html', controller: 'cardsCtrl'}).
            when('/services', {templateUrl: 'partials/services.html', controller: 'servicesCtrl'}).
			when('/business', {templateUrl: 'partials/business.html', controller: 'businessCtrl'}).
            when('/what-is-edirham', {templateUrl: 'partials/what-is-eDirham.html', controller: 'whatisedirhamCtrl'}).
			when('/card-types', {templateUrl: 'partials/card-types.html', controller: 'cardsCtrl'}).
			when('/cards-apply', {templateUrl: 'partials/cards-apply.html', controller: 'cardapplyCtrl'}).
			when('/card-howtouse', {templateUrl: 'partials/cards-howtouse.html', controller: 'cardhowtouseCtrl'}).
			when('/customer-service', {templateUrl: 'partials/customer-service.html', controller: 'customer-serviceCtrl'}).
			when('/press-details', {templateUrl: 'partials/press-details.html', controller: 'pressCtrl'}).
			when('/press-release', {templateUrl: 'partials/press-release.html', controller: 'pressCtrl'}).
			when('/terms', {templateUrl: 'partials/terms.html', controller: 'termsCtrl'}).
			when('/where-to-use', {templateUrl: 'partials/where-to-use.html', controller: 'where-to-useCtrl'}).
			when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'}).
			when('/passcode', {templateUrl: 'partials/passcode.html', controller: 'passcodeCtrl'}).
			when('/which-card', {templateUrl: 'partials/which-card.html', controller: 'which-cardCtrl'}).
			when('/feedback', {templateUrl: 'partials/feedback.html', controller: 'feedbackCtrl'}).
            when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'}).
            when('/edwallet', {templateUrl: 'partials/edwallet.html', controller: 'edwalletCtrl'}).
            when('/lastTransaction', {templateUrl: 'partials/last-transaction.html', controller: 'lastTransactionCtrl'}).
            when('/transactionDetail', {templateUrl: 'partials/transactionDetail.html', controller: 'transactionDetailCtrl'}).
            when('/addPayment', {templateUrl: 'partials/addPayment.html', controller: 'addPaymentCtrl'}).
            when('/paymentMethods', {templateUrl: 'partials/listPaymentMethod.html', controller: 'paymentMethodsCtrl'}).
            when('/transactionTest', {templateUrl: 'partials/transactionTest.html', controller: 'transactionTestCtrl'}).
            when('/confirmTransactionTest', {templateUrl: 'partials/confirmTransactionTest.html', controller: 'confirmTransactionTestCtrl'}).
            when('/confirmTransactionFinal', {templateUrl: 'partials/confirmTransactionFinal.html', controller: 'confirmTransactionFinalCtrl'}).
            when('/anonymousCardInquiry', {templateUrl: 'partials/anonymousCardInquiry.html', controller: 'anonymousCardInquiryCtrl'}).
            when('/cardDetail', {templateUrl: 'partials/cardBalanceDetail.html', controller: 'cardDetailCtrl'}).
            otherwise({redirectTo: '/login'});
    })
	
	.run(function($rootScope) {
    $rootScope.language = true;
   })
	
    .controller("servicesCtrl", ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
	    
	        $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				    $scope.serviceVariable = [];
				$http.get('json/service.json').success (function(data){
					$scope.serviceVariable = data;
					
				});
			}
			else if ($scope.lang==false){
				$scope.serviceVariable = [];
				$http.get('json/service_ar.json').success (function(data){
					$scope.serviceVariable = data;
					
				});  
			}

	}])	
		
    .controller('businessCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route) { 
		$scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				$http.get('json/business.json').success (function(data){
						$scope.businessVariable = data;
					}); 
				}
			else if ($scope.lang==false){
				$http.get('json/business_ar.json').success (function(data){
						$scope.businessVariable = data;
					}); 
				}

    }])
	.controller('mainCtrl', ['$scope','$http','$rootScope','$location','$route' , function($scope, $http,$rootScope,$location,$route) { 
	$scope.lang=$rootScope.language;
		if ( $scope.lang==true){
		 $scope.whatisedirham = "What is edirham" ;
		 $scope.cards="Cards";
		 $scope.services="Services";
		 $scope.business="Business";
		 $scope.passcode="Get the passcode";
		 $scope.cardno="Card Number";
		 $scope.activationcode="Activation Code";
		 $scope.activate="Activate";
		 $scope.login="Login";
		 $scope.username="User Name";
		 $scope.password="Password";
		 $scope.email="Email";
		 $scope.forgotpass="Forgot Password";
		 $scope.remember="Remember Me";
		 $scope.msgsend="A message has been sent to you";
		 $scope.msgtxt="Lorem ipsum dolor sit amet, consectetur adipiscing elita enean euismod bibendu.";
		 $scope.ok="Ok";
		 $scope.feedback= "Leave your feedback";
	     $scope.terms= "Terms and conditions";
	     $scope.custsupp="Customer Support Services";
	     $scope.tollfree="Toll free: 800MOF (800663) or International: +971 2 495 1000";
	     $scope.smsnoti="SMS Notifications";
	     $scope.locate="24/7 e-Dirham and NBAD ATMs/CDMs across the UAE";
		}
			
		$scope.relod = function(){
			$rootScope.language = !$rootScope.language;
	     	$route.reload();
			
		if ( $rootScope.language==true){
		 $scope.whatisedirham = "What is edirham" ;
		 $scope.cards="Cards";
		 $scope.services="Services";
		 $scope.business="Business";
		 $scope.passcode="Get the passcode";
		 $scope.cardno="Card Number";
		 $scope.activationcode="Activation Code";
		 $scope.activate="Activate";
		 $scope.login="Login";
		 $scope.username="User Name";
		 $scope.password="Password";
		 $scope.email="Email";
		 $scope.forgotpass="Forgot Password";
		 $scope.remember="Remember Me";
		 $scope.msgsend="A message has been sent to you";
		 $scope.msgtxt="Lorem ipsum dolor sit amet, consectetur adipiscing elita enean euismod bibendu.";
		 $scope.ok="Ok";
		 $scope.feedback= "Leave your feedback";
	     $scope.terms= "Terms and conditions";
	     $scope.custsupp="Customer Support Services";
	     $scope.tollfree="Toll free: 800MOF (800663) or International: +971 2 495 1000";
	     $scope.smsnoti="SMS Notifications";
	     $scope.locate="24/7 e-Dirham and NBAD ATMs/CDMs across the UAE";
		}
		else if ($rootScope.language==false){
		$scope.whatisedirham = "ما هو الدرهم الإلكتروني" ;
		 $scope.cards="البطاقات";
		 $scope.services="خدمات";
		 $scope.business="الأعمال";
		 $scope.passcode="Get the passcode";
		 $scope.cardno="Card Number";
		 $scope.activationcode="Activation Code";
		 $scope.activate="Activate";
		 $scope.login="Login";
		 $scope.username="User Name";
		 $scope.password="Password";
		 $scope.email="Email";
		 $scope.forgotpass="Forgot Password";
		 $scope.remember="Remember Me";
		 $scope.msgsend="A message has been sent to you";
		 $scope.msgtxt="Lorem ipsum dolor sit amet, consectetur adipiscing elita enean euismod bibendu.";
		 $scope.ok="Ok";
		 $scope.feedback= "Leave your feedback";
	     $scope.terms= "Terms and conditions";
	     $scope.custsupp="Customer Support Services";
	     $scope.tollfree="Toll free: 800MOF (800663) or International: +971 2 495 1000";
	     $scope.smsnoti="SMS Notifications";
	     $scope.locate="24/7 e-Dirham and NBAD ATMs/CDMs across the UAE";
		}	
		};

    }])
	
    .controller('pressCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		 $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				$http.get('json/press.json').success (function(data){
						$scope.pressVariable = data;
					}); 
			}
			else if ($scope.lang==false){
				$http.get('json/press_ar.json').success (function(data){
						$scope.pressVariable = data;
					}); 
			}

    }])
	.controller('footerCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		 $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				$http.get('json/main.json').success (function(data){
						$scope.footerVariable = data;
					}); 
			}
			else if ($scope.lang==false){
				$http.get('json/main_ar.json').success (function(data){
						$scope.footerVariable = data;
					}); 
			}

    }])
	.controller('loginCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   


    }])
	.controller('passcodeCtrl',['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   


    }])
	.controller('which-cardCtrl',['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		 $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				$http.get('json/whichcard.json').success (function(data){
						$scope.whichcardVariable = data;
					}); 
				$http.get('json/cards.json').success (function(data){
				$scope.cardsVariable = data;
			    });
			}
			else if ($scope.lang==false){
				$http.get('json/whichcard_ar.json').success (function(data){
						$scope.whichcardVariable = data;
					}); 
				$http.get('json/cards_ar.json').success (function(data){
				$scope.cardsVariable = data;
			    });
			}

    }])
	.controller('customer-serviceCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
	     $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
               $http.get('json/custservice.json').success (function(data){
				$scope.custserviceVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				 $http.get('json/custservice_ar.json').success (function(data){
				$scope.custserviceVariable = data;
			}); 
			}

    }])
	.controller('cardhowtouseCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
	      $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
               $http.get('json/howtouse.json').success (function(data){
				$scope.howtouseVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				 $http.get('json/howtouse_ar.json').success (function(data){
				$scope.howtouseVariable = data;
			}); 
			}

    }])
	.controller('where-to-useCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
            $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
			  $http.get('json/wheretouse.json').success (function(data){
				$scope.wheretouseVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				 $http.get('json/wheretouse_ar.json').success (function(data){
				$scope.wheretouseVariable = data;
			});
			}
    }])
	.controller('termsCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){ 
	        $scope.lang=$rootScope.language;
			if ( $scope.lang==true){     
               $http.get('json/terms.json').success (function(data){
				$scope.termsVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				 $http.get('json/terms_ar.json').success (function(data){
				$scope.termsVariable = data;
			}); 
			}

    }])
    .controller('whatisedirhamCtrl',['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
				new WOW().init();

				$scope.whatisedirhamVariable = [];
				
                $scope.animationTime = 128;
	            $scope.maxValue = 4000;

	            $scope.value = 1000;
	            $scope.value2 = 2000;
				$scope.value3 = 3000;
	            $scope.gaugeOptions = {
	                lines: 24,
	                // The number of lines to draw
	                angle: 0.35,
	                // The length of each line
	                lineWidth: 0.1,
	                // The line thickness
	                pointer: {
	                    length: 0.9,
	                    // The radius of the inner circle
	                    strokeWidth: 0.035,
	                    // The rotation offset
	                    color: '#000000' // Fill color
	                },
	                limitMax: 'false',
	                // If true, the pointer will not go past the end of the gauge
	                colorStart: '#FFFFFF',
	                // Colors
	                colorStop: '#FFFFFF',
	                // just experiment with them
	                strokeColor: '#E78600',
	                // to see which ones work best for you
	                generateGradient: false
	            };

            $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
				    $scope.serviceVariable = [];
				$http.get('json/whatisedirham.json').success (function(data){
					$scope.whatisedirhamVariable =  data;
				});
				$http.get('json/press.json').success (function(data){
				$scope.pressVariable = data;
					
				});
			}
			else if ($scope.lang==false){
				$http.get('json/whatisedirham_ar.json').success (function(data){
					$scope.whatisedirhamVariable =  data;
				});
				$http.get('json/press_ar.json').success (function(data){
				$scope.pressVariable = data;
					
				});  
			}


    }])

    .controller('cardsCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		 $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
		      $http.get('json/cards.json').success (function(data){
				$scope.cardsVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				$http.get('json/cards_ar.json').success (function(data){
				$scope.cardsVariable = data;
			}); 
			}

    }])
	.controller('feedbackCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		 $scope.lang=$rootScope.language;
			if ( $scope.lang==true){
		      $http.get('json/feedback.json').success (function(data){
				$scope.feedbackVariable = data;
			}); 
			}
			else if ($scope.lang==false){
				$http.get('json/feedback_ar.json').success (function(data){
				$scope.feedbackVariable = data;
			}); 
			}

    }])
	.controller('addPaymentCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   
		angular.element('#cc').slideUp();
		angular.element('#g2').slideUp();

		$scope.methods = ['Select the method type', 'eDirham G2','Credit card'];
		$scope.paymentMethod = $scope.methods[0];

		$scope.update = function() {

			if($scope.paymentMethod == $scope.methods[2])
			{
				angular.element('#cc').slideDown();
				angular.element('#g2').slideUp();
			}
			else if($scope.paymentMethod == $scope.methods[1])
			{
				angular.element('#cc').slideUp();
				angular.element('#g2').slideDown();
			}
			else
			{
				angular.element('#cc').slideUp();
				angular.element('#g2').slideUp();
			}
		};


    }])	
	.controller('homeCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('transactionTestCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('lastTransactionCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('confirmTransactionTestCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('paymentMethodsCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('anonymousCardInquiryCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }])	
    .controller('edwalletCtrl', ['$scope','$http','$rootScope','$route', function($scope, $http,$rootScope,$route){   

    }]);




