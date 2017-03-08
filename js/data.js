var app = angular.module("app",["ngRoute","ngSanitize","ngTouch"]);
app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:"tpl/first.html",
		controller:"index-list"
	}).when('/show/:id',{
		templateUrl:"tpl/show.html",
		controller:"show"
	}).when('/list/:id',{
		templateUrl:"tpl/list.html",
		controller:"list"
	})
});
app.controller("index-list",function($scope,$http){
	$http({
		url:'index.php?url=http://news-at.zhihu.com/api/4/news/latest',
		method:"GET",
	}).then(function(data){
		$scope.data = data;
	});
	$scope.click = function($event){
		var ev = $event.target;
		mask = document.querySelector(".mask");
		parent = ev.parentNode.parentNode.parentNode.parentNode.parentNode;
		parent.style.transition = "transform .5s";
		parent.style.transform = "translateX(0)";
		setTimeout(function(){
				console.log(1)
				mask.style.display = "block";

			},100)
	};
	var startX = 0;
	var endX = 0;
	$scope.move = function($event){
		var aim1 = $event.targetTouches[0];
		startX = aim1.clientX;
	}
	$scope.go = function($event){
		var aim2 = $event.targetTouches[0];
		endX = aim2.clientX;
		if(startX-endX>60){
			parent.style.transition = "transform .5s";
			parent.style.transform = "translateX(-6.08rem)";
			mask.style.display = "none";
			}
	}

});
app.controller('head',function($scope,$http){
	$http({
		url:'index.php?url=http://news-at.zhihu.com/api/4/themes',
		method:"GET",
	}).then(function(data){
		$scope.data = data.data.others;
	})
})
app.controller('show',function($scope,$http,$routeParams){
	var id = $routeParams.id;
	$http({
		url:'index.php?url=http://news-at.zhihu.com/api/4/news/'+id,
		method:"GET",
	}).then(function(data){
		$scope.data = data.data;
	});
	$http({
		url:"index.php?url=http://news-at.zhihu.com/api/4/story-extra/"+id,
		method:"GET"
	}).then(function(data2){
		$scope.data2 = data2.data;
	})
})
app.controller('list',function($scope,$http,$routeParams){
	var id = $routeParams.id;
	$http({
		url:"index.php?url=http://news-at.zhihu.com/api/4/theme/"+id,
		method:"GET",
	}).then(function(data){
		$scope.data = data;
		console.log(data)
	});
	$scope.click = function($event){
		var ev = $event.target;
		mask = document.querySelector(".mask");
		parent = ev.parentNode.parentNode.parentNode.parentNode.parentNode;
		parent.style.transition = "transform .5s";
		parent.style.transform = "translateX(0)";
		setTimeout(function(){
				console.log(1)
				mask.style.display = "block";

			},100)
	};
	var startX = 0;
	var endX = 0;
	$scope.move = function($event){
		var aim1 = $event.targetTouches[0];
		startX = aim1.clientX;
	}
	$scope.go = function($event){
		var aim2 = $event.targetTouches[0];
		endX = aim2.clientX;
		if(startX-endX>60){
			parent.style.transition = "transform .5s";
			parent.style.transform = "translateX(-6.08rem)";
			mask.style.display = "none";
			}
	}
});
// angular.element(window).bind('load', function(){  
        
// 		console.log(service_swiper2)
// });
app.directive('swipe',function(){
	return{
		restrict:"EA",
		templateUrl:'tpl/swiper.html',
		link:function(scope,element,attrs){
			console.log(element)
			var service_swiper2 = new Swiper(element,{
				pagination: '.swiper-pagination',
				paginationClickable: true,
				simulateTouch: false,
				loop: true,
				autoplayDisableOnInteraction: false,
				updateTranslate:true
			});
		}
	}
})