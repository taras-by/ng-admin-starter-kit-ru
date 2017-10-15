export default function (nga, admin) {

    var entity = nga.entity('user')
        .label('Пользователи');

    entity.listView()
        .fields([
            nga.field('id'),
            nga.field('name').label('Имя'),
            nga.field('email'),
        ])
        .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template(require('../view/search.html'))
        ])
        .listActions(['edit', 'delete'])
        .title('Список пользователей');

    entity.creationView()
        .fields([
            nga.field('name').label('Имя').validation({ required: true })

        ])
        .title('Cоздать нового пользователя');

    entity.editionView()
        .fields(entity.creationView().fields())
        .title('Изменить пользователя № {{ ::entry.identifierValue }}');

    entity.deletionView()
        .title('Удалить пользователя');

    admin.addEntity(entity);

    return entity;
}
