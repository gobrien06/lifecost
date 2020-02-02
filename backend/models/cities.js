var knex = require('../database/database');

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


function Quartile(data, q) {
  data=Array_Sort_Numbers(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if( (data[base+1]!==undefined) ) {
    return data[base] + rest * (data[base+1] - data[base]);
  } else {
    return data[base];
  }
}

function Array_Sort_Numbers(inputarray){
  return inputarray.sort(function(a, b) {
    return a - b;
  });
}

function Array_Sum(t){
   return t.reduce(function(a, b) { return a + b; }, 0);
}

function Array_Average(data) {
  return Array_Sum(data) / data.length;
}

function Array_Stdev(tab){
   var i,j,total = 0, mean = 0, diffSqredArr = [];
   for(i=0;i<tab.length;i+=1){
       total+=tab[i];
   }
   mean = total/tab.length;
   for(j=0;j<tab.length;j+=1){
       diffSqredArr.push(Math.pow((tab[j]-mean),2));
   }
   return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
            return firstEl + nextEl;
          })/tab.length));
}

function loadFromJSON() {


    /*
   city = 'los angeles';
   job = 'software';
    knex.raw("SELECT * FROM city_data ORDER BY SIMILARITY(METAPHONE(city,10), METAPHONE('" + city + "',10)) DESC LIMIT 1;").then(city_result => {
        console.log(city_result);
        let city_name = city_result['rows'][0]['city'];
        knex.raw("SELECT * FROM job_data ORDER BY SIMILARITY(METAPHONE(job,10), METAPHONE('" + job + "',10)) DESC LIMIT 1;").then(result => {
            console.log(result);
            job_result = result['rows'][0]['cities'][city_name];
            console.log(job_result);
            result = {
                city: city_name,
                sales_tax: city_result['rows'][0]['sales_tax'],
                cost: city_result['rows'][0]['cost'],
                sentiment: city_result['rows'][0]['sentiment'],
                entry_salary: job_result[0],
                mid_salary: job_result[1],
                senior_salary: job_result[2],
                entry_quant: job_result[3],
                mid_quant: job_result[4],
                senior_quant: job_result[5]
            };
            console.log(result);
        }, result => {
            console.log(result);
        });
    }, result => {
        console.log(city_result);
    });
    */

    var career = require('./salary4.json');
    /*

    var tax = require('./tax.json');

    tax = tax[0]['tax'];


    for (let i = 0; i < tax.length; i++) {

        city = tax[i]['city'];
        sales_tax = tax[i]['rate'];

        knex('city_data').insert({
            city: city,
            sales_tax: sales_tax
        }).then(result => {console.log('success')}, result => {console.log(result)});
    }


    var apartment = require('./apartment.json');
    for (let i = 0; i < apartment.length; i++) {
        city = apartment[i]['city'][0].replace('-', ' ').toTitleCase();
        costs = apartment[i]['cost'];
        if (costs.length != 0) {
            total = 0
            for (let k = 0; k < costs.length; k++) {
                total += costs[k];
            }
            cost = total / costs.length;
            cost = Math.round(cost);
            knex('city_data').where({city: city}).update({
                cost: cost
            }).then(result => {console.log('success')}, result => {console.log(result)});
        }
    }

    */
    for (let i = 0; i < career.length; i++) {

        let job = career[i]['job'].replace('+', ' ').toTitleCase();


        let cities = {};
        while (i + 1 < career.length && job == career[i+1]['job'].replace('+', ' ').toTitleCase()){
            let list = []
            let salaries = career[i]['salary'];
            for (let j = 0; j < salaries.length; j++) {
                for(let k = 0; k < salaries[j]['quantity']; k++){
                    list.push(salaries[j]['salary']);
                }
            }
            let entry_quant = ('entry' in career[i]['exp']) ? career[i]['exp']['entry'] : 0;
            let mid_quant = ('mid' in career[i]['exp']) ? career[i]['exp']['mid'] : 0;
            let senior_quant = ('senior' in career[i]['exp']) ? career[i]['exp']['senior'] : 0;
            let entry_salary = Quartile(list, 0.25);
            let mid_salary = Quartile(list, 0.5);
            let senior_salary = Quartile(list, 0.9);
            cities[career[i]['city'][0].replace('+', ' ').toTitleCase()] = [entry_salary, mid_salary, senior_salary, entry_quant, mid_quant, senior_quant];
            i++;
        }
        let list = []
        let salaries = career[i]['salary'];
        for (let j = 0; j < salaries.length; j++) {
            for(let k = 0; k < salaries[j]['quantity']; k++){
                list.push(salaries[j]['salary']);
            }
        }
        let entry_quant = ('entry' in career[i]['exp']) ? career[i]['exp']['entry'] : 0;
        let mid_quant = ('mid' in career[i]['exp']) ? career[i]['exp']['mid'] : 0;
        let senior_quant = ('senior' in career[i]['exp']) ? career[i]['exp']['senior'] : 0;
        let entry_salary = Quartile(list, 0.25);
        let mid_salary = Quartile(list, 0.5);
        let senior_salary = Quartile(list, 0.9);
        cities[career[i]['city'][0].replace('+', ' ').toTitleCase()] = [entry_salary, mid_salary, senior_salary, entry_quant, mid_quant, senior_quant];

        knex('job_data').insert({
            job: job,
            cities: cities
        }).then(result => {console.log(job + ' success')}, result => {
            knex('job_data').where({job: job}).then(result => {
                json = {...result[0]['cities'], ...cities};
                knex('job_data').where({job: job}).update({cities: json}).then(result => {console.log('success')}, result => {console.log(result)});
            }, result => {console.log(result)});

        });
    }

}

function getAll(res, city, job) {

    console.log('replied');
    knex.raw("SELECT * FROM city_data ORDER BY SIMILARITY(METAPHONE(city,10), METAPHONE('" + city + "',10)) DESC LIMIT 1;").then(city_result => {
        let city_name = city_result['rows'][0]['city'];
        knex.raw("SELECT * FROM job_data ORDER BY SIMILARITY(METAPHONE(job,10), METAPHONE('" + job + "',10)) DESC LIMIT 1;").then(result => {
            console.log(result);
            job_result = result['rows'][0]['cities'][city_name];
            result = {
                city: city_name,
                sales_tax: city_result['rows'][0]['sales_tax'],
                cost: city_result['rows'][0]['cost'],
                sentiment: city_result['rows'][0]['sentiment'],
                entry_salary: job_result[0],
                mid_salary: job_result[1],
                senior_salary: job_result[2],
                entry_quant: job_result[3],
                mid_quant: job_result[4],
                senior_quant: job_result[5]
            }
            res.json(result);
        }, result => {
            console.log(result);
        });
    }, result => {
        console.log(city_result);
    });
}


function getCity(res, city) {

    console.log('replied');
    knex.raw("SELECT * FROM city_data ORDER BY SIMILARITY(METAPHONE(city,10), METAPHONE('" + city + "',10)) DESC LIMIT 1;").then(city_result => {
        let city_name = city_result['rows'][0]['city'];
        result = {
            city: city_name,
            sales_tax: city_result['rows'][0]['sales_tax'],
            cost: city_result['rows'][0]['cost']
        }
        console.log('replied');
        res.json(result);
    }, result => {
        res.json({success: false});
        console.log(city_result);
    });
}
/*

CITY SALES_TAX, COST, SENTIMENT
*/

module.exports = {getCity, getAll, loadFromJSON};
