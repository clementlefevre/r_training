# Your first notebook 


## Create a new Notebook {-}
with your **RStudio** project open :

`File` -> `New` -> `R Notebook` 
(always click OK if you are suggested to install any additional packages)

### Install the required libraries  {-}
R runs with a set of basics functionalities, and for specific needs, let's say if you want to read an Excel file, we need to install additional librairies (e.g. packages).
With RStudio this is quite straightforward : just go to 

`Tools` -> `Install Packages` 

type **`openxlsx`** in the search bar and click `install`

RStudio will then automatically install the package.

## Load your first Excel file  {-}

in the code chunk below, replace the following content :

````

```r
plot(cars)
```
````
with :

````

```r
library(openxlsx)
```
````

Then click on the <span style="color:green;font-size: 24px">**►**</span> button above the code chunk.
RStudio will load the package, and we are now good to read our first Excel file !


In the Code chunk, add the following line :

`DT <- read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/power_plants.xlsx")`


Your code chunk should look like this :


````

```r
library(openxlsx)
DT <- read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/power_plants.xlsx")
```
````

Click again on the <span style="color:green;font-size: 24px">**►**</span> button

You should then see in the top right area of your notebook, in the `Environment` tab a new variable `DT`. Click on it, a new View Tab should pop up with the content of your first Dataframe. 
You can't believe it ? Neither i do. OK, open your favorite internet browser and open the following link : https://r-training-bookdown.s3.amazonaws.com/data/power_plants.xlsx

This should download the very same Excel file. Open it with Excel. What do you see ? the same table as in the `DT` tab.

You are now officially a Data Scientist.


### Monkey See, Monkey Do. {-}
Now, go to 

`Tools` -> `Install Packages` 

type **`leaflet`** in the search bar and click `install`

Then just copy and past the following code in your chunk.

For the moment, you do need to understand what we are doing, it is just about having a feeling how efficient working with R can be.



```r
library(openxlsx)
library(leaflet)
DT <- read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/power_plants.xlsx")
pal <- colorFactor(c("navy", "red"), domain = c("active", "phased out"))

leaflet(DT) %>% addTiles() %>%
  addCircleMarkers(
    radius = ~ifelse(status == "active", 6, 10),
    color = ~pal(status),
    stroke = FALSE, fillOpacity = 0.5,label = ~Power.station
  ) %>% addLegend(pal = pal, values = ~status, opacity = .8)
#> Assuming "lon" and "lat" are longitude and latitude, respectively
```

```{=html}
<div id="htmlwidget-edce4c97223243f145ef" style="width:672px;height:480px;" class="leaflet html-widget"></div>
<script type="application/json" data-for="htmlwidget-edce4c97223243f145ef">{"x":{"options":{"crs":{"crsClass":"L.CRS.EPSG3857","code":null,"proj4def":null,"projectedBounds":null,"options":{}}},"calls":[{"method":"addTiles","args":["//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",null,null,{"minZoom":0,"maxZoom":18,"tileSize":256,"subdomains":"abc","errorTileUrl":"","tms":false,"noWrap":false,"zoomOffset":0,"zoomReverse":false,"opacity":1,"zIndex":1,"detectRetina":false,"attribution":"&copy; <a href=\"http://openstreetmap.org\">OpenStreetMap<\/a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA<\/a>"}]},{"method":"addCircleMarkers","args":[[39.80806,-23.00833,35.31028,41.2,-33.9675,52.09111,23.985,40.62333,54.76194,47.50972,56.84167,68.05028,45.25583,48.49444,51.43083,41.24361,34.70389,44.32528,33.95833,45.8,28.82972,42.07417,38.76167,38.43194,35.05167,49.41583,44.32222,19.42306,32.39028,47.23056,50.09,46.45667,40.17222,39.21667,46.47111,32.29833,40.36194,44.63306,47.73306,43.87278,41.59667,22.59778,35.21083,51.32472,41.97528,41.38972,49.085,31.93417,-32.232,41.96278,52.47417,21.66667,30.44139,49.53639,60.40333,25.44417,33.51556,43.27778,47.36583,44.10667,32.00667,51.01528,36.70917,34.62361,35.415,37.09278,54.635,34.40278,54.02889,41.18806,51.209,39.79778,39.46778,33.49083,48.60556,43.5233,31.22306,57.90556,14.86528,21.23861,24.847167,37.42917,50.30139,-33.67639,67.46667,35.31694,43.74611,45.93833,25.20306,8.16833,51.675,19.72083,41.24556,47.60306,59.84722,59.83056,40.22667,22.60472,60.37222,35.4325,21.95806,12.5575,40.18083,35.70333,41.31194,48.26389,28.15806,49.04167,43.52083,27.04611,48.51528,38.06056,51.275,59.83056,34.79389,35.54056,61.23694,38.40111,57.41556,54.76111,46.5725,42.32278,33.38917,49.85806,49.97667,39.75833,41.80083,43.81167,44.28111,45.06889,44.62167,30.43556,41.72639,24.87222,57.25972,30.7567,51.32778,47.59944,45.40444,47.72,27.34861,39.46278,29.10111,42.89889,31.83361,35.22639,35.6333,36.97222,37.06111,35.53833,52.21333,54.16917,28.79556,47.81667,37.16556,41.08889,21.90944,35.52222,19.82778,49.18,34.68694,50.53472,36.46639,43.03611,55.96806,44.32972,40.70111,35.67278,25.43417,40.95139,34.29861,33.14306,29.99528,35.60278,38.23889,35.71111,21.70972,47.51222,36.14444,51.20611,41.50972,24.06667,null,40.35139,23.82917,55.74444,49.71,53.85083,null,25.28611,51.38944,50.91389,null,47.90306,41.52028,37.42139,37.31944,null,49.98389,54.14056,52.03528,48.51472,55.722,55.60444,41.26972,53.41,null,50.40806,49.2525,40.15389,33.36889,45.75833,46.03833,53.42778,42.44639],[-5.69694,-44.47389,-93.23139,0.56944,-59.205,47.95528,52.28361,-80.43056,26.12,2.875,61.3225,166.53861,-0.69306,17.68194,3.71833,-88.22917,-87.11861,-81.59944,-78.01028,5.27083,50.88611,-89.28194,-91.78,-76.44222,-81.07,6.21806,28.05722,108.8125,71.4625,0.17056,4.78944,0.65278,-88.835,-1.05,-119.33389,-97.785,-95.64139,4.75667,2.51667,-78.71972,-83.08639,114.54361,-120.85611,4.25861,-86.56583,-88.26806,16.14889,-82.34389,-64.443,-83.2575,7.31778,108.56306,120.94167,-1.88167,18.16667,119.44611,129.83722,-77.31,7.96667,0.84528,-91.04833,2.13611,121.38167,138.1425,126.42389,129.38361,-1.18083,-80.15833,-2.91611,141.39028,-3.128,121.47194,-75.53806,132.31139,12.29306,-76.3983,-85.11167,35.06028,74.43944,73.35,66.78825,138.59528,26.64972,18.43194,32.46667,129.3,23.77056,15.51556,121.66278,77.7125,35.60556,-96.40639,-88.66917,8.18472,29.04361,29.05722,-75.58722,114.55139,26.34722,-80.94833,120.75167,80.175,44.14889,135.96333,-72.16861,18.45694,78.40944,9.175,-76.40694,120.28833,3.51778,-77.78944,39.2,29.05722,-82.89806,135.65194,21.44083,141.49972,16.67111,26.08917,18.85417,-86.31444,-112.865,0.63556,1.21194,-76.26806,-81.14333,-79.06583,-87.53667,-66.45472,-92.63306,120.95639,-90.31,75.61389,12.11083,-91.333,25.89167,42.37194,4.75444,1.5775,-80.24639,-75.53556,121.63972,-70.85083,130.18972,-85.09167,-78.955,122.52889,136.72639,132.99917,1.61861,33.24667,-96.04889,31.21667,-76.69778,-76.14889,112.97917,135.50472,72.66111,14.37611,119.45972,5.2725,140.60667,140.5125,-2.40917,4.73222,-2.62194,136.07722,-80.33056,0.86667,-81.31472,-81.76583,-90.47111,-84.78944,-95.68889,129.475,112.26056,34.58583,33.54111,-3.14389,140.91028,89.04722,null,120.54639,117.49167,12.92083,8.41528,9.34472,null,121.5875,30.09917,0.96389,null,7.56306,-96.07722,141.0325,141.02111,null,10.18472,13.66444,9.41333,10.40222,-4.89,26.56,-73.95222,10.40889,null,7.49,8.43639,-76.72472,-117.555,5.47222,-122.885,8.48028,-87.80306],[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],null,null,{"interactive":true,"className":"","stroke":false,"color":["#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#808080","#808080","#808080","#808080","#808080","#808080","#808080","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000"],"weight":5,"opacity":0.5,"fill":true,"fillColor":["#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#000080","#808080","#808080","#808080","#808080","#808080","#808080","#808080","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000"],"fillOpacity":0.5},null,null,null,null,["Almaraz","Angra","ANO","Ascó","Atucha","Balakovo","Barakah","Beaver Valley","Belarusian","Belleville","Beloyarsk","Bilibino\n","Blayais","Bohunice\n","Borssele\n","Braidwood","Browns Ferry","Bruce","Brunswick","Bugey","Bushehr","Byron","Callaway","Calvert Cliffs","Catawba","Cattenom","Cernavodă","Changjiang","Chashma","Chinon","Chooz","Civaux","Clinton","Cofrentes","Columbia","Comanche Peak","Cooper\n","Cruas","Dampierre","Darlington","Davis-Besse\n","Daya Bay","Diablo Canyon","Doel","Donald C. Cook","Dresden","Dukovany","Edwin I. Hatch","Embalse\n","Fermi","Emsland","Fangchenggang","Fangjiashan","Flamanville","Forsmark","Fuqing","Genkai","Ginna\n","Gösgen","Golfech","Grand Gulf","Gravelines","Haiyang","Hamaoka","Hanbit","Hanul","Hartlepool","H. B. Robinson\n","Heysham","Higashidōri","Hinkley Point B\n","Hongyanhe","Hope Creek","Ikata\n","Isar","James A. FitzPatrick\n","Joseph M. Farley","Kalinin","Kaiga\n","Kakrapar","Karachi","Kashiwazaki-Kariwa","Khmelnytskyi","Koeberg","Kola","Kori","Kozloduy","Krško\n","Kuosheng","Kudankulam","Kursk","Laguna Verde","LaSalle","Leibstadt","Leningrad","Leningrad II","Limerick","Ling Ao","Loviisa","McGuire","Maanshan","Madras\n","Metsamor\n","Mihama\n","Millstone","Mochovce\n","Narora\n","Neckarwestheim","Nine Mile Point","Ningde","Nogent","North Anna","Novovoronezh I","Novovoronezh II","Oconee","Ōi","Olkiluoto","Onagawa","Oskarshamn","Ostrovets\n","Paks","Palisades\n","Palo Verde","Paluel","Penly","Peach Bottom","Perry","Pickering","Point Beach","Point Lepreau\n","Prairie Island","Qinshan","Quad Cities","Rajasthan","Ringhals","River Bend\n","Rivne","Rostov","Saint-Alban","Saint-Laurent","Saint Lucie","Salem","Sanmen","Seabrook","Sendai","Sequoyah","Shearon Harris\n","Shidao Bay\n","Shika","Shimane","Sizewell-B","Smolensk","South Texas","South Ukraine","Surry","Susquehanna","Taishan","Takahama","Tarapur","Temelin","Tianwan","Tihange","Tokai","Tomari","Torness","Tricastin","Trillo","Tsuruga","Turkey Point","Vandellòs","Virgil C. Summer\n","Vogtle","Waterford","Watts Bar","Wolf Creek","Wolseong","Yangjiang","Zaporizhzhia","Akkuyu","Hinkley Point C\n","Ōma","Rooppur","San’ao","Xudabao\n","Zhangzhou\n","Barsebäck","Biblis","Brokdorf","Caorso","Chin Shan","Chernobyl","Dungeness\n","Enrico Fermi","Fessenheim","Fort Calhoun","Fukushima Daiichi","Fukushima Daini","Garigliano","Grafenrheinfeld","Greifswald","Grohnde","Gundremmingen","Hunterston B\n","Ignalina","Indian Point","Krümmel","Latina","Mülheim-Kärlich","Philippsburg","Three Mile Island","San Onofre","Superphénix","Trojan","Unterweser","Zion"],{"interactive":false,"permanent":false,"direction":"auto","opacity":1,"offset":[0,0],"textsize":"10px","textOnly":false,"className":"","sticky":true},null]},{"method":"addLegend","args":[{"colors":["#000080","#808080","#FF0000"],"labels":["active","in construction","phased out"],"na_color":null,"na_label":"NA","opacity":0.8,"position":"topright","type":"factor","title":"status","extra":null,"layerId":null,"className":"info legend","group":null}]}],"limits":{"lat":[-33.9675,68.05028],"lng":[-122.885,166.53861]}},"evals":[],"jsHooks":[]}</script>
```
**Nuclear Power Plants in the world - source : Wikipedia**



You are now officially a Senior Data Scientist. 

Time to post the map on Instagram with the ***#DIGITALISIERUNG*** hashtag and call it a day.

#### Exercise {-}

Upload an Excel of your own :

##### With RStudio Cloud : {-}

- click on the **`Upload`** button at the bottom right,
- click on `Select File` (`Datei Auswählen`)
- select your file 
- click on `OK`.


##### With RStudio Desktop : {-}

- click on **`More`** button at the bottom right,
- `Show Folder in new Window`. This should open the current folder where your RStudio Project is located.
- Copy your Excel in this folder.

The name of the file should then appear in the file explorer (bottom right of the screen). 

*Note : Make sure this file contains only one sheet, and that the column names are located in the first row. Later on in this course we will show you how to handle other cases.*



Let's assume the file you uploaded is **report_22.xlsx**. To load this file in R,  type in the code chunk :

`DT_2 <- read.xlsx("report_22.xlsx")`

Do not forget to click the  <span style="color:green;font-size: 24px">**►**</span> button above the code chunk to execute the code.

You should then see in the top right area of your notebook, in the `Environment` tab a new variable `DT_2`. Click on it, a new View Tab should pop up with the content of your own Excel sheet.

Are you happy now ?


## Basic operations  in your Notebook {-}

- to create a new chunk (an area where you can write code) : `Code` -> `Insert Chunk` or use the Shortcut `Shift`+`Alt`+`i`
- to execute the whole chunk of code, click the  <span style="color:green;font-size: 24px">**►**</span> button above the code chunk
- to execute a single line of code, position your cursor at end of the line and press `Alt`+`Enter`

## Common pitfalls  {-}
- a R chunk (snippet of code) is defined as such :

````

```r
#YOUR CODE CHUNK HERE
```
````

If you delete one of the ` character (a backtick), RStudio will not recognize it as a chunk.

- Every now and then, reset your environment (`Session` -> `Restart and clear output`)




## Help ! {-}
You are not alone. When facing an error message, or when trying to implement some logic (let's say you want to convert a date into a week number), the one and only way to solve this is to do [**this**](https://letmegooglethat.com/?q=R+extract+week+number+from+Date+stackoverflow).


