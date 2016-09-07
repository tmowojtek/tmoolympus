angular.module('settingsApp').controller('NewsController', ['$scope', 'fileReaderFactory', 'newsService', 'getNewsCategories', 'getRoles', function ($scope, fileReaderFactory, newsService, getNewsCategories, getRoles) {
    var self = this;

    self.successMsg = null;
    self.errorMsg = null;
    self.selectedPic = null;
    self.selectedPicSrc = null;
    
    self.addNewsBtnIsDisabled = false;

    self.newsCategories = getNewsCategories;
    self.newsRoles = getRoles;

    self.loadPreviewPictureOnChange = function () {
        fileReaderFactory.readAsDataURL(self.selectedPic, $scope).then(function (result) {
            self.selectedPicSrc = result;
        });
    };

    self.addNews = function (news) {
        self.addNewsBtnIsDisabled = true;
        
        self.successMsg = null;
        self.errorMsg = null;
        if (!news) {
            self.errorMsg = ' Fill in every field.';
            
            self.addNewsBtnIsDisabled = false;
        } else {
            if (!news.title) {
                self.errorMsg += ' fill in title 4+chars ';
            }
            if (!news.category.categoryname) {
                self.errorMsg += ' fill in category ';
            }
            if (!news.role.rolename) {
                self.errorMsg += ' fill in visibility ';
            }
            if (!news.content) {
                self.errorMsg += ' fill in title ';
            }
            if (!self.selectedPic) {
                self.errorMsg += ' select pic ';
            } else {
                news.selectedPic = self.selectedPic;
            }
            if (!self.errorMsg) {
                console.log(news);
                // to do service execute to upload
                newsService.uploadNews(news).then(function (data) {
                    self.successMsg = data;
                    $scope.news = null;
                    
                    self.addNewsBtnIsDisabled = false;
                }, function (data) {
                    self.errorMsg = data;
                    
                    self.addNewsBtnIsDisabled = false;
                });
            } else {
                self.addNewsBtnIsDisabled = false;
            }
        }
    };
}]);