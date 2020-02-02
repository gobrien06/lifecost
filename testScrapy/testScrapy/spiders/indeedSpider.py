import scrapy
import csv
import json
from scrapy.selector import Selector
import re
from scrapy.utils.response import open_in_browser

class indeedSpider(scrapy.Spider):
    name = "indeedSpider"
    headers = {
       'authority': 'www.indeed.com',
       'scheme': 'https',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Encoding': 'gzip, deflate, br',
       'Accept-Language': 'en-US,en;q=0.9',
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    }
    def get_cities(self):
        csv_file = open('testScrapy/spiders/us_cities_states_counties.csv')
        reader = csv.reader(csv_file, delimiter='|')        
        cities = list()
        last = next(reader)
        
        if 'ca' in last[1].lower():
            cities.append([last[0].lower().replace(' ', '-'), last[1].lower()])
        for row in reader:
            if row[0] == last[0]:
                continue
            if 'ca' in row[1].lower():
                cities.append([row[0].lower().replace(' ', '-'), row[1].lower()])
            last = row
        return cities
    
    def get_jobs(self):
        jobs = json.load(open('jobs.json'))
        jobs = [job['jobs'] for job in jobs]
        jobs = [job for i in jobs for job in i]
        return [job.replace(' ', '+') for job in jobs]
    
    def get_cities_new(self):
        cities = json.load(open('tax.json'))[0]
        cities = [(city['city'].lower().replace(' ', '+'), 'ca') for city in cities['tax']]
        return cities
    
    def start_requests(self):
        self.base_url = "https://www.indeed.com/jobs?q={}&l={},+{}&radius=0"
        cities = self.get_cities_new()
        jobs = self.get_jobs()
        jobs.reverse()
        for job in jobs:
            for city in cities:            
                url = self.base_url.format(job, city[0], city[1])       
                yield scrapy.Request(url=url, callback=self.parse, meta={'city': city, 'job': job})     
        
        #yield scrapy.Request(url='https://www.indeed.com/jobs?q=baker&l=santa+barbara,+ca&radius=0', headers=self.headers, callback=self.parse, meta={'city': city, 'job': job})  
    
    def parse(self, response):
        #parse
        if response.xpath('''//div[@id=original_radius_result]'''):
            return
    
        out = {
            'job': response.meta['job'],
            'city': response.meta['city'],
            'exp': {},
            'salary': list()
        }
        explvls = 0
        salaryies = 0
        if response.xpath('''//div[@id='resumePromo']'''):
            explvls = response.xpath('''//div[@class='JOB_TYPE_rbo']/li/a''').getall()
            salaries = response.xpath('''//div[@class='SALARY_rbo']/li/a''').getall()
        else:                
            explvls = response.xpath('''//ul[@id='filter-experience-level-menu']/li/a''').getall()
            salaries = response.xpath('''//ul[@id='filter-salary-estimate-menu']/li/a''').getall()
            
        for explvl in explvls:
            exp = Selector(text=explvl).xpath('//span/text()').getall()
            num = re.split('[()]', exp[1])[1]
            if 'Entry' in exp[0]:
                out['exp']['entry'] = num
            elif 'Mid' in exp[0]:
                out['exp']['mid'] = num            
            else:
                out['exp']['senior'] = num
        
        for estimate in salaries:
            estimate = Selector(text=estimate).xpath('//span/text()').getall()
            num = re.split('[()]', str(estimate[1]))[1]
            salary = 0
            
            
            if 'hour' in estimate[0]:
                estimate[0] = estimate[0].split('/')[0]
                salary = float(estimate[0].replace('$', '').replace(',', '').replace('+', '')) * 40 * 52
            else:           
                salary = float(estimate[0].replace('$', '').replace(',', '').replace('+', ''))
            out['salary'].append({'salary': salary, 'quantity': num})
        #open_in_browser(response)  
            
            
        yield out
            
        '''
        salaries = response.xpath(//span[@class='salaryText']/text()).getall()
        salaries = [salary.strip() for salary in salaries]       
                  
        for i in range(0, len(salaries)):
            salary = list()
            if 'hour' in salaries[i]:
                salary = [float(k.replace('$', '').replace(',', '')) * 40 * 52 for k in salaries[i].split() if k.startswith('$')]
            else:
                salary = [float(k.replace('$', '').replace(',', '')) for k in salaries[i].split() if k.startswith('$')]
            salaries[i] = salary
                  
        yield {
            'experience': response.meta['exp'],
            'location': response.meta['city'],
            'salaries': salaries
        }
        
        next_page = response.xpath('//a[./span[@class="pn" and ./span[@class="np" and contains(text(), "Next")]]]/@href').get()
        if next_page is not None:        
            next_page = "https://www.indeed.com" + next_page
            #yield scrapy.Request(next_page, callback=self.parse, meta={'city': response.meta['city'], 'exp': response.meta['exp']})
        '''   