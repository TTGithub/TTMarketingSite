(function (window) {
  var ViewModel = function () {
    var self = this;

    self.quickDealPrice = ko.observable();
    self.quickDealTerm = ko.observable();
    self.indivPremiumPrice = ko.observable();
    self.indivPremiumRenewal = ko.observable();
    self.indivPremiumTerm = ko.observable();
    self.corpBasicPrice = ko.observable();
    self.corpBasicRenewal = ko.observable();
    self.corpBasicTerm = ko.observable();
    self.corpPremiumPrice = ko.observable();
    self.corpPremiumRenewal = ko.observable();
    self.corpPremiumTerm = ko.observable();
    self.univClassPrice = ko.observable();
    self.univClassTerm = ko.observable();
  }

  $(document).ready(function () {
    window.vm = new ViewModel();

    $.get("http://localhost:8000/api/Engine/PricingMatrix", function (returnData) {
      vm.quickDealPrice(numeral(returnData.AccountTypes[0].PurchasePrice).format('$0,0'));
      vm.quickDealTerm(returnData.AccountTypes[0].Term);
      vm.indivPremiumPrice(numeral(returnData.AccountTypes[1].SubscriptionPrice).format('$0,0'));
      vm.indivPremiumRenewal(numeral(returnData.AccountTypes[1].RenewalPrice).format('$0,0'));
      vm.indivPremiumTerm(returnData.AccountTypes[1].Term);
      vm.corpBasicPrice(numeral(returnData.AccountTypes[2].SubscriptionPrice).format('$0,0'));
      vm.corpBasicRenewal(numeral(returnData.AccountTypes[2].RenewalPrice).format('$0,0'));
      vm.corpBasicTerm(returnData.AccountTypes[2].Term);
      vm.corpPremiumPrice(numeral(returnData.AccountTypes[3].SubscriptionPrice).format('$0,0'));
      vm.corpPremiumRenewal(numeral(returnData.AccountTypes[3].RenewalPrice).format('$0,0'));
      vm.corpPremiumTerm(returnData.AccountTypes[3].Term);
      vm.univClassPrice(numeral(returnData.AccountTypes[4].PurchasePrice).format('$0,0'));
      vm.univClassTerm(returnData.AccountTypes[4].Term);
    });

    // package so user don't have to click on the dropdown menu, it reveals itself automatically
    $('.navbar [data-toggle="dropdown"]').bootstrapDropdownHover({});

    // Logo click equals to hamburger menu click
    $('.menu-logo').click(function() {
      var hb = $('#hamburger-button:visible');
      if (hb.length > 0) {
        $('#hamburger-button').click();
      } else {
        $('#home-menu').click();
      }
    });

    // When someone picks a menu point, the menu automatically recedes
    $(".navbar-nav li a").click(function (event) {
      if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    var $ytIframe = $("#ytIframe");
    $('#ytModalDialog').on('show.bs.modal', function () {
      if (!$ytIframe.attr("src"))
        $ytIframe.attr("src", "https://www.youtube.com/embed/eH4O3StcAyM?enablejsapi=true");
    }).on('shown.bs.modal', function () {
      $ytIframe[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }).on('hide.bs.modal', function () {
      $ytIframe[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      // Maybe also seekTo(0);
    });

    $(document).on("click", "li.case-study-li" , function() {
      var caseStudyId = $(this).data("case-study");
      $caseStudyIframe = $("#case-study-iframe-" + caseStudyId);
      if (!$caseStudyIframe.attr("src")) {
        var $caseStudySpinner = $("#case-study-spinner-" + caseStudyId);
        $caseStudySpinner.removeClass("hidden");
        var documentName = $caseStudyIframe.data("document");
        var caseStudyNumber = caseStudyId.split("_")[0];
        $caseStudyIframe.attr("src",
          "http://docs.google.com/gview?url=https://mrcsabatoth.github.io/ThruThink/casestudies/" +
          caseStudyNumber + "/" + documentName + ".pdf&embedded=true"
        );
      }
    });

    window.topCenterSplash = new Noty({
      type: 'warning',
      layout: 'topCenter',
      theme: 'metroui',
      closeWith: ['click', 'button'],  // remove them to prevent close
      animation: {
          open : 'animated bounceIn',
          close: 'animated bounceOut'
      },
      text: '<img src="img/SplashImage.png"/>',
    }).show();
    window.topRightSplash = null;
  });
}(window));
