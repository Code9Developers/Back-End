/**
 * Created by Admin on 22-09-2017.
 */

var method = Particle.prototype;

function Particle(start_date, positions, positions_count)
{
    this.start_date = start_date;
    this.positions = positions;
    this.positions_count = positions_count;
    this.employee_list = [];
    this.pBest = [];
}

method.updateEmployees = function(employees)
{
    this.employee_list = employees;
};

method.addEmployee = function(employee)
{
    this.employee_list.push(employee);
};

method.getEmployees = function()
{
    return this.employee_list;
};

method.clearEmployees = function()
{
    this.employee_list = [];
};

method.getValue = function()
{
    var value = 0;
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        //Add points to how long the employee has been at the company for
        value += parseInt(this.employee_list[loop].employment_length);
        //Deduct points to the employee's position in the company, based off of there cost to company
        value -= parseInt(this.employee_list[loop].rate)/100;
        //Add points to how many skills the employee has
        value += parseInt(this.employee_list[loop].skill.length);
    }
    value += this.positions_evaluation();
    value += this.repeats_evaluation();
    value += this.experience_deviation();
    value += this.duration_evaluation();
    value += this.projects_evaluation();
    return value;
};

method.setPbest = function(employee_list) {
    this.pBest = employee_list;
};

method.getPbestList = function() {
    return (this.pBest);
};

method.getPbestValue = function() {
    let temp_employees = this.employee_list;
    this.employee_list = this.pBest;
    return_value = this.getValue();
    this.employee_list = temp_employees;
    return return_value;
};

method.updateParticlePosition = function(employees_lists, gbest_list) {
    var new_position = [];
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        mean = (this.pBest[loop].pos+gbest_list[loop].pos)/2;
        std_dev = (Math.abs(this.pBest[loop].pos-gbest_list[loop].pos));
        if(std_dev !=0)
            new_position.push(this.getGaussianRandom(mean, std_dev));
        else
            new_position.push(this.pBest[loop].pos);
        if(new_position[loop] >= employees_lists[loop].length)
            new_position[loop] = (employees_lists[loop].length-1);
    }
    new_employees = [new_position.length];
    for(var loop = 0; loop < new_position.length; loop++)
    {
        new_employees[loop] = employees_lists[loop][new_position[loop]];
    }
    this.updateEmployees(new_employees);
};

/*Helper functions*/
method.getGaussianRandom = function (mean, standardDeviation) {
    let q, u, v, p;
    var temp = undefined;
    mean = mean || 0.5;
    standardDeviation = standardDeviation || 0.125;

    if (typeof temp !== 'undefined') {
        v = mean + standardDeviation * temp;
        temp = undefined;

        return v;
    }

    do  {
        u = 2.0 * Math.random() - 1.0;
        v = 2.0 * Math.random() - 1.0;

        q = u * u + v * v;
    } while (q >= 1.0 || q === 0);

    p = Math.sqrt(-2.0 * Math.log(q) / q);

    temp = v * p;
    return Math.floor(Math.abs(mean + standardDeviation * u * p));
};

/*Evaluation functions*/
method.positions_evaluation = function() {
    var check = true;
    for(var loop = 0; loop < this.positions.length; loop++)
    {
        var count = 0;
        //run through the employee list and get a count of how many per each position
        for(var loop2 = 0; loop2 < this.employee_list.length; loop2++)
        {
            if(this.employee_list[loop2].position == this.positions[loop])
            {
                count++;
            }
        }
        if(count != this.positions_count[loop])
            check = false;
    }
    var return_value = 0;
    if(check)
        return_value = this.employee_list.length*30;
    return return_value;
};

method.repeats_evaluation = function() {
    var check = true;
    var return_value = 0;

    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        var count = 0;
        for(var loop2 = 0; loop2 < this.employee_list.length; loop2++)
        {
            if(this.employee_list[loop] == this.employee_list[loop2])
                count +=1;
        }
        if(count>1)
            check = false
    }
    if(!check) {
        return_value -= this.employee_list.length*100;
    }
    return return_value;
};

method.experience_deviation = function() {
    var sum = 0;
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        sum += this.employee_list[loop].employment_length;
    }
    mean = sum/this.employee_list.length;
    var variance = 0;
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        var temp = (this.employee_list[loop].employment_length)-mean;
        variance += Math.pow(temp, 2);
    }
    stand_dev = Math.floor(Math.sqrt(variance/this.employee_list.length));
    return stand_dev*20;
};

method.duration_evaluation = function() {
    let return_value = 0;
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        timeDiff = Math.abs(this.start_date.getTime() - this.employee_list[loop].last_project_date.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return_value+=diffDays;
    }
    return return_value;
};

method.projects_evaluation = function() {
    let return_value = 0;
    for(var loop = 0; loop < this.employee_list.length; loop++)
    {
        return_value += this.employee_list[loop].past_projects.length;
    }
    return return_value/2;
};

module.exports = Particle;

