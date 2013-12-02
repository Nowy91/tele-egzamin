Teleegzam.module('Utils', function (Utils, Teleegzam, Backbone, Marionette, $, _) {

    var collection;

    var totalPages;
    var totalPagesInView = 10;
    var currentPage = 1;
    var currentSet = 0;

    var $selector;
    var $pagination = $('<ul class="pagination"></ul>');
    var $prevPageButton = $('<li class="disabled prevOne"><a>&lsaquo;</a></li>');
    var $prevPagesButton = $('<li class="disabled prevTen"><a>&laquo;</a></li>');
    var $nextPageButton = $('<li class="disabled nextOne"><a>&rsaquo;</a></li>');
    var $nextPagesButton = $('<li class="disabled nextTen"><a>&raquo;</a></li>');

    Utils.Paginator = {
        init: function (items, selector) {
            $pagination.empty();
            collection = items;
            $selector = selector;
            totalPages = collection.state.totalPages;
        },

        show: function (collection, selector) {
            this.init(collection, selector);

            if (totalPages == 1) {
                $pagination.hide();
            }

            if (totalPages > 1) {
                this.insertNavigation();
                this.insertPages();
                this.goToPage(null, currentPage);
            }

            $selector.append($pagination);
            this.selectCurrentPage();
        },

        goToPage: function (button, pageNumber) {
            if (pageNumber == undefined) {
                pageNumber = $(button).html();
            }

            collection.getPage(parseInt(pageNumber));
            currentPage = parseInt(pageNumber);
            this.selectCurrentPage();
            this.setIndexes();
        },

        nextPage: function () {
            if (!$nextPageButton.hasClass('disabled')) {
                if (currentPage % totalPagesInView == 0) {
                    currentSet += totalPagesInView;
                    currentPage++;
                    collection.getNextPage();
                    this.insertPages();
                    this.selectCurrentPage();
                    this.setIndexes();
                }
                else {
                    currentPage++;
                    collection.getPage(currentPage);
                    this.selectCurrentPage();
                    this.setIndexes();
                }
            }
        },

        nextPages: function() {
            if (!$nextPagesButton.hasClass('disabled')) {
                if ((currentPage + totalPagesInView) > totalPages) {
                    currentPage = totalPages;
                }
                else {
                    currentPage += totalPagesInView;
                }

                currentSet += totalPagesInView;
                collection.getPage(currentPage);
                this.insertPages();
                this.selectCurrentPage();
                this.setIndexes();
            }
        },

        previousPage: function () {
            if (!$prevPageButton.hasClass('disabled')) {
                if (currentPage > 1) {
                    if (currentSet > 0 && (currentPage % totalPagesInView) == 1) {
                        currentPage--;
                        currentSet -= totalPagesInView;
                        this.insertPages();
                        this.selectCurrentPage();
                        this.setIndexes();
                    }
                    else {
                        collection.getPreviousPage();
                        currentPage--;
                        this.selectCurrentPage();
                        this.setIndexes();
                    }
                }
            }
        },

        previousPages: function() {
            if (!$prevPagesButton.hasClass('disabled')) {
                if (currentSet > 0) {
                    currentPage -= totalPagesInView;
                    currentSet -= totalPagesInView;
                    this.insertPages();
                    this.setIndexes();
                }
                else {
                    currentPage = 1;
                }

                collection.get(currentPage);
                this.selectCurrentPage();
                this.setIndexes();
            }
        },

        insertNavigation: function () {
            $pagination.append($prevPageButton);
            $pagination.append($nextPageButton);

            if (totalPages > totalPagesInView) {
                $prevPageButton.before($prevPagesButton);
                $nextPageButton.after($nextPagesButton);
            }
        },

        insertPages: function () {
            $('li.page').each(function() {
                $(this).remove();
            });

            if ((currentSet + totalPagesInView) > totalPages) {
                numberOfPages = totalPages - currentSet;
            }
            else {
                numberOfPages = totalPagesInView;
            }

            for (var i = 1; i <= numberOfPages; i++) {
                pageNumber = currentSet + i;
                $page = $('<li class="page"><a>' + pageNumber + '</a></li>');
                $nextPageButton.before($page);
            }
        },

        selectCurrentPage: function () {
            $('.paginator li').each(function () {
                if ($(this).children('a').text() != currentPage) {
                    $(this).removeClass('active');
                }
                else {
                    $(this).addClass('active');
                }
            });

            if (currentPage == totalPages) {
                $nextPageButton.addClass('disabled');
                $prevPageButton.removeClass('disabled');
            }
            else if (currentPage == 1) {
                $prevPageButton.addClass('disabled');
                $nextPageButton.removeClass('disabled');
            }
            else {
                $nextPageButton.removeClass('disabled');
                $prevPageButton.removeClass('disabled');
            }

            if (currentSet == 0) {
                $prevPagesButton.addClass('disabled');
            }
            else {
                $prevPagesButton.removeClass('disabled');
            }

            if ((currentSet + totalPagesInView) > totalPages) {
                $nextPagesButton.addClass('disabled');
            }
            else {
                $nextPagesButton.removeClass('disabled');
            }
        },

        sort: function (sortKey) {
            if (sortKey == collection.state.sortKey) {
                collection.state.order = (collection.state.order == 1) ? -1 : 1;
            }

            collection.setSorting(sortKey);
            collection.fullCollection.sort();
        },

        setIndexes: function() {
            index = (currentPage - 1) * collection.state.pageSize;

            $('tbody tr').each(function(idx){
                $(this).children().first().html(idx + index + 1);
            });
        }
    }
});