// $.get("find_project_users", {id:$.urlParam('id')},
//     function (data, status) {
//         $("#AllocateTask").empty();
//         $.each(data, function (key, value) {
//             emp_ids[key]=value._id;
//             empr_names[key]=value.name;
//             $("#AllocateTask").append(
//                 "<option value='"+value.name+"'>"+
//                 value.name+
//                 "</option>");
//         });
//         $("#AllocateTask").multiselect('refresh');
//     });

/**
 * Use the above as a guideline to display past projects on this page.
 * Make sure it is like above the only thing you will bw changing is the data sent through
 * Route: get_past_projects
 */

/**
 * Page: N/A
 * Functionality: Admin
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 20/08/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
$(document).ready(function(){

     $.get("get_past_projects", function (data, status) {

        $("#pastprojects").empty();

        $.each(data, function (key, value) {
        $("#pastprojects").append(
            "<option value='"+value._id+"'>"+
                value.name+
            "</option>");
        });

         $('#pastprojects').multiselect({
             includeSelectAllOption: true,
             nonSelectedText: 'Select Past Projects '
         });

        $("#pastprojects").multiselect('refresh');
     });


});
