from flask import Flask,request,jsonify
from flask_cors import CORS

from bs4 import BeautifulSoup as bs
from selenium import webdriver
import pandas as pd


app= Flask(__name__)
CORS(app)

@app.route("/",methods=['POST'])
def index():
    item= request.json.get('searchText')
    return "Backend Running" + item

@app.route("/Amazon_handler",methods=['POST'])
def Amazon_handler():
    
    item_amz=request.json.get('searchText')
    if item_amz is not None:
        filename = item_amz.replace(' ', '_')
        search_query = item_amz.replace(' ', '+')
        print(search_query)
        link_amz = 'https://www.amazon.in/s?k=' + search_query + '&ref=nb_sb_noss'

        browser = webdriver.Chrome()
        browser.get(link_amz)
        soup = bs(browser.page_source, 'html5lib')

        products

        try:
            for n in range(2):
                browser.get(link_amz)
                soup=bs(browser.page_source,'html5lib')

            
                if soup.find('div',class_="sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20") is not None:
                    for S_item_ad in soup.find('span', class_="rush-component s-latency-cf-section").find_all('div',class_="sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 AdHolder sg-col s-widget-spacing-small sg-col-4-of-20"):
                        name= S_item_ad.find('h2').text
                        price= S_item_ad.find('span',class_='a-price-whole').text
                        rating = 'Not Available' if S_item_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-icon-alt") is None else float(S_item_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-icon-alt").text[0:3])
                        total_rating = 'Not Available' if S_item_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else int(S_item_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text").text.replace(',',''))
                        links = 'amazon.in' + S_item_ad.find('a',class_='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal').get('href')

                        
                        product_info = {
                                'Name': name,
                                'Price': price,
                                'Rating': rating,
                                'Total Ratings': total_rating,
                                'Link': links,
                                'Advertisement': 'Yes'
                            }
                        products.append(product_info)
                            
                            
                    for S_item in soup.find('span', class_="rush-component s-latency-cf-section").find_all('div',class_="sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20"):
                        name= S_item.find('h2').text
                        price= "Out of Stock" if S_item.find('span',class_='a-price-whole') is None else S_item.find('span',class_='a-price-whole').text
                        rating = 'Not Available' if S_item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else float(S_item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-icon-alt").text[0:3])
                        total_rating = 'Not Available' if S_item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else int(S_item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text").text.replace(',',''))
                        links = 'amazon.in' + S_item.find('a',class_='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal').get('href')
                        
                        
                        product_info = {
                                'Name': name,
                                'Price': price,
                                'Rating': rating,
                                'Total Ratings': total_rating,
                                'Link': links,
                                'Advertisement': 'No'
                            }
                        products.append(product_info)
                            
                else:
                    for i_ad in soup.find('span',class_="rush-component s-latency-cf-section").find_all('div',class_="sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 AdHolder sg-col s-widget-spacing-small sg-col-12-of-16"):
                        name= i_ad.find('h2').text
                        price= i_ad.find('span',class_='a-price-whole').text
                        rating = 'Not Available' if i_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else float(i_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-icon-alt").text[0:3])
                        total_rating = 'Not Available' if i_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else int(i_ad.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text").text.replace(',',''))
                        links = 'amazon.in' + i_ad.find('a',class_='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal').get('href')

                        
                        product_info = {
                                'Name': name,
                                'Price': price,
                                'Rating': rating,
                                'Total Ratings': total_rating,
                                'Link': links,
                                'Advertisement': 'Yes'
                            }
                        products.append(product_info)
                            
                            
                    for item in soup.find('span', class_="rush-component s-latency-cf-section").find_all('div',class_="sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col s-widget-spacing-small sg-col-12-of-16"):
                        name= item.find('h2').text
                        price= "Out of Stock" if item.find('span',class_='a-price-whole') is None else item.find('span',class_='a-price-whole').text
                        rating = 'Not Available' if item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else float(item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-icon-alt").text[0:3])
                        total_rating = 'Not Available' if item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text") is None else int(item.find('div',class_='a-section a-spacing-none a-spacing-top-micro').find('span',class_="a-size-base s-underline-text").text.replace(',',''))
                        links = 'amazon.in' + item.find('a',class_='a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal').get('href')
                        
                        
                        product_info = {
                                'Name': name,
                                'Price': price,
                                'Rating': rating,
                                'Total Ratings': total_rating,
                                'Link': links,
                                'Advertisement': 'No'
                            }
                        products.append(product_info)
                link_amz='https://www.amazon.in/'+soup.find('span', class_="rush-component s-latency-cf-section").find('span',class_='s-pagination-strip').find('a').get('href')
        except AttributeError : 
            print('Attribute Error| too many requests: Amazon identify bots')
        
        print(products)
        browser.quit()
        product=pd.DataFrame(products)
        product.to_csv('D:/Scrape_test/fkt_' + filename + '.csv',index=False)
        product.to_json('D:/Scrape_test/fkt_' + filename + '.json',orient='index')
        products = product.to_json(orient ='index') 
        return jsonify(products)
    else:
        return jsonify({'error': 'Search text is missing'}), 400
    
    
@app.route("/Flipkart_handler",methods=['POST'])
def Flikart_handler():
    try:
        search=request.json.get('searchText')
        filename = search.replace(' ','_')
        search_query=search.replace(' ','%20')
        browser=webdriver.Chrome()
        products = []
        for n in range(1,3):
            
            flipkart_link='https://www.flipkart.com/search?q='+search_query+'&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=on&page=' + str(n)
            browser.get(flipkart_link)
            soup=bs(browser.page_source,'html5lib')
            
            
            if  soup.find('div',class_='DOjaWF gdgoEp').find('a',class_='CGtC98')==None:
                for item_list in soup.find('div',class_='DOjaWF gdgoEp').find_all('div',class_='cPHDOP col-12-12'):
                    for item_small in item_list.find_all('div',class_='slAVV4'):
                        name         = 'Not Avaialble' if item_small.find('a',class_='wjcEIp')== None else item_small.find('a',class_='wjcEIp').get('title')
                        price        = "Not Available" if item_small.find('div',class_='Nx9bqj') == None else item_small.find('div',class_='Nx9bqj').text
                        rating       = 'Not reviewed' if  item_small.find('div',class_='XQDdHH') == None else item_small.find('div',class_='XQDdHH').text
                        total_rating = 'Null' if  item_small.find('span',class_='Wphh3N') == None else  item_small.find('span',class_='Wphh3N').text[1:-1]
                        links        = "Not Available " if item_small.find('a',class_='wjcEIp')== None else 'https://www.flipkart.com' + item_small.find('a',class_='wjcEIp').get('href')


                        product_info = {
                            'Name': name,
                            'Price': price,
                            'Rating': rating,
                            'Total Ratings': total_rating,
                            'Link': links
                        }
                        products.append(product_info)

            else:
                for item_list in soup.find('div',class_='DOjaWF gdgoEp').find_all('a',class_='CGtC98'):

                    name         = 'Not Avaialble' if item_list.find('div',class_='KzDlHZ')== None else item_list.find('div',class_='KzDlHZ').text
                    price        = "Not Available" if item_list.find('div',class_='Nx9bqj _4b5DiR') == None else item_list.find('div',class_='Nx9bqj _4b5DiR').text
                    rating       = 'Not reviewed' if  item_list.find('div',class_='XQDdHH') == None else item_list.find('div',class_='XQDdHH').text
                    total_rating = 'Null' if  item_list.find('span',class_='Wphh3N') == None else  item_list.find('span',class_='Wphh3N').text[1:-1]
                    links        = 'https://www.flipkart.com' + item_list.get('href')


                    product_info = {
                        'Name': name,
                        'Price': price,
                        'Rating': rating,
                        'Total Ratings': total_rating,
                        'Link': links
                    }
                    products.append(product_info)
        browser.quit()
        
        product=pd.DataFrame(products)
        product.to_csv('D:/Scrape_test/fkt_' + filename + '.csv',index=False)
        product.to_json('D:/Scrape_test/fkt_' + filename + '.json',orient='index')
        products = product.to_json(orient ='index') 
        return jsonify(products)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    #return "backend " + item #{"members": ["Memeber1",'member2','member3',item]}


if __name__ == "__main__":
    app.run(debug=True)