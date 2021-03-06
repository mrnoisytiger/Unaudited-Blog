---
title: Does an area's cuisine indicate it's racial demographics?
date: '2018-07-14'
tags:
  - Yelp
  - census
  - statistics
author: Felix Jen
require:
  - chartjs
  - chartjs-datalabels
  - latex
  - jquery
  - fontawesome
  - jstat
toc: true
draft: false
type: post
---
Oftentimes, we go to a town we've never been to and notice, "There are a lot of Asian restaurants here!" Does that have a tendency to correlate to there actually being a lot of Asian people in the area? The same can be asked about any other cuisine and its associated race. Upon initial thought, one would agree that there should indeed be a pretty close correlation. Otherwise, who else would be eating there, cooking there, etc...? It's pretty clear that ethnicity would prefer their own cuisine as opposed to others. Therefore one would expect the spread of restaurants across race to somewhat mimic that of the racial profile of the population in the area. This post seeks to examine the possible link between these two, or lack thereof.

## Methodology

A comparison of these two factors require two major data sets, restaurant ethnicity and population demographics, both of a certain area. 

### Areas

For controllability and to avoid ambiguity, an "area" was defined to be the confines a single U.S. Postal Service 5-digit ZIP Code. These areas are standardized across the U.S. and all data sources and are a natural choice for selection of an area. Additionally, the other data sources used play well with zip codes, allowing an area to be specified directly and limiting the search to the area.

The initial plan was to gather data from all ZIP codes in the U.S. as well as Minor Outlying Territories. However, this proved to be a too daunting of a task, with over 46,000 ZIP codes to consider. Other data sources were serverely rate limited so such a query would have taken prohibitively long. As an alternative, the 50 most populous cities in the U.S. was chosen, using data from [MapsZipCode](http://www.mapszipcode.com/reports/largest+population/). An additional 40 random zip codes were generated from [RandomLists](https://www.randomlists.com/random-zip-codes?qty=20&dup=false) to increase our sample size. This is not the largest data set by far, but it does the trick for now. Later on, the data set may be expanded using data from [Localistca](http://localistica.com/usa/zipcodes/most-populated-zipcodes/).

### Race

Race data by ZIP code was pulled from the [US Census website](https://factfinder.census.gov), using the [2012-2016 American Community Survey 5-Year Estimate](https://factfinder.census.gov/bkmk/table/1.0/en/ACS/16_5YR/DP05/8600000US91748). The five races that were looked at were White (not including Hispanic or Latino), Asian, Black, Hawaiian or Pacific Islander, and Hispanic/Latino. There was not enough restaurant data to include those of two or more races, so those were left out. As well, the `Some Other Race` category was not considered as it was too vague to give an accurate classification. Finally, `American Indian or Alaska Native` was also not considered as there was inadequate data to draw conclusions. Finally, the total population was generated as a sum of all five races considered (and therefore may or may not represent the actual numerical population of the area). 

### Restaurant Ethnicity

Where do we find data on restaurants within an area? [Yelp](http://www.yelp.com) of course! Using [Yelp's Fusion API](http://www.yelp.com/fusion), a [GraphQL query](https://www.yelp.com/developers/graphql/guides/intro) was sent to do a ZIP Code based restaurant [search](https://www.yelp.com/developers/documentation/v3/business_search). The query executed is outlined as follows:

```php
{
  search(term:"restaurant",
    location:"<zip code>",
    limit: 50,
    offset: 0,
  ){
    total
    business {
      name
      categories {
        title
      }
    }
  }
}
```

This query generates a list of 50 restaurants, displaying the restaurant's name as well as Yelp category. However, there are a couple major issues with this query that had to be resolved. 

First off, Yelp's API only allows for a listing of 50 restaurants from this endpoint at a time and in total, only provides the first 1,000 restaurants in the particular zip code. Often, cities would have more than 1,000 restaurants, and most definitely more than 50. Therefore, for each ZIP code, the query was looped as many times as necessary to get all the restaurant data, each time changing the `offset` value to be 50 higher. As well, if a ZIP Code had more than 1,000 restaurants (which was the case for many), the data would be truncated to the first 1,000.

Next, while Yelp does have category data for each of its restaurants listed, this data did not match exactly with racial markers. For example, a category for a restaurant might be `Korean`, whereas it actually corresponds to the race of `Asian`. A quick scan of Yelp's documentation revealed the [full list](https://www.yelp.com/developers/documentation/v2/category_list) of possible categories a restaurant could take. Then, a best effort attempt was made to allocate each Yelp category to a "race" designation. This was a bit tricky (and inevitably involves bias), because while these categories do mostly correspond to varying ethnicities, allocating them to fit "race" is not exactly a one-to-one task. For example, do we consider `Spanish` as "Hispanic/Latino" or "White"? What about `Filipino`, with influences from a variety of cultures? Such questions ultimately make the classification tricky and may inherently skew the data. As well, there were some Yelp categories which added little to no useful information, such as `salad` or `Food Court`. It's near impossible to say a specific race about a salad without knowing more, so categories like those were left out of consideration entirely. An allocated list of categories is available for download \[here](ADD LINK TO DOWNLOAD). The number of categories allocated to each race is summarized in the chart below.

<div class="canvas-div"><canvas id="cats-to-dem"></canvas></div>

<!--
<table>
<tr>
  <th>Race</th>
  <th>Category Count</th>
</tr>
<tr>
  <td>White</td>
  <td>60</td>
</tr>
<tr>
  <td>Asian</td>
  <td>33</td>
</tr>
<tr>
  <td>Black</td>
  <td>6</td>
</tr>
<tr>
  <td>Pac. Isl.</td>
  <td>7</td>
</tr>
<tr>
  <td>Hispanic</td>
  <td>21</td>
</tr>
</table><br> -->

A similar issue arises if a restaurant crosses multiple categories and happens to traverse multiple races. What if a restaurant serves both Asian and Mexican food or is some kind of modern fusion between the two? In those cases, those restaurants were considered to exist in _both_ categories. Therefore, some of the data in each zip code may appear to show more than 1,000 restaurants total, but this is merely an artifact of the classification done. One may ask why such a choice was made, to consider a restaurant in more than one race. To answer that, we look back at our existing question, whether cuisine correlates to race. If a restaurant crosses into more than one racial type, an assumption was made (may be presumptuous) that each racial type represented would be equally likely to eat at the restaurant, and that the restaurant panders to each of those races.

With those considerations resolves, the Yelp API was scraped for the 90 zip codes discussed previously. The results were then processed and cataloged into the races discussed in the above section and the results tallied up. Again, given the possibility of multiple races being assigned to a single restaurant, some zip codes may have more than 1000 data points. 

## Initial Graphs and Data

Let's first look directly at some of the data gathered. We can compare the data across two major dimensions, the zip codes and race. We begin by examining the differences between the 90 zip codes used, to get an overview of what we are looking at. 

### Per-ZIP-Code Comparison

The following graphs represent a Per-Zip-Code comparison of the percent of restaurants per race, and the percent of calculated population per race. 

<div class="lr-select">
  <button><i class="fas fa-arrow-left two-line-arrow" id="left-arrow-zip-code"></i></button>
  <p id="current-zip-code"></p>
  <button><i class="fas fa-arrow-right two-line-arrow" id="right-arrow-zip-code"></i></button>
</div>
<div class="canvas-div-xl"><canvas id="per-zip-comparison"></canvas></div>

Upon initial examination, we notice two major things. The majority of the restaurant data tends to look pretty similar, while the population data tends to vary wildly. As well, we notice that there are some places with shocking correlation, e.g. 90024, where there are also a great deal that completely miss the mark. This is extremely interesting because it suggests there are indeed some disconnects between an area's cuisine profile and its racial profile. We'll examine these more in depth by race in the later section, seeing if there is a specific discongruity somewhere. 

Additionally, flipping through all the presented zip codes in succession, we notice that the percentages of restaurants form a roughly similar shape, while the population demographics vary wildly. This can be easily explained by the way we classified the restaurants discussed earlier. Looking through our classification list, we can see that `White` had the most categories assigned to it, followed by Asian, then Hispanic. This was simply due to the race of `White` being a very large, all-encompassing race, from American, to European, to Middle-Eastern. This is in contrast to races like `Black`, which is much more stringent in classification. A deeper dive into this issue will be performed in a later section.

### Per-Race Data Scatterplots

After seeing the per-zip-code data, it makes sense to dive into the predictive value of cuisine profile to racial profile. To do this, we'll look at each race separately in its own scatterplot and attempt to perform regression analysis on the data.

<div class="lr-select">
  <button><i class="fas fa-arrow-left" id="left-arrow-race"></i></button>
  <p id="current-race"></p>
  <button><i class="fas fa-arrow-right" id="right-arrow-race"></i></button>
</div>
<div class="canvas-div-xl"><canvas id="per-race-comparison"></canvas></div>

Looking at our five races, we do indeed see upwards correlations for most of the sets, which agrees with our initial intuition—An area with more **_** cuisine would have more **_** people. However, the differing strengths in the correlation are also pretty clear. At a cursory glance, the `White`, `Asian` and `Hispanic` races exhibit strong upwards correlations between the percentage of restaurants and percentage of the population. This trend is much weaker for the `Black` and `Pacific Islander` races, possibly due to their dimunitive number of [categories allocated](#restaurant-ethnicity).

#### Regression Analysis

To get a better sense of these exact trends, simple linear regressions were performed between the `Restaurant %` and `Population %`. For purposes of this cursory linear regression, we designate `Restaurant %` of the race we are consider to be the only independent variable. The results are summarized in the table below (p-values removed for brevity).

<table id="simple-linear-reg">
<tr>
  <th>Race</th>
  <th>Slope</th>
  <th>Intercept</th>
  <th>$R^2$</th>
</tr>
<tr id="simple-linear-reg-white">
  <td>White</td>
  <td class="lin-reg-slope"></td>
  <td class="lin-reg-int"></td>
  <td class="lin-req-r2"></td>
</tr>
<tr id="simple-linear-reg-asian">
  <td>Asian</td>
  <td class="lin-reg-slope"></td>
  <td class="lin-reg-int"></td>
  <td class="lin-req-r2"></td>
</tr>
<tr id="simple-linear-reg-black">
  <td>Black</td>
  <td class="lin-reg-slope"></td>
  <td class="lin-reg-int"></td>
  <td class="lin-req-r2"></td>
</tr>
<tr id="simple-linear-reg-api">
  <td>Pac. Isl.</td>
  <td class="lin-reg-slope"></td>
  <td class="lin-reg-int"></td>
  <td class="lin-req-r2"></td>
</tr>
<tr id="simple-linear-reg-hispanic">
  <td>Hispanic</td>
  <td class="lin-reg-slope"></td>
  <td class="lin-reg-int"></td>
  <td class="lin-req-r2"></td>
</tr>
</table><br>

These regressions indeed agree with our initial expectation from the data. There is indeed a positive trend between an area's cuisine profile and race profile. Similarly, we see that `Hispanic` has the highest correlation where `Pacific Islander` has close to no correlation. Ultimately, the percentage of `Pacific Islander` in the population data was simply too low for a meaningful correlation to have developed. 

#### Residual Analysis

Now that we have our linear regression data complete, we can perform a quick residual analysis using scatterplots to ensure that a linear model is appropriate for our data. Those are scatterplots are shown below.

<div class="lr-select">
  <button><i class="fas fa-arrow-left" id="left-arrow-race-resid"></i></button>
  <p id="current-race-resid"></p>
  <button><i class="fas fa-arrow-right" id="right-arrow-race-resid"></i></button>
</div>
<div class="canvas-div-xl"><canvas id="per-race-resid-comparison"></canvas></div>

Looking at these scatterplots, we notice a very stark trend in the `Asian` race that will have to be addressed later. Likely, the linear regression we used for the `Asian` data set is actually not a good fit, and another nonlinear regression may be better suited. This is also seen, to a lesser extent, with the `White` and `Black` data sets. Additionally, we notice a small cluster of points for the `Pacific Islander` race, but once again, we attribute this to the diminutive size and data set for that race.

## Cross Racial Analysis

In the previous section, we looked to see if there were any trends among a specific race's percentage in the cuisine profile and the area's racial profile. In this section, we will extend our analysis to identify if there are any cross-racial effects, such as between the percentage of `Asian` restaurants versus the percentage of `White` in the population. Our intuition tells us that such effects should generally be unlikely, or at least result in a typically negative trend. 

### Cross Racial Scatterplots

For examination of cross racial effects, we first take a look another similar scatterplot to what we saw earlier. However, instead of choosing a singular race to look at across both axes, the choice of races for each axis is broken apart. The first choice would be for the `X-axis` (Restaurant %) and the second choice for the `Y-axis` (Population %). This should result in a total of 25 unique scatterplots.

<div class="lr-select">
  <button><i class="fas fa-arrow-left" id="left-arrow-cross-race-x"></i></button>
  <p id="current-cross-race-x"></p>
  <button><i class="fas fa-arrow-right" id="right-arrow-cross-race-x"></i></button>
</div>
<div class="lr-select">
  <button><i class="fas fa-arrow-left" id="left-arrow-cross-race-y"></i></button>
  <p id="current-cross-race-y"></p>
  <button><i class="fas fa-arrow-right" id="right-arrow-cross-race-y"></i></button>
</div>
<div class="canvas-div-xl"><canvas id="cross-race-scatterplot"></canvas></div>

Flipping through these scatterplots, our initial suspicion is generally confirmed. We do indeed notice a slight negative trend among the cross race data while intra-race data shows a positive trend. Armed with this bit of knowledge, we can extend our regressions to a multiple regression. Not surprisingly, we can expect that a race's restaurant percentage would vary positively with that race and negatively with all other races.

**Note: Not yet complete**

<script src="/js/post/cuisine-and-demographics.js" type="text/javascript"></script>

<style>
.lr-select {
  text-align: center;
}

.lr-select button {
  background-color: rgba(0,0,0,0);
  border: none;
  outline:none;
}

.lr-select i, .lr-select p {
  display: inline-block;
  text-align: center;
  line-height: 48px;
  transition: 0.2s;
}

.lr-select p {
  font-size: 1em;
  font-weight: 600;
  width: 185px;
}

.lr-select .two-line-arrow {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.lr-select i:hover {
  cursor: pointer;
}

.lr-select button:first-child i:first-child {
  color: lightgrey;
}

.lr-select hr {
  width: 0px;
  visibility: hidden;
  margin: -8px;
}

.lr-select p span {
  font-size: 0.67em !important;
}

table {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    width: 100%;
}

th {
    width: 25%;
    background-color: rgb(4,125,161);
    color: white;
    height: 35px;
    border-radius: 5px;
}

td {
    height: 30px;
}

tr:nth-child(even) {
    background-color: rgba(4,125,161, 0.3);
}
</style>
