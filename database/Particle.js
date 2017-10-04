/**
 * Created by Admin on 22-09-2017.
 */

var method = Particle.prototype;

function Particle()
{
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
            value+= this.employee_list[loop].value;
        }
        return value;
    };

    method.setPbest = function(employee_list)
    {
        this.pBest = employee_list;
    };

    method.getPbestList = function()
    {
        return (this.pBest);
    };

    method.getPbestValue = function()
    {
        var value = 0;
        for(var loop = 0; loop < this.pBest.length; loop++)
        {
            value += this.pBest[loop].value;
        }
        return value;
    };

    /*TODO we need to make sure it does not use the same employee for more than one position in the team
      TODO we also need to make sure it does not then hang in an endless loop if we try make it random another employee.
      TODO how about just giving the team a really bad score if the same member is used twice
     */
    method.updateParticlePosition = function(employees_lists, gbest_list)
    {
        var new_position = [];
        for(var loop = 0; loop < this.employee_list.length; loop++)
        {
            mean = (this.pBest[loop].pos+gbest_list[loop].pos)/2;
            std_dev = Math.abs(this.pBest[loop].pos-gbest_list[loop].pos);
            if(std_dev !=0)
                new_position.push(this.getGaussianRandom(mean, std_dev));
            else
                new_position.push(this.pBest[loop].pos);
            if(new_position[loop] >= employees_lists[loop].length)
                new_position[loop] = (employees_lists[loop].length-1);
        }
        //loop through position array, create an temp employees array and set it as the new employee list
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


module.exports = Particle;

