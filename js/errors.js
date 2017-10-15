const HttpErrorDecorator = ($delegate, $translate, notification) => {
    return $delegate;
}

HttpErrorDecorator.$inject = ['$delegate', '$translate', 'notification'];

export default HttpErrorDecorator;