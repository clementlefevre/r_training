# Data manipulation with datatable

To manipulate data with R, there are two options :

- the **dplyr** package. Very beginner friendly, most of the tutorials you can find online are using `dplyr`.
- the **data.table** package is the workhorse of data manipulation in R. For this introduction we will use it, for the following reasons : the syntax is much concise as `dplyr`, and it works seamlessly with large dataset (like 5 millions rows). As as sidenote, Excel can handle a maximum of 1,048,576 rows.

*Hint : an Excel "Table" is the equivalent of a R "dataframe".*

## First steps with data.table

In your notebook, create a new chunk as following :


```r

library(data.table)
library(openxlsx)
DT <- openxlsx::read.xlsx("https://r-training-bookdown.s3.amazonaws.com/data/Financial+Sample.xlsx")
DT <- setDT(DT) # we convert the dataframe into a data.table, to be able to use the data.table operations on it.
```


### Basic operations :


*show the dataframe structure :*

```r
str(DT)
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
unique(DT$Product)
#> [1] "Carretera" "Montana"   "Paseo"     "Velo"     
#> [5] "VTT"       "Amarilla"
```

*get the max value of Profit :*

```r
max(DT$Profit)
#> [1] 262200
```
*filter the dataframe on Product "Carretera" :*

```r
DT[Product=="Carretera"]
```


Table: (\#tab:unnamed-chunk-6)A table of the Carretera Products.

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
DT[,Profit.Margin:=(Sale.Price - Manufacturing.Price)]
```

### Pivot table in R
The R equivalent of the Excel Pivot Table is the group operation.

*For instance, we want to count the* **number of Product categories per Country** :


```r
DT[,.(count_Products=uniqueN(Product)), by=.(Country)]
#>                     Country count_Products
#> 1:                   Canada              6
#> 2:                  Germany              6
#> 3:                   France              6
#> 4:                   Mexico              6
#> 5: United States of America              6
```


*we want to create a pivot table with the* **total number of units sold** *per* **Product** :


```r
DT[,.(total_units_sold=sum(Units.Sold)), by=.(Product)]
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
DT[,.(total_units_sold=sum(Units.Sold)), by=.(Product)][order(total_units_sold)]
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
DT[,.(total_units_sold=sum(Units.Sold)), by=.(Product)][order(-total_units_sold)]
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
DT[,.(total_units_sold=sum(Units.Sold)), by=.(Product, Country)]
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
DT_grouped <- DT[,.(total_units_sold=sum(Units.Sold)), by=.(Product, Country)]
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

### Export the result as an Excel file :


```r
write.xlsx(DT_grouped, "DT_grouped.xlsx", sheetName="gouped Sales")
```

Useful resources to learn data.table :

- https://cran.r-project.org/web/packages/data.table/vignettes/datatable-intro.html
- https://franknarf1.github.io/r-tutorial/_book/tables.html#tables

