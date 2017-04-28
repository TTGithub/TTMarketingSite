var caseStudyDefinition = [
  {
    "title": "Case Study<br>Description",
    "document": "Case Study"
  },
  {
    "title": "Transaction<br>Deal Page",
    "document": "Transaction Deal Page"
  },
  {
    "title": "Transaction<br>Deal Structure",
    "document": "Transaction Deal Structure"
  },
  {
    "title": "Transaction Buyers &amp;<br>Sellers Statement",
    "document": "Transaction Buyers n Sellers Statement"
  },
  {
    "title": "<em>ThruThink<sup>SM</sup><br>Deal Score</em>",
    "document": "ThruThink Deal Score"
  },
  {
    "title": "Snap Shot<br>Summary",
    "document": "Snap Shot Summary"
  },
  {
    "title": "Summary of<br>Salient Results",
    "document": "Summary of Salient Results"
  },
  {
    "title": "Balance<br>Sheet",
    "document": "Balance Sheet"
  },
  {
    "title": "Income<br>Statement",
    "document": "Income Statement"
  },
  {
    "title": "Cash Flow<br>Statement",
    "document": "Cash Flow Statement"
  },
  {
    "title": "Sources and<br>Uses of Cash",
    "document": "Sources and Uses of Cash"
  }
];

function hydratePage($targetItem, loadPageIndex, pageIndexStr, isSubPage, caseStudyId) {
  if ($targetItem.length > 0) {
    var $container = $targetItem.children(isSubPage ? '.containr' : '.container').eq(0);
    if ($container.attr('data-loaded') === 'false') {
      // Step 1: set caption
      var $well = null;
      if (!isSubPage)
        $well = $container.children(".well").eq(0);
      var $menuItem = $('li > a[data-page=' + pageIndexStr + ']');
      if (!$menuItem.hasClass("dont-copy-menu-title")) {
        var caption = $menuItem.html();
        if ($menuItem.data('caption'))
          caption = $menuItem.data('caption');
        if (caption) {
          captions = caption.split('|');  // Able to handle even multiple captions
          var $captionH = isSubPage ? $('h4[data-item-id="' + loadPageIndex + '"]') : $well.children("h4").eq(0);
          if ($captionH.length > 0) {
            $captionH.html(captions[0]);
            for (var i = captions.length - 1; i > 0; i--) {
              $('<h4 align="center">' + captions[i] + '</h4>\n').insertAfter($captionH);
            }
          }
        }
      }
      var $body = isSubPage ? $container : $well.children(".page-body").eq(0);
      if (caseStudyId) {
        var navTabs = '<ul class="nav nav-tabs">';
        var tabContent = '<div class="tab-content">';
        // Step 2: generate body
        $.each(caseStudyDefinition, function(i, csd) {
          i2 = i + 1;
          csId = caseStudyId + '_' + i2;
          navTabs += '<li class="' + (i == 0 ? 'active ': '') + 'case-study-li" data-case-study="' + csId + '">' +
                       '<a href="#case-study-tab-' + csId + '" data-toggle="tab"' + (i == 0 ? ' class="active"': '') + '>' +
                         '<span id="case-study-spinner-' + csId + '" class="fa fa-spinner fa-pulse hidden"></span>' +
                         csd['title'] +
                       '</a>' +
                     '</li>';
          tabContent += '<div class="tab-pane fade ' + (i == 0 ? 'active ': '') + 'in" id="case-study-tab-' + csId + '">' +
                          '<div class="center-block">' +
                            '<iframe id="case-study-iframe-' + csId + '" class="case-study-iframe case-study-iframe-' + caseStudyId + '" src="" data-document="' + csd['document'] + '" frameborder="0">' +
                            '</iframe>' +
                          '</div>' +
                        '</div>';
        });
        navTabs += '</ul>';
        tabContent += '</div>';
        $body.append(navTabs + tabContent);
        $(".case-study-iframe-" + caseStudyId).each(function (index) {
          $(this).load(function () {
            var idx = index + 1;
            var $spinner = $("#case-study-spinner-" + caseStudyId + "_" + idx);
            $spinner.addClass("hidden");
          });
        });
        $('li[data-case-study="' + caseStudyId + '_1"]').click();
      } else {
        // Step 2: load body
        $body.load("/pages/" + loadPageIndex + ".html", function(response, status, xhr) {
          if (status === "error") {
            var msg = "There was an error loading page content: ";
            console.log(msg + xhr.status + " " + xhr.statusText);
          } else {
            // https://stackoverflow.com/questions/6827810/unable-to-set-data-attribute-using-jquery-data-api
            $container.attr('data-loaded', 'true');
            $convertToDataTables = $container.find('.convert-to-datatables');
            $convertToDataTables.each(function () {
              var dataTbl = $(this).DataTable({
                responsive: true,
                info: false,
                lengthChange: false,
                ordering: false,
                paging: false,
                processing: true,
                searching: false,
                scrollX: true
              });
              setTimeout(function() {
                dataTbl.draw();
              }, 1000);
            });
            $body.find('[data-toggle="popover"]').popover({ html: true, trigger: "hover" });

            ko.applyBindings(vm, $body[0]);
          }
        });
      }
    }
  }
}

// Routing
page('/', slideTo);
page('/premise', slideTo);
page('/evaluation', slideTo);
page('/deal_score', slideTo);
page('/cash_flow', slideTo);
page('/capital_expenditures', slideTo);
page('/income_taxes', slideTo);
page('/adjustments', slideTo);
page('/adjust_journal_entries', slideTo);
page('/non_expense_cash_flow', slideTo);
page('/exit_strategy_analysis', slideTo);
page('/portion_purchase', slideTo);
page('/combine_multiple_projects', slideTo);
page('/adventure', slideTo);
page('/contact', slideTo);
page('/answers', slideTo);
page('/individuals', slideTo);
page('/individual_company', slideTo);
page('/corporations', slideTo);
page('/equity_investments', slideTo);
page('/university_classroom', slideTo);
page('/agriculture', slideTo);
page('/restaurant_chain', slideTo);
page('/real_estate', slideTo);
page('/advisory_cpa', slideTo);
page('/pricing', slideTo);
page('/quickdeal', slideTo);
page('/case_study_1', slideTo);
page('/case_study_2', slideTo);
page('/case_study_3', slideTo);
page('/case_study_4', slideTo);
page({
  hashbang: true
});

var lastPageIndex = 0;
var lastSubPageIndex = 0;

function closeImmediatey(notification) {
  var closeAnim = notification.options.animation.close;
  notification.options.animation.close = null;
  notification.close();
  notification.options.animation.close = closeAnim;
};

function slideTo(ctx) {
  if (ctx.init)
    return;

  var $toPageMenu = $('a.menu-item[href=".' + ctx.path + '"]');
  var toPageIndexStr = $toPageMenu.data("page");
  var toPageIndexes = toPageIndexStr.split("_");
  var toPageIndex = parseInt(toPageIndexes[0], 10);
  var toSubPageIndex = parseInt(toPageIndexes[1], 10);
  var hasBackground = $toPageMenu.hasClass("has-background");
  if (toPageIndex === lastPageIndex && toSubPageIndex === lastSubPageIndex)
    return;

  var splashImage = $toPageMenu.hasClass("splash-image");
  var isTopCenterSplashVisible = $("#noty_layout__topCenter").length > 0;
  var isRightCenterSplashVisible = $("#noty_layout__topRight").length > 0;
  var centerOrTop = toPageIndex === 0 && toSubPageIndex === 0;
  if (splashImage) {
    if (centerOrTop && !isTopCenterSplashVisible) {
      if (isRightCenterSplashVisible) {
        closeImmediatey(window.topRightSplash);
      }
      window.topCenterSplash.show();
    } else if (!centerOrTop && !isRightCenterSplashVisible) {
      if (isTopCenterSplashVisible) {
        closeImmediatey(window.topCenterSplash);
      }
      if (window.topRightSplash == null) {
        window.topRightSplash = new Noty({
          type: 'warning',
          layout: 'topRight',
          theme: 'metroui',
          closeWith: ['click', 'button'],
          animation: {
              open : 'animated bounceIn',
              close: 'animated bounceOut'
          },
          text: '<img src="img/SplashImage.png"/>',
        });
      }
      window.topRightSplash.show();
    }
  } else if (!splashImage) {
    window.topCenterSplash.close();
    if (window.topRightSplash != null) {
      window.topRightSplash.close();
    }
  }

  var loadPageIndex = toPageIndex + toSubPageIndex;
  var caseStudyId = $toPageMenu.hasClass("case-study") ? $toPageMenu.data("case-study") : null;
  if (toPageIndex !== lastPageIndex) {
    $('div.container[data-item-id="' + lastPageIndex + '"]').parent().addClass("hidden");
    var $toPage = $('div.container[data-item-id="' + toPageIndex + '"]').parent();
    if (toPageIndex > 0)
      hydratePage($toPage, loadPageIndex, toPageIndexStr, false, caseStudyId);
    $toPage.removeClass("hidden");
  }
  if (toSubPageIndex !== lastSubPageIndex) {
    var $fromSubPage = lastSubPageIndex > 0 ? $('div.containr[data-item-id="' + lastSubPageIndex + '"]').parent() : $(".imagesvg");
    $fromSubPage.addClass("hidden");
    $('h4[data-item-id="' + lastSubPageIndex + '"]').addClass("hidden");
    var $toSubPage = toSubPageIndex > 0 ? $('div.containr[data-item-id="' + toSubPageIndex + '"]').parent() : $(".imagesvg");
    if (toSubPageIndex > 0)
      hydratePage($toSubPage, loadPageIndex, toPageIndexStr, true, caseStudyId);
    $toSubPage.removeClass("hidden");
    $('h4[data-item-id="' + toSubPageIndex + '"]').removeClass("hidden");
  }
  lastPageIndex = toPageIndex;
  lastSubPageIndex = toSubPageIndex;
}

$(document).ready(function() {
  addedRegistry = { 0: true };  // Don't load the starter/home page, it's already there
  var $contentInner = $('#content-inner');
  var $subContent = $('#sub-content');
  var $subHeader = $('#sub-header');
  var $menuDefinitions = $("a.menu-item");
  $menuDefinitions.each(function (i, value) {
    var $menu = $(value);
    var indexStr = $menu.data("page");
    var indexes = indexStr.split("_");
    var index = parseInt(indexes[0], 10);
    var subIndex = parseInt(indexes[1], 10);
    var loadIndex = index + subIndex;
    if (!addedRegistry[loadIndex]) {
      if (subIndex > 0) {
        var subItemHeader =
          '          <h4 class="hidden" data-item-id="' + subIndex + '"></h4>\n';
        $subHeader.append(subItemHeader);
        var subItemContent =
          '          <div class="hidden item">\n' +
          '            <div class="containr" data-item-id="' + subIndex + '" data-loaded="false">\n' +
          '            </div>\n' +
          '          </div>\n';
        $subContent.append(subItemContent);
      } else {
        var widePage = $menu.hasClass("wide-page");
        var hasBackground = $menu.hasClass("has-background");
        var caseStudy = $menu.hasClass("case-study");
        var itemContent =
          '          <div class="hidden item' + (widePage ? ' wide-item' : '') + '">\n' +
          '            <div class="container' + (widePage ? ' wide-container' : '') + '" data-item-id="' + index + '" data-loaded="false"><div class="well page-well' + (hasBackground ? ' transparent-well' : ' invisible-well') + '">\n' +
          '              <h4 align="center"></h4>\n' +
          '              <div class="page-body"></div>\n' +
          '            </div></div>\n' +
          '          </div>\n';
        $contentInner.append(itemContent);
      }
      addedRegistry[loadIndex] = true;
    }
  });

  // Trident: IE 11
  // MSIE IE < 11
  if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1) {
    var panelWidth = $(".svg-panel-body").width();
    if (panelWidth) {
      var figureWidth = panelWidth - 2 * 15;
      var figureHeight = figureWidth * 726 / 1212;
      $(".imagesvg").width(figureWidth);
      $(".imagesvg").height(figureHeight);
    }
  }
  $('#answer_button').click(function(e) {
    page('/answers');
    e.preventDefault();
  });
});
