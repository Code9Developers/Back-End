/**
 * Created by Seonin David on 2017/08/18.
 */
$(document).ready(function() {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.get("data_project_edit", {id: $.urlParam('id')},
        function (data, status) {

            $("#budget").append(data.project_budget);
            $("#project_name").append(data.name);
            $("#start_date").append(data.project_start_date.substr(0,10));
            $("#end_date").append(data.project_end_date.substr(0,10));
            $("#owner_contact").append(data.owner_contact);
            $("#owner_email").append(data.owner_email);
            $("#project_owner").append(data.owner_name);
            $("#description").append(data.description);
        });
});
