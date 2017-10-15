export default function (nga, admin) {

    return nga.dashboard()
        .template(`<div class="row dashboard-starter"></div><dashboard-summary></dashboard-summary>`);

}
