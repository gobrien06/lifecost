import scrapy
from scrapy.utils.response import open_in_browser
import csv
import json

class apartmentSpider(scrapy.Spider):
    name = "apartmentSpider"
    #download_delay = 1
    
    headers = {
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Encoding': 'gzip, deflate, br',
       'Accept-Language': 'en',
       'Host': 'www.apartments.com',
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0'
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
        
    def get_cities_new(self):
        cities = json.load(open('tax.json'))[0]
        cities = [(city['city'].lower().replace(' ', '-'), 'ca') for city in cities['tax']]
        return cities
    
    def start_requests(self):
        self.base_url = "https://www.apartments.com/{}/1-bedrooms/"
        test_term = "point-baker-ca"
        cities = self.get_cities_new()           
        
        for city in cities:
        
            url = self.base_url.format("{}-{}".format(city[0], city[1]))
            
            yield scrapy.Request(url=url, headers=self.headers, callback=self.parse, meta={'city': city})
    
    def parse(self, response):
        
        #Check if no listings
        if response.xpath('''//p[@id='nearby-listings-geo']''').get() or response.xpath('''//article[@id='noPlacards']''').get():
            return
            
        prices = response.xpath('''//span[@class='altRentDisplay']/text()''').getall()
        prices = [price.replace(',', '') for price in prices]

        for i in range(0, len(prices)):
            if '-' in prices[i]:
                prices[i] = prices[i].split('-')
                prices[i] = (int(prices[i][0].strip().replace('$', '')) + int(prices[i][1].strip())) / 2
            elif '$' in prices[i]:
                prices[i] = int(prices[i].replace('$', ''))
            else:
                prices[i] = ''
        prices = [price for price in prices if price != '']       
        

        
        yield {
            'city': response.meta['city'],
            'cost': prices
        }
        
        #open_in_browser(response)
        
        next_page = response.xpath('''//a[@class='next']/@href''').get()
        if next_page is not None:
            yield scrapy.Request(next_page, headers=self.headers, callback=self.parse, meta=response.meta)
                
                