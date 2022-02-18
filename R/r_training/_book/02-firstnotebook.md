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

Then click on the green "*PLAY*" icon on the top right of this code chunk.
RStudio will load the package, and we are now good to read our first Excel file !


In the Code chunk, add the following line :

`DT <- openxlsx::read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx")`


Your code chunk should look like this :


````

```r
library(openxlsx)
DT <- openxlsx::read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx")
```
````

Click again on the green "*PLAY*" icon

You should then see in the top right area of your notebook, in the `Environment` tab a new variable `DT`. Just click on it, a new View Tab should pop up with the content of your first Dataframe. You are now officially a Data Scientist. 


### Exercise

Upload an Excel of your own with the **`Upload`** button located at the bottom right area, just above the file explorer.
The name of the file should then appear in the file explorer.
To load the file into a new dataframe, just type :

`DT_2 <- openxlsx::read.xlsx("your_file_name.xslx")`

**Hint**: *if your excel file contains multiple sheets, the `openxlsx` will load the first sheet of the file by default.
To set the sheetname just add the* **sheet** *parameter in the previous command* :

`DT_2 <- openxlsx::read.xlsx("your_file_name.xslx",  sheet = "my_sheet_name")`

Do not forget to click "*PLAY*" to run the code.


## Common pitfalls
- a R chunk (snippet of code) is defined as such :

````

```r
#YOUR CODE CHUNK HERE
```
````

If you delete one of the ` character (a backtick), RStudio will not recognize it as a chunk.

- Every now and then, reset your environment (`Rstudio -> Session -> Restart and clear output`)
- When using the `data.table` package, do not forget to convert your data.frame into a data.table with `setDT(my-dataframe)`



### How to read...
Do not forget to upload you file first in RStudio cloud 
: `Upload` button at the bottom right.


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



  
