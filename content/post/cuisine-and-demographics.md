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
  - latex
  - jquery
  - fontawesome
toc: true
draft: false
type: post
---

Often times, we go to a town we've never been to and notice, "There are a lot of Asian restaurants here!" Does that have a tendency to correlate to there actually being a lot of Asian people in the area? The same can be asked about any other cuisine and its associated race. Upon initial thought, one would agree that there should indeed be a pretty close correlation. Otherwise, who else would be eating there, cooking there, etc...? It's pretty clear that ethnicity would prefer their own cuisine as opposed to others. Therefore one would expect the spread of restaurants across race to somewhat mimic that of the racial profile of the population in the area. This post seeks to examine the possible link between these two, or lack thereof.

## Methodology

A comparison of these two factors require two major data sets, restaurant ethnicity and population demographics, both of a certain area. 

### Areas

For controllability and to avoid ambiguity, an "area" was defined to be the confines a single U.S. Postal Service 5-digit ZIP Code. These areas are standardized across the U.S. and all data sources and are a natural choice for selection of an area. Additionally, the other data sources used play well with zip codes, allowing an area to be specified directly and limiting the search to the area.

The initial plan was to gather data from all ZIP codes in the U.S. as well as Minor Outlying Territories. However, this proved to be a too daunting of a task, with over 46,000 ZIP codes to consider. Other data sources were serverely rate limited so such a query would have taken prohibitively long. As an alternative, the 50 most populous cities in the U.S. was chosen, using data from [MapsZipCode](http://www.mapszipcode.com/reports/largest+population/). This is not the largest data set by far, but it does the trick for now. Later on, the data set may be expanded using data from [Localistca](http://localistica.com/usa/zipcodes/most-populated-zipcodes/).

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

Next, while Yelp does have category data for each of its restaurants listed, this data did not match exactly with racial markers. For example, a category for a restaurant might be `Korean`, whereas it actually corresponds to the race of `Asian`. A quick scan of Yelp's documentation revealed the [full list](https://www.yelp.com/developers/documentation/v2/category_list) of possible categories a restaurant could take. Then, a best effort attempt was made to allocate each Yelp category to a "race" designation. This was a bit tricky (and inevitably involves bias), because while these categories do mostly correspond to varying ethnicities, allocating them to fit "race" is not exactly a one-to-one task. For example, do we consider `Spanish` as "Hispanic/Latino" or "White"? What about `Filipino`, with influences from a variety of cultures? Such questions ultimately make the classification tricky and may inherently skew the data. As well, there were some Yelp categories which added little to no useful information, such as `salad` or `Food Court`. It's near impossible to say a specific race about a salad without knowing more, so categories like those were left out of consideration entirely. An allocated list of categories is available for download [here](ADD LINK TO DOWNLOAD). 

A similar issue arises if a restaurant crosses multiple categories and happens to traverse multiple races. What if a restaurant serves both Asian and Mexican food or is some kind of modern fusion between the two? In those cases, those restaurants were considered to exist in *both* categories. Therefore, some of the data in each zip code may appear to show more than 1,000 restaurants total, but this is merely an artifact of the classification done. One may ask why such a choice was made, to consider a restaurant in more than one race. To answer that, we look back at our existing question, whether cuisine correlates to race. If a restaurant crosses into more than one racial type, an assumption was made (may be presumptuous) that each racial type represented would be equally likely to eat at the restaurant, and that the restaurant panders to each of those races.

With those considerations resolves, the Yelp API was scraped for the 50 zip codes discussed previously. The results were then processed and cataloged into the races discussed in the above section and the results tallied up. Again, given the possibility of multiple races being assigned to a single restaurant, some zip codes may have more than 1000 data points. 

## Graphs and Data

### Per-ZIP-Code Comparison

The following graphs represent a Per-Zip-Code comparison of the percent of restaurants per race, and the percent of calculated population per race.

<div class="lr-select">
  <i class="fas fa-arrow-left" id="left-arrow-zip-code"></i>
  <p id="current-zip-code"></p>
  <i class="fas fa-arrow-right" id="right-arrow-zip-code"></i>
</div>
<div class="canvas-div-xl"><canvas id="per-zip-comparison"></canvas></div>

Upon initial examine, we notice two major things. The majority of the restaurant data tends to look pretty similar, while the population data tends to vary wildly. As well, we notice that there are some places with shocking correlation, e.g. 90024, where there are also a great deal that completely miss the mark.

<!-- Examine this data closer -->

**Note: Not yet complete**




<script src="/js/post/cuisine-and-demographics.js" type="text/javascript"></script>

<style>
.lr-select {
  text-align: center;
}

.lr-select i, .lr-select p {
  display: inline-block;
  text-align: center;
  line-height: 48px;
  transition: 0.2s;
}

.lr-select p {
  padding: 0px 30px;
  font-size: 1.1em;
  font-weight: 600;
}

.lr-select i:hover {
  cursor: pointer;
}

.lr-select i:first-child {
  color: lightgrey;
}
</style>
