import scrapy
import csv
import string

class jobTitleSpider(scrapy.Spider):
    name = "jobTitleSpider"
    
    def start_requests(self):
        self.base_url = "https://www.indeed.com/find-jobs.jsp?title={}"
        
        for letter in string.ascii_uppercase:
            url = self.base_url.format(letter)
            yield scrapy.Request(url=url, callback=self.parse)    
        #yield scrapy.Request(url='https://www.indeed.com/jobs?q=Software+Engineer&l=Irvine,+ca&radius=0', callback=self.parse)  
    
    def parse(self, response):
        #parse
        jobs = response.xpath('''//a[@class='jobTitle']/text()''').getall()
        yield {'jobs': jobs}
        
       
            