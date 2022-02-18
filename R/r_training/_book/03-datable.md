# Data manipulation with datatable

To manipulate data with R, there are two options :

- the **dplyr** package. Very beginner friendly, most of the tutorials you can find online are using `dplyr`.
- the **data.table** package is the workhorse of data manipulation in R. For this introduction we will use it, for the following reasons : the syntax is much more concise as `dplyr`, and it works seamlessly with large dataset (more than 1 million rows). In comparison, Excel can handle a maximum of 1,048,576 rows.

## Workflow with Excel
A typical workflow with Excel consists in the following steps :

- load a couple of Excel or csv files,
- filter the tables based on a given criteria,
- join the tables (using the  'VLOOKUP' Formula in english, 'SVERWEIS' in German, 'RECHERCHEV' in french)
- select columns of interest
- add new columns such as `=(A1-D4)*24`
- save the output in an other Excel file and send it via email.

When this task occurs once a week, R can help to automatize the so-called "boring stuff".
In this notebook, we are going to achieve all those steps with R.
At the end of this lesson, you will be able to write a script that complete all those task automatically.
Bear with me.

## Load your data
Loading your input files in the context of data manipulation means converting them into a a so-called **dataframe**.

A **dataframe** is nothing more than a table, with columns names and rows. That's it.
Whrn loading into R an Excel file, you must beware of :

- the name of the Excel sheet you want to load,
- the index of the row where the column names are located.


*Note : a deeply enshrined pathology with Excel is to merge the columns headers, we will take of this later in this lesson.*


First thing first, we load the necessary R packages for this operation : `openxlsx` and `data.table` : 

*don't forget to click on the green arrow at the top right of the chunk to execute the code*



```r
library(openxlsx)
library(data.table)
```

*Note: If you get an error like : * 

`Error in library(data.table) : there is no package called ‘data.table’`

*don't be scared, it's it perfectly normal, your R Project has not installed this package yet. To solve this, just go to* `Tools -> Install Packages` *and type* **`openxlsx`** (or **`data.table`**) *in the search bar, then click* `install`.
*RStudio will then automatically install the package.*


Now time to download our input files :


*Note: This operation is only required for this lesson, as later you will use your own files*



```r
# create a new 'data' folder to store the files :
dir.create(file.path("./data"), showWarnings = FALSE)

# download the samples files from the cloud :
download.file("https://r-training-bookdown.s3.amazonaws.com/data/Financial+sample.xlsx", "./data/Financial sample.xlsx", mode="wb")
download.file("https://r-training-bookdown.s3.amazonaws.com/data/CustomerSupport.csv", "./data/CustomerSupport.csv", mode="wb")
```

*Remember : an Excel "Table" is the equivalent of a R "dataframe".*

*Remember 2 : click on the green* **ᐅ** *to execute the code.*


## Load our first excel file :


*list the names of the sheets that the Excel file contains:*

```r
getSheetNames( "./data/Financial sample.xlsx")
#> [1] "Sales"    "Managers"
```
what did we do here ? We read the excel file `Financial sample.xlsx` located in the `data` folder and displayed the names of the sheets contained in this file. Nothing more.
As you can witness with your own eyes, `Financial sample.xlsx` contains two sheets : **Sales** and  **Managers**

Now *Let’s Just Do It and Be Legends©* :  load the **Sales** excel Sheet into a R dataframe :


*load the "Sales" sheet as a dataframe :*

```r
DT_sales <-  read.xlsx("./data/Financial sample.xlsx", sheet = "Sales")
DT_customer_support <- fread( "./data/CustomerSupport.csv")
```

What did we did here ? We just read the content of the **Sales** and loaded into a R table named **DT_sales**.
Now go the


```r
setDT(DT_sales)
```




### Basic operations :


*show the dataframe structure :*

```r
str(DT_sales)
#> Classes 'data.table' and 'data.frame':	700 obs. of  16 variables:
#>  $ Segment            : chr  "Government" "Government" "Midmarket" "Midmarket" ...
#>  $ Country            : chr  "Canada" "Germany" "France" "Germany" ...
#>  $ Product            : chr  "Carretera" "Carretera" "Carretera" "Carretera" ...
#>  $ Discount.Band      : chr  "None" "None" "None" "None" ...
#>  $ Units.Sold         : num  1618 1321 2178 888 2470 ...
#>  $ Manufacturing.Price: num  3 3 3 3 3 3 5 5 5 5 ...
#>  $ Sale.Price         : num  20 20 15 15 15 350 15 12 20 12 ...
#>  $ Gross.Sales        : num  32370 26420 32670 13320 37050 ...
#>  $ Discounts          : num  0 0 0 0 0 0 0 0 0 0 ...
#>  $ Sales              : num  32370 26420 32670 13320 37050 ...
#>  $ COGS               : num  16185 13210 21780 8880 24700 ...
#>  $ Profit             : num  16185 13210 10890 4440 12350 ...
#>  $ Date               : num  41640 41640 41791 41791 41791 ...
#>  $ Month.Number       : num  1 1 6 6 6 12 3 6 6 6 ...
#>  $ Month.Name         : chr  "January" "January" "June" "June" ...
#>  $ Year               : chr  "2014" "2014" "2014" "2014" ...
#>  - attr(*, ".internal.selfref")=<externalptr>
```
*list the Product names :*

```r
unique(DT_sales$Product)
#> [1] "Carretera" "Montana"   "Paseo"     "Velo"     
#> [5] "VTT"       "Amarilla"
```

*get the max value of Profit :*

```r
max(DT_sales$Profit)
#> [1] 262200
```
*filter the dataframe on Product "Carretera" :*

```r
DT_sales[Product=="Carretera"]
```


Table: (\#tab:unnamed-chunk-11)A table of the Carretera Products.

|Segment    |Country |Product   |Discount.Band | Units.Sold| Manufacturing.Price| Sale.Price| Gross.Sales| Discounts|  Sales|   COGS| Profit|  Date| Month.Number|Month.Name |Year |
|:----------|:-------|:---------|:-------------|----------:|-------------------:|----------:|-----------:|---------:|------:|------:|------:|-----:|------------:|:----------|:----|
|Government |Canada  |Carretera |None          |     1618.5|                   3|         20|       32370|         0|  32370|  16185|  16185| 41640|            1|January    |2014 |
|Government |Germany |Carretera |None          |     1321.0|                   3|         20|       26420|         0|  26420|  13210|  13210| 41640|            1|January    |2014 |
|Midmarket  |France  |Carretera |None          |     2178.0|                   3|         15|       32670|         0|  32670|  21780|  10890| 41791|            6|June       |2014 |
|Midmarket  |Germany |Carretera |None          |      888.0|                   3|         15|       13320|         0|  13320|   8880|   4440| 41791|            6|June       |2014 |
|Midmarket  |Mexico  |Carretera |None          |     2470.0|                   3|         15|       37050|         0|  37050|  24700|  12350| 41791|            6|June       |2014 |
|Government |Germany |Carretera |None          |     1513.0|                   3|        350|      529550|         0| 529550| 393380| 136170| 41974|           12|December   |2014 |


<br />
&nbsp;
*add a new column **"Profit.Margin"** = "Sale.Price" - "Manufacturing.Price" :*

```r
DT_sales[,Profit.Margin:=(Sale.Price - Manufacturing.Price)]
```

### Pivot table in R
The R equivalent of the Excel Pivot Table is the group operation.

*For instance, we want to count the* **number of Product categories per Country** :


```r
DT_sales[,.(count_Products=uniqueN(Product)), by=.(Country)]
#>                     Country count_Products
#> 1:                   Canada              6
#> 2:                  Germany              6
#> 3:                   France              6
#> 4:                   Mexico              6
#> 5: United States of America              6
```


*we want to create a pivot table with the* **total number of units sold** *per* **Product** :


```r
DT_sales[,.(total_units_sold=sum(Units.Sold)), by=.(Product)]
#>      Product total_units_sold
#> 1: Carretera         146846.0
#> 2:   Montana         154198.0
#> 3:     Paseo         338239.5
#> 4:      Velo         162424.5
#> 5:       VTT         168783.0
#> 6:  Amarilla         155315.0
```

Neat isn't it ?


*But your Boss© want those results sorted per value. No big deal here :*

```r
DT_sales[,.(total_units_sold=sum(Units.Sold)), by=.(Product)][order(total_units_sold)]
#>      Product total_units_sold
#> 1: Carretera         146846.0
#> 2:   Montana         154198.0
#> 3:  Amarilla         155315.0
#> 4:      Velo         162424.5
#> 5:       VTT         168783.0
#> 6:     Paseo         338239.5
```

*But your Boss© want those results sorted per value, in the descending order :*


```r
DT_sales[,.(total_units_sold=sum(Units.Sold)), by=.(Product)][order(-total_units_sold)]
#>      Product total_units_sold
#> 1:     Paseo         338239.5
#> 2:       VTT         168783.0
#> 3:      Velo         162424.5
#> 4:  Amarilla         155315.0
#> 5:   Montana         154198.0
#> 6: Carretera         146846.0
```

*How about grouping the data on multiple columns ? Like by* **Product** and **Country** ?

```r
DT_sales[,.(total_units_sold=sum(Units.Sold)), by=.(Product, Country)]
#>       Product                  Country total_units_sold
#>  1: Carretera                   Canada          34804.0
#>  2: Carretera                  Germany          24944.0
#>  3: Carretera                   France          34056.0
#>  4: Carretera                   Mexico          27224.0
#>  5:   Montana                  Germany          28061.0
#>  6:   Montana                   Canada          31488.5
#>  7:   Montana                   France          31282.0
#>  8:   Montana                   Mexico          31754.0
#>  9:   Montana United States of America          31612.5
#> 10:     Paseo                   Canada          78191.5
#> 11:     Paseo                   Mexico          63282.0
#> 12:     Paseo                  Germany          55693.5
#> 13:     Paseo                   France          71606.0
#> 14:     Paseo United States of America          69466.5
#> 15:      Velo                   Mexico          26540.0
#> 16:      Velo                   France          36609.5
#> 17:      Velo                  Germany          31050.0
#> 18:      Velo United States of America          35761.0
#> 19:      Velo                   Canada          32464.0
#> 20:       VTT                   Canada          41248.5
#> 21:       VTT                  Germany          31131.0
#> 22:       VTT                   France          35774.5
#> 23:  Amarilla                   France          31603.0
#> 24:  Amarilla United States of America          35469.5
#> 25:  Amarilla                  Germany          30614.5
#> 26: Carretera United States of America          25818.0
#> 27:       VTT United States of America          34500.0
#> 28:       VTT                   Mexico          26129.0
#> 29:  Amarilla                   Mexico          28396.0
#> 30:  Amarilla                   Canada          29232.0
#>       Product                  Country total_units_sold
```
*your Sales team only needs the* **Top 2  Sellers Countries per Product** :

For this, we first copy the grouped dataframe in a new variable `DT_grouped` :

```r
DT_grouped <- DT_sales[,.(total_units_sold=sum(Units.Sold)), by=.(Product, Country)]
DT_grouped[,head(.SD, 2), by=.(Product, Country)]
#>       Product                  Country total_units_sold
#>  1: Carretera                   Canada          34804.0
#>  2: Carretera                  Germany          24944.0
#>  3: Carretera                   France          34056.0
#>  4: Carretera                   Mexico          27224.0
#>  5:   Montana                  Germany          28061.0
#>  6:   Montana                   Canada          31488.5
#>  7:   Montana                   France          31282.0
#>  8:   Montana                   Mexico          31754.0
#>  9:   Montana United States of America          31612.5
#> 10:     Paseo                   Canada          78191.5
#> 11:     Paseo                   Mexico          63282.0
#> 12:     Paseo                  Germany          55693.5
#> 13:     Paseo                   France          71606.0
#> 14:     Paseo United States of America          69466.5
#> 15:      Velo                   Mexico          26540.0
#> 16:      Velo                   France          36609.5
#> 17:      Velo                  Germany          31050.0
#> 18:      Velo United States of America          35761.0
#> 19:      Velo                   Canada          32464.0
#> 20:       VTT                   Canada          41248.5
#> 21:       VTT                  Germany          31131.0
#> 22:       VTT                   France          35774.5
#> 23:  Amarilla                   France          31603.0
#> 24:  Amarilla United States of America          35469.5
#> 25:  Amarilla                  Germany          30614.5
#> 26: Carretera United States of America          25818.0
#> 27:       VTT United States of America          34500.0
#> 28:       VTT                   Mexico          26129.0
#> 29:  Amarilla                   Mexico          28396.0
#> 30:  Amarilla                   Canada          29232.0
#>       Product                  Country total_units_sold
```


### Merge, the VLOOKUP variant in R

One common operation in Excel is to combine two tables, based on a specific column. 



### Export the result as an Excel file :


```r
write.xlsx(DT_grouped, "DT_grouped.xlsx", sheetName="grouped Sales")
```


To download this file, just check the box besides the filename (DT_grouped.xlsx) in the file explorer (bottom right) and `More` -> `export`


Useful resources to learn data.table :

- https://cran.r-project.org/web/packages/data.table/vignettes/datatable-intro.html
- https://franknarf1.github.io/r-tutorial/_book/tables.html#tables

