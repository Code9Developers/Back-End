/**
 * Created by Jordan on 22-09-2017.
 */
var Particle = require('.././database/Particle.js');
var fs = require('fs');
var method = Algorithm.prototype;

/*Store all lists of employees*/
function Algorithm(start_date, employee_lists, positions, position_counts, swarm_size)
{
    this.start_date = start_date;
    this.positions = positions;
    this.position_counts = position_counts;
    this.swarm_size = swarm_size;
    this.employee_lists = employee_lists;
    this.particles = [swarm_size];
    this.gbest_list = [];
    this.gbest_value = -1;
    this.particle_gbest_list = [];
    this.particle_average_list = [];
    this.list_counter = 0;
    this.max_iterations = 25;
}

/*Create and initialize all particles*/
method.initSwarm = function()
{
    console.log("swarm size : "+this.swarm_size);
    for(var loop = 0; loop < this.swarm_size; loop++)
    {
        var particle = new Particle(this.start_date, this.positions, this.position_counts);
        var temp_emps = [Object.keys(this.employee_lists).length];
        for(var loop2 = 0; loop2 < Object.keys(this.employee_lists).length; loop2++)
        {
            var rand_pos = Math.floor(Math.random()*((Object.keys(this.employee_lists[loop2]).length-1) - 0 + 1) + 0);
            while(this.sameID(temp_emps, this.employee_lists[loop2][rand_pos].id))
                rand_pos = Math.floor(Math.random()*((Object.keys(this.employee_lists[loop2]).length-1) - 0 + 1) + 0);
            emp = this.employee_lists[loop2][rand_pos];
            temp_emps[loop2] = emp;
            particle.addEmployee(emp);
        }
        particle.setPbest(particle.getEmployees());
        this.particles[loop] = particle;
    }
};

method.displayParticles = function()
{
    for(var loop = 0; loop < this.particles.length; loop++)
    {
        console.log("Displaying particle : "+(loop+1)+"'s employees");
        console.log(this.particles[loop].getEmployees());
    }
};

method.runAlgorithm = function()
{
    this.initSwarm();
    this.calcGbest();
    this.displayGbest();

    for(var loop = 0; loop < this.max_iterations; loop++)
    {
        for(var loop2 = 0; loop2 < this.particles.length; loop2++)
        {
            this.particles[loop2].updateParticlePosition(this.employee_lists, this.gbest_list, this.max_iterations, loop);
            if (this.particles[loop2].getValue() > this.particles[loop2].getPbestValue())
                this.particles[loop2].setPbest(this.particles[loop2].getEmployees());
            if (this.particles[loop2].getValue() > this.gbest_value)
            {
                this.gbest_list = this.particles[loop2].getPbestList();
                this.gbest_value = this.particles[loop2].getValue();
                console.log("New global best particle found");
                this.displayGbest();
            }
            this.calculateInformation();
        }
    }
    this.displayGbest();
    this.storeInformation();
    return(this.gbest_list);
};

method.calcGbest = function()
{
    for(var loop = 0; loop < this.swarm_size; loop++)
    {
        if(this.particles[loop].getPbestValue() > this.gbest_value) {
            this.gbest_value = this.particles[loop].getPbestValue();
            this.gbest_list = this.particles[loop].getPbestList();
        }
    }
};

method.displayGbest = function()
{
    console.log("gBest value : "+this.gbest_value);
    //console.log("gbest employees");
    //console.log(this.gbest_list);
    console.log();
};

/*TODO check if this function is getting used correctly*/
method.sameID = function(id_list, new_id)
{
    var return_value = false;
    for(var loop = 0; loop < id_list.length; loop++)
    {
        if(id_list[loop] == new_id)
            return_value = true;
    }
    return return_value;
};

method.calculateInformation = function()
{
    //get a list of the gbest value and the particle's average values
    this.particle_gbest_list.push(this.gbest_value);
    var particle_average = 0;
    for(var loop = 0; loop < this.swarm_size; loop++)
    {
        particle_average+= this.particles[loop].getValue();
    }
    this.particle_average_list.push(particle_average/this.swarm_size);
    this.list_counter += 1;
};

method.storeInformation = function()
{
    //console.log(this.particle_average_list);
    //console.log(this.particle_gbest_list);
    //var file = fs.createWriteStream('convergenceGraphGbest.txt');
    console.log(this.particle_gbest_list);
    fs.writeFile("convergenceGraphGbest.txt",'');

    //var file = fs.createWriteStream("convergenceGraphGbest.txt");
    for(var loop = 0; loop < this.list_counter; loop++)
    {
        fs.appendFile("convergenceGraphGbest.txt", this.particle_gbest_list[loop]+"\n");
    }
    fs.writeFile("convergenceGraphAverage.txt",'');
    for(var loop = 0; loop < this.list_counter; loop++)
    {
        fs.appendFile("convergenceGraphAverage.txt", this.particle_average_list[loop]+"\n");
    }
    console.log("information stored");
};

//we need another function to get all the std_dev and mean value (averages)

module.exports = Algorithm;

