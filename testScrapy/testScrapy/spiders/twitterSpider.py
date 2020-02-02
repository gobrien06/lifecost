import scrapy
import urllib
import datetime
import csv 
from scrapy.utils.response import open_in_browser
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time
from textblob import TextBlob
import re
from selenium.webdriver.remote.remote_connection import LOGGER
import logging

class twitterSpider(scrapy.Spider):
    name = "twitterSpider"
    download_delay = 1
 
    def __init__(self):
        options = Options()
        LOGGER.setLevel(logging.WARNING)

        options.add_argument("headless")
        options.add_argument("log-level=1")


        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(3)
        
    def clean_tweet(self, tweet): 
        ''' 
        Utility function to clean tweet text by removing links, special characters 
        using simple regex statements. 
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split()) 
    
    def get_cities(self):
        csv_file = open('cities.csv')
        reader = csv.reader(csv_file, delimiter=',')        
        cities = list()
        last = next(reader)   
        cities.append(last)     
        for row in reader:
            if row == last:
                continue
            cities.append(row)
            last = row
        return cities
        
    def start_requests(self):
        self.base_url = "https://twitter.com/{}"
        '''
        params = {
            'src': 'typed_query',
        }
        '''
        self.base_query = "search?q={}&src=typed_query"
        cities = self.get_cities()
        for city in cities:
            url = self.base_url.format(self.base_query.format(city))
            yield scrapy.Request(url=url, callback=self.parse, meta={'city': city})
            
        #yield scrapy.Request(url=self.base_url.format(self.base_query.format('irvine')), callback=self.parse, meta={'city': 'irvine'})
             
           
    def parse(self, response):
        total_tweets = []
        self.driver.get(response.url)
        for i in range(0, 3):
            time.sleep(1)
            tweets = self.driver.find_elements_by_xpath('''//div[@class='css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0']''')
            for tweet in tweets:
                print(tweet.text)
                total_tweets.append(self.clean_tweet(tweet.text)) 
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.7);")  
        
        if len(total_tweets) > 0:
            polarity = 0
            for tweet in total_tweets:
                blob = TextBlob(tweet)
                polarity += blob.sentiment.polarity
            polarity /= len(total_tweets)
            
            yield {
                'city': response.meta['city'],
                'sentiment': polarity
            }
        
    
        #response = scrapy.selector.Selector(text=driver.page_source.encode('utf-8'))
        #open_in_browser(response)
        
        

