# Goals trackong table
Simple table to keep track of your training shedule feelings and goas.

[home page](http://127.0.0.1:8888)
![home.png](/screenshots/home.png)

[edit goas and other settings](http://127.0.0.1:8888/edittable)
![config.png](/screenshots/config.png)

In config you can set text decoration by rigth click:
![text_decoration.png](/screenshots/text_decoration.png)

You can test the demo data base by renaming ``db_file_demo.db`` to ``db_file.db``


How to install:
 ``pip install --requirement  requirements.txt``.
 
 To install as service check the folder _instalAsService.
 
How to configure in config.json
- dateFormat - can be set to any format using this link as refrence [refrence](https://www.w3schools.com/python/python_datetime.asp#:~:text=A%20reference%20of%20all%20the%20legal%20format%20codes%3A)
- weekdayes - Translation to nay language you like
- translation_gui - Translation to the rest of the GUI
- translation_edit - Translation to the rest of the GUI
- MAX_DAYS - how many days to show before today in the page
- MAX_CATEGORIES - how many categories you can have.
- MAX_CAT_ROWS - how many rows each category should have.
- FILL_IN_THE_PAST - Allow to fill mouths/days earlier than the first start

This is optional and can be left with the defailt settings!

How to configure in config.ini  
- ***In DEFAULT section:***
- port - Port where the webserver will listen
- ip - Address where ther server will listen. 0.0.0.0 will listen on any v4 IP.
- dbpath - file of the database file (sqlite)

- ***In section APPLOGER:***
- log2File -  Posible values true, false
- access_log - file for the access logs
- app_log - file with other application logs, if there is any

