function requestInterceptor(RestangularProvider) {

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {

        if (operation == "getList") {

            // custom pagination params

            if (params._page) {

                params.page = params._page;
                params.per_page = params._perPage;

                delete params._perPage;
                delete params._page;

            }

            // custom sort params

            if (params._sortField) {

                params.sort_field = params._sortField;
                params.sort_dir = params._sortDir;

                delete params._sortField;
                delete params._sortDir;
            }

            // custom filters

            if (params._filters) {

                params.filter = params._filters;
                delete params._filters;
            }

        }

        return { params: params, headers: headers };
    });
}

function responseInterceptor(RestangularProvider) {

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {

        if (operation == "getList") {

            response.totalCount = data.total;
            data = data.data;

        }

        return data;
    });
}

export default { requestInterceptor, responseInterceptor }
