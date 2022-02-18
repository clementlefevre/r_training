# Your first notebook 


## Create a new Notebook
with your [**Rstudio Cloud**](https://rstudio.cloud) project open :

`File` -> `New` -> `R Notebook` 
(always click OK if you are suggested to install any additional packages)

### Install the required libraries
R runs with a set of basics functionalities, and for specific needs, let's say if you want to read an Excel file, we need to install additional librairies (e.g. packages).
With RStudio this is quite straightforward : just go to 

`RStudio -> Tools -> Install Packages` 

type **`openxlsx`** in the search bar and click `install`

RStudio will then automatically install the package.

## Load your first Excel file

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

Then click on the green **ᐅ** icon above the code chunk.
RStudio will load the package, and we are now good to read our first Excel file !


In the Code chunk, add the following line :

`DT <- read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx")`


Your code chunk should look like this :


````

```r
library(openxlsx)
DT <- read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx")
```
````

Click again on the green **ᐅ** icon

You should then see in the top right area of your notebook, in the `Environment` tab a new variable `DT`. Click on it, a new View Tab should pop up with the content of your first Dataframe. 
You can't believe it ? Neither i do. OK, open your favorite internet browser and open the following link : https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx

This should download the very same Excel file. Open it with Excel. What do you see ? the same table as in the `DT` tab.

You are now officially a Data Scientist.    


### Exercise

Upload an Excel of your own :

- click on the **`Upload`** button at the bottom right,
- click on `Select File` (`Datei Auswählen`)
- select your file 
- click on `OK`.

The name of the file should then appear in the file explorer (bottom right of the screen). 

*Note : Make sure this file contains only one sheet, and that the column names are located in the first row. Later on in this course we will show you how to handle other cases.*



Let's assume the file you uploaded is **report_22.xlsx**. To load this file in R,  type in the code chunk :

`DT_2 <- read.xlsx("report_22.xlsx")`

Do not forget to click the green **ᐅ** icon above the code chunk to execute the code.

You should then see in the top right area of your notebook, in the `Environment` tab a new variable `DT_2`. Click on it, a new View Tab should pop up with the content of your own Excel sheet.

Are you happy now ?


## Common pitfalls
- a R chunk (snippet of code) is defined as such :

````

```r
#YOUR CODE CHUNK HERE
```
````

If you delete one of the ` character (a backtick), RStudio will not recognize it as a chunk.

- Every now and then, reset your environment (`Session` -> `Restart and clear output`)



### How to read...



#### ...an Excel file


```r
library(openxlsx)
DT  <- openxlsx::read.xlsx("/path/to/file.xlsx", sheet="the-name-of-the-sheet",startRow=1)
```

Make sure to adjust the sheet name if you have more than one sheet in your Excel file, and also the starting row index.

#### ...a Comma separated values file (aka .csv)


```r
library(data.table)
DT<- data.table::fread("/path/to/file.csv", sep=";")
```

Make sure to adjust the separator.

#### ...a Json file


```r
library(jsonlite)
DT<- jsonlite::fromJSON("https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json",flatten = T)
```



  
