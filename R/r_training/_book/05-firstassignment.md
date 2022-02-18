# First assignment


## The big picture
Last year the biggest untapped Bitcoin deposit was discovered in Burkina Faso.
The Thomas Sankara Sovereign Found has commissioned you to assess new investment opportunities in the field of football. Due to material reasons (the allocated budget disappeared somewhere between Zurich and Basel), you will not be able to make on-site visits to the Europeans clubs. Nevertheless, the Found, in its infinite kindness, has created a Gmail account for you, which will allow you to access [RStudio Cloud](https://rstudio.cloud/), the most powerful analysis tool in the world (after the Cross-multiplication, of course).

The scope of the study is the Spanish Liga 1, and we will use the [StatsBomb](https://github.com/statsbomb/open-data) data.
As you may be now aware of, due to the financial limitations of the project, there are only the free datasets available for this study. Don't be sad, there is still lot of fun to have with this dataset !

You can find the raw data in the `./data` folder after you running this code in a chunk :


```r
# This chunk downloads the Statsbomb data.You need to run this script once, then you can set the `update_data` variable to `FALSE`

library(data.table)
update_data <- TRUE

if (update_data) {
  download.file("https://r-training-bookdown.s3.amazonaws.com/data/data.zip", dest = "data.zip", mode = "wb")
  unzip("data.zip", exdir = ".")
  file.remove("data.zip")
}
#> [1] TRUE
```

*[Hint : Be a real iconoclast, and start by having a look at the [documentation](https://github.com/statsbomb/open-data/tree/master/doc)]*


In order to be able to add the title Senior Data Scientist to your TikTok profile, you must first prove the extent of your skills. So let's start with some basic calculations.

Using the `./data/DT_all_matches.csv` file, compute the following informations :

- the first and last date of matches.
- the eldest and youngest manager of all times. *[Hint: have a look at the [`lubridate`](https://lubridate.tidyverse.org/)* package to easily manipulate dates]*
- the eldest and youngest manager per season.
- the Team with the biggest home scores over all times.
- the Team with the biggest away scores per season.
- the name of the referee who has participated in the most matches over all seasons.
- the list of the Teams which only took part to one season.

*SFW

Given the results, where would put your money on ? 

And why have you got no money ?


```r
DT_matches <- fread("./data/DT_all_matches.csv")
#DT_matches[, .N, by = .(season.season_name)]
# You wonderfully crafted code goes here...
```



## Data Scientist, but also part-time Visual Designer
after having read the [ggplot2](https://uc-r.github.io/ggplot_intro) introduction, you should now be able to plot some nice charts to impress the Board.

- plot the number of **Home Score per Team** for the Season 2017/2018 (order per Number of Home Scores)  *[Hint : use the  [geom_bar](https://www.r-graph-gallery.com/218-basic-barplots-with-ggplot2.html) function]*

- plot the timeline of **home scores** for Betis Sevilla over all seasons and all matches. [see [here](https://rpubs.com/admiralbyng/geom_line_tutorial)]
- plot the Distribution of **Home and Away Scores** over all seasons *[Hint: The [boxplot](https://t-redactyl.io/blog/2016/04/creating-plots-in-r-using-ggplot2-part-10-boxplots.html) does a pretty good job]*

How about pimping your charts with [ggtheme](https://yutannihilation.github.io/allYourFigureAreBelongToUs/ggthemes/) and make them instagrammable ? 


## Merging and Acquisition

Now the real fun starts. We start by combining the matches data with the the lineups.

For this, we expect you have a basic understanding of the `merge` (for the Excel community, think `VLOOKUP`, for the SQL staff think the `JOIN`)

- merge the matches and lineups table on the **match_id** value.
- check that the number of rows of the newly datatable is the same as the number of lineups'rows.

**Let’s Just Do It and Be Legends !**

```r
DT_lineups <- fread("./data/DT_all_lineups_players.csv", encoding = "UTF-8")
# merge example :
# df_merged <-  merge(df1, df2, by.x = "df1ColName", by.y = "df2ColName")
```
