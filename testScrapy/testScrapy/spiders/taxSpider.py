import scrapy
from scrapy.selector import Selector

class taxSpider(scrapy.Spider):
    name = "taxSpider"
    
    def start_requests(self):
        self.base_url = "http://www.sale-tax.com/California_all"
        yield scrapy.Request(url=self.base_url, callback=self.parse)
        
    def parse(self, response):
        cities = response.xpath('''//tr[./td]''').getall()
        out = {'tax': []}
        for city in cities:
            name = Selector(text=city).xpath('''//td[@class='clickable']/a/strong/text()''').get()
            rate = float(Selector(text=city).xpath('''//td[@class='center']/a/text()''').get().replace('%', ''))
            out['tax'].append({'city': name, 'rate': rate})
        yield out
            
        
    