/**
 * Page: N/A
 * Functionality: User Project Details
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 18/08/2017 by Seonin David
 * Date Revised: 25/09/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$(document).ready(function() {

    $.urlParam = function (name) {
        let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };

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
