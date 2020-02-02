from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

options = Options()

options.add_argument("headless")

url = "https://twitter.com/search?q=irvine&src=typed_query"

driver = webdriver.Chrome(options=options)
driver.implicitly_wait(5)
driver.get(url)
tweets = driver.find_elements_by_xpath('''//div[@class='css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0']''')
for tweet in tweets:
    print(tweet.text)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.6);")   
time.sleep(1)
tweets = driver.find_elements_by_xpath('''//div[@class='css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0']''')
for tweet in tweets:
    print(tweet.text) 
