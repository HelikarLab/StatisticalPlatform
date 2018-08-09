You need to download all the dependencies first before following these instructions. You can find step by step installation instructions for Ubuntu 16.04 [here](https://github.com/tejasavkhattar/StatisticalPlatform/wiki/Installation)
* Clone git repository on desktop
```
$ cd Desktop
$ git clone https://github.com/tejasavkhattar/StatisticalPlatform.git
$ cd StatisticalPlatform
$ git checkout develop

```
* Open other Terminal and start R server
```
$ sudo -i R
> library(opencpu)
> ocpu_start_server()
```
* Open other Terminal and start node server
```
$ cd StatisticalPlatform
$ node server
```

* Open other Terminal and start django development server
(Note: Execute these steps only after you have created virtualenv(StatisticalEnv) as per the instructions given [here](https://github.com/tejasavkhattar/StatisticalPlatform/wiki/Installation))
```
$ cd Desktop
$ source StatisticalEnv/bin/activate
$ cd StatisticalPlatform
$ cd StatisticalPlatform
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

* Open google chrome and navigate to 127.0.0.1:8000
