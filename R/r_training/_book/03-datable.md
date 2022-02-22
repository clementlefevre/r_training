# Data manipulation - part 1 

To manipulate data with R, there are two options :

- the **dplyr** package. Very beginner friendly, most of the tutorials you can find online are using `dplyr`.
- the **data.table** package is the workhorse of data manipulation in R. For this introduction we will use it, for the following reasons : the syntax is more concise than `dplyr`, and it works seamlessly with large datasets (more than 1 million rows). In comparison, Excel can handle a maximum of 1,048,576 rows.

## Workflow with Excel  {-}
A typical workflow with Excel consists in the following steps :

- load a couple of Excel or csv files,
- filter the tables based on given criteria,
- join the tables (using the  'VLOOKUP' Formula in english, 'SVERWEIS' in German, 'RECHERCHEV' in french)
- select columns of interest
- add new columns such as `=(A1-D4)*24`
- save the output in an other Excel file.
- call it a day.    

<img src="images/excel_meme.jfif" width="50%" style="display: block; margin: auto;" />



When this task occurs once a week, R can help to automatize the so-called "boring stuff" and allows you to spend more time on highly-valuable Teams© meetings.
In this notebook, we are going to achieve all those steps with R.
At the end of this lesson, you will be able to write a script that complete all those tasks automatically.
Bear with me, this is the most complex part of this course, but also the most rewarding.

## Load your data  {-}
Loading your input files in the context of data manipulation means converting them into a a so-called **dataframe**.

A **dataframe** is nothing more than a table, with columns names and rows. That's it.
When loading into R an Excel file, you must beware of :

- the name of the Excel sheet you want to load,
- the index of the row where the column names are located.


*Note : a deeply enshrined pathology with Excel is to merge the columns cells headers, we will take care of this later in this lesson.*


First thing first, we load the necessary R packages for this operation : `openxlsx` and `data.table` : 

*don't forget to click on the <span style="color:green;font-size: 24px">**►**</span> button above the code chunk to execute the code.*



```r
library(openxlsx)
library(data.table)
```

*Note: If you get an error like : * 

`Error in library(data.table) : there is no package called ‘data.table’`

*don't be scared, it's it perfectly normal, your R Project has not installed this package yet. To solve this, just go to* `Tools -> Install Packages` *and type* **`openxlsx`** (or **`data.table`**) *in the search bar, then click* `install`.
*RStudio will then automatically install the package.*


#### Download the samples files  {-}
Now time to download our input files :


*Note: This operation is only required for this lesson, as later you will use your own files*



```r
# create a new 'data' folder to store the files :
dir.create(file.path("./data"), showWarnings = FALSE)

# download the samples files from the cloud :
download.file("https://r-training-bookdown.s3.amazonaws.com/data/Financial+sample.xlsx", "./data/Financial sample.xlsx", mode = "wb")
download.file("https://r-training-bookdown.s3.amazonaws.com/data/CustomerSupport.csv", "./data/CustomerSupport.csv", mode = "wb")
```
*don't forget to click on the <span style="color:green;font-size: 24px">**►**</span> button above the code chunk to execute the code.*

Have a look in the file explorer, a new **`data`** folder appeared. Click on it, our two sample files should be there.


#### Load the Excel file :  {-} 


*list the names of the sheets that the Excel file contains:*

```r
getSheetNames("./data/Financial sample.xlsx")
#> [1] "Sales"    "Managers"
```
what did we do here ? We read the excel file `Financial sample.xlsx` located in the `data` folder and displayed the names of the sheets contained in this file. Nothing more.
As you can witness with your own eyes, `Financial sample.xlsx` contains two sheets : **Sales** and  **Managers**

*Let’s Just Do It and Be Legends© :  load the* **Sales**  *sheet into a R dataframe :*


```r
DT_sales <- read.xlsx("./data/Financial sample.xlsx", sheet = "Sales", detectDates = TRUE)
```

What did we did here ? We just read the content of the **Sales** and loaded into a R table named **DT_sales**.
Check its content by clicking on `DT_sales` in the `Environment` tab in top right area.

#### Load the .csv file : {-}

Nobody is perfect, especially Leandro from Accounting. Although you begged him to send you the List of the Customer Support Staff as an Excel file, he insists on sending it as a .csv file. Relax, take it easy :


```r
DT_customer_support <- fread("./data/CustomerSupport.csv")
```


That's it. You have now the two files loaded as dataframes. One last thing : we must convert them into the data.table format :

```r
setDT(DT_sales)
setDT(DT_customer_support)
```


## Basic operations  {-}


we begin by looking at the dataframe structure  (`str` is for "structure"):

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
#>  $ Date               : Date, format: "2014-01-01" ...
#>  $ Month.Number       : num  1 1 6 6 6 12 3 6 6 6 ...
#>  $ Month.Name         : chr  "January" "January" "June" "June" ...
#>  $ Year               : chr  "2014" "2014" "2014" "2014" ...
#>  - attr(*, ".internal.selfref")=<externalptr>
```
Note: this operation is crucial.

Why ? You can see how R loaded each column and defined a type for each : `chr` for character, `num` for numeric. Oh look, the `Date` column is a `num`.

Let's fix this problem by reloading the Excel with an extra option :

```r
DT_sales <- read.xlsx("./data/Financial sample.xlsx", sheet = "Sales", detectDates = TRUE)
setDT(DT_sales) # you NEED this also
```

and here we go :


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
#>  $ Date               : Date, format: "2014-01-01" ...
#>  $ Month.Number       : num  1 1 6 6 6 12 3 6 6 6 ...
#>  $ Month.Name         : chr  "January" "January" "June" "June" ...
#>  $ Year               : chr  "2014" "2014" "2014" "2014" ...
#>  - attr(*, ".internal.selfref")=<externalptr>
```

<br />

Excellent, now we want to display the first 10 rows of our `DT_sales` dataframe :

*Note : to display the last 10 rows, just replace `head` with `tail`*

```r
head(DT_sales)
```



<div style="border: 0px;overflow-x: scroll; width:100%; "><table class="table" style="margin-left: auto; margin-right: auto;">
 <thead>
  <tr>
   <th style="text-align:left;"> Segment </th>
   <th style="text-align:left;"> Country </th>
   <th style="text-align:left;"> Product </th>
   <th style="text-align:left;"> Discount.Band </th>
   <th style="text-align:right;"> Units.Sold </th>
   <th style="text-align:right;"> Manufacturing.Price </th>
   <th style="text-align:right;"> Sale.Price </th>
   <th style="text-align:right;"> Gross.Sales </th>
   <th style="text-align:right;"> Discounts </th>
   <th style="text-align:right;"> Sales </th>
   <th style="text-align:right;"> COGS </th>
   <th style="text-align:right;"> Profit </th>
   <th style="text-align:left;"> Date </th>
   <th style="text-align:right;"> Month.Number </th>
   <th style="text-align:left;"> Month.Name </th>
   <th style="text-align:left;"> Year </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> Government </td>
   <td style="text-align:left;"> Canada </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 1618.5 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 20 </td>
   <td style="text-align:right;"> 32370 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 32370 </td>
   <td style="text-align:right;"> 16185 </td>
   <td style="text-align:right;"> 16185 </td>
   <td style="text-align:left;"> 2014-01-01 </td>
   <td style="text-align:right;"> 1 </td>
   <td style="text-align:left;"> January </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Government </td>
   <td style="text-align:left;"> Germany </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 1321.0 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 20 </td>
   <td style="text-align:right;"> 26420 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 26420 </td>
   <td style="text-align:right;"> 13210 </td>
   <td style="text-align:right;"> 13210 </td>
   <td style="text-align:left;"> 2014-01-01 </td>
   <td style="text-align:right;"> 1 </td>
   <td style="text-align:left;"> January </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Midmarket </td>
   <td style="text-align:left;"> France </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 2178.0 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 32670 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 32670 </td>
   <td style="text-align:right;"> 21780 </td>
   <td style="text-align:right;"> 10890 </td>
   <td style="text-align:left;"> 2014-06-01 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:left;"> June </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Midmarket </td>
   <td style="text-align:left;"> Germany </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 888.0 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 13320 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 13320 </td>
   <td style="text-align:right;"> 8880 </td>
   <td style="text-align:right;"> 4440 </td>
   <td style="text-align:left;"> 2014-06-01 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:left;"> June </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Midmarket </td>
   <td style="text-align:left;"> Mexico </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 2470.0 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 15 </td>
   <td style="text-align:right;"> 37050 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 37050 </td>
   <td style="text-align:right;"> 24700 </td>
   <td style="text-align:right;"> 12350 </td>
   <td style="text-align:left;"> 2014-06-01 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:left;"> June </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Government </td>
   <td style="text-align:left;"> Germany </td>
   <td style="text-align:left;"> Carretera </td>
   <td style="text-align:left;"> None </td>
   <td style="text-align:right;"> 1513.0 </td>
   <td style="text-align:right;"> 3 </td>
   <td style="text-align:right;"> 350 </td>
   <td style="text-align:right;"> 529550 </td>
   <td style="text-align:right;"> 0 </td>
   <td style="text-align:right;"> 529550 </td>
   <td style="text-align:right;"> 393380 </td>
   <td style="text-align:right;"> 136170 </td>
   <td style="text-align:left;"> 2014-12-01 </td>
   <td style="text-align:right;"> 12 </td>
   <td style="text-align:left;"> December </td>
   <td style="text-align:left;"> 2014 </td>
  </tr>
</tbody>
</table></div>


<br />
How about the list of the **Product** column ?

```r
unique(DT_sales$Product)
#> [1] "Carretera" "Montana"   "Paseo"     "Velo"     
#> [5] "VTT"       "Amarilla"
```

<br />
Show me the max value of the **Profit**  column :

```r
max(DT_sales$Profit)
#> [1] 262200
```

<br />

