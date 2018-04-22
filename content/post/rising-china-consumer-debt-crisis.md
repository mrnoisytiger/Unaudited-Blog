---
title: Rising China Consumer Debt Outlook
date: '2018-04-21'
tags:
  - china
  - economics
author: Felix Jen
draft: false
type: post

---

The Chinese consumer market used to be hailed as the epitome of household saving and frugality. Prior to 2010, China was considered a rock, practically immune to major debt effects. These days though, China's increased leverage in their consumer markets paints a very different image, as it may not be the steadfast rock as it once was.

## Debt By the Numbers

A recent [report](https://www.reuters.com/article/us-china-economy-loans/china-january-new-loans-surge-to-record-2-9-trillion-yuan-blow-past-forecasts-idUSKBN1FW11L) showed that currently, household debt in China has nearly triped from ¥329.4 billion in December to over ¥900 billion in January. Even more troubling is the long term increase of household debt ever since the crisis of 2008 (with Household Debt to GDP of 17.86%) to around 50% as of last year. This rapid growth of household debt is clearly unsustainable.

<canvas id="household-debt-to-gdp"></canvas>

However, this growth in household debt is not entirely unexplainable. Over the past few years, the Chinese Central Government has been pushing increased indebtedness as an effort to boost overall economic growth and consumer spending. The increased levels of leverage in the markets has indeed helped the Chinese economy grow, but the extreme rise in leverage has caught the eyes of the Chinese government. [Pan Gongsheng](http://english.gov.cn/state_council/ministries/2018/03/10/content_281476073052100.htm), VP of the PBoC, has warned that both "home mortage loans and consumer leverage ratio were rising too fast." 

As echoed by the PBoC, China's home mortage borrowing has already grown extremely rapidly over the past few years. With housing prices hitting record highs since Q4 2016, the boom in mortgages is also clear.

<canvas id="beijing-housing"></canvas>

The government has been [doing its best](http://english.gov.cn/news/top_news/2017/02/19/content_281475571888153.htm) to curb the increase of home mortgages, often with buyers purchasing houses as speculative investments rather than actual residences. With increasing restrictions on mortgage lending, such as [higher down payments](http://english.gov.cn/policies/policy_watch/2016/10/25/content_281475474760679.htm) and tighter mortgage conditions, consumers are turning to more expensive lending avenues and, therefore, taking on more systemic risk in their investments. With the surging housing prices though, it is no surprise why real estate investors are willing to bear the increased loan costs as a way to circumvent lending regulations. 

Among these higher cost financial instruments, a major one is general unsecured consumer debt which is not attached to any mortgages. Chinese consumer credit has increased nearly ten times from the low in 2007 of ¥4.2 trillion to current ¥38 trillion. 

<canvas id="consumer-credit"></canvas>

Despite further tightening being put into place in late '17, such as increased documentation requirements and checks, money is still finding its way into the real estate sector, as we continue to see increased growth in the markets in early '18 data. This is likely due to increased prevalence of shadow banking injecting additional credit into regulated markets. If this growth [were to continue](https://www.bloomberg.com/view/articles/2018-02-15/chinese-consumers-are-building-up-too-much-household-debt), China's Debt/GDP ratio would quickly approach that of the U.S., pre-2008, a situation that is ripe for a burst. 

Not relegated to traditional consumer and mortgage loans, China has also seen an influx of "micro-loans," a loan for a very small amount, often to buy a few products. These loans are frequently given out to corporations like China Rapid Finance, one of an ever growing number of *micro-lending* companies. Previously, they have filled market role of extending credit to the lower class. But, as they become more and more addicted and lose with their spending habits, the regulators are becoming more and more concerned about the lack of regulation and restrictions on these *micro-lending* services. In [December 2017](https://www.reuters.com/article/us-china-regulations-loans/china-cracks-down-on-online-micro-lending-firms-with-new-rules-idUSKBN1DV4OU), Chinese regulators have begun to crack down and tighten restrictions of these services, with unlicensed lenders banned and licensed ones heavily scrutinized. This sudden reduction in the amount of easy-to-obtain credit will surely have negative effects in the future as growth is halted.

## Outlook

China isn't a stranger to debt issues these days. We've already seen a credit crunch back in 2013 which shot up overnight lending rates to 30%, from the commonplace 3%. Again, China has experienced significant stock market troubles in 2015 and 2016, which led to huge decreases of values of Chinese A-shares, with falls paralleling or exceeding those of '08. In each of these instances, the Chinese regulators have tightened liquidity, stunting economic growth.

With the new 19th Congress's goal of deleveraging Chinese SOE's and consumer markets, we can expect a similar liquidity crunch in the near term. As the Chinese government prepares to crack down, again, on the rise of shadow banking and unregulated loans, consumers are already beginning to curb excessing borrowing. As such, in 2018, housing prices have begun to stabilize. Similarly, many large Chinese companies have been forced to liquidate leveraged FDI (foreign domestic investment) in the U.S., as the Chinese government continues to discourage the practice. 

Tightenings of Chinese SEO's and corporations also predict a coming industrial slowdown, with decreased capital expenditure and infrastructure development. With secondary industry being one of China's largest GDP components, a large shrinkage of this sector will adversely affect China's growth quite significantly.

<canvas id="gdp-sectors"></canvas>

Given these, we can expect China's growth to slow down to a much slower pace of growth, which is in line with President Xi's outlook. As well, we can expect more default incidents, as consumers and corporations attempt to recover from their overleveraging and overextension of credit. Ultimately, there may be short-term spill-over effects into the U.S. markets as growth decelerates abroad. Major overseas real-estate and construction companies will likely bear the brunt of the turmoil, with their heavy reliance on industry and investment. We may also see continued pullback on FDI into the United States and fewer higher profile mergers. China does not appear to have a very large risk of catatrophic collapse like that of 2008, as governmental regulation has already begun to ease overextension and bad credit worries. 



<script>
  // Household Debt to GDP graph
  var ctx_one = document.getElementById('household-debt-to-gdp').getContext('2d');
  var chart_one = new Chart(ctx_one, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: "Household Debt/GDP",
            backgroundColor: 'rgba(7,180,231, 0.2)',
            borderColor: 'rgb(4,125,161)',
            pointRadius: 5,
            data: [18.74, 17.86, 23.43, 27.25, 27.80, 29.85, 33.34, 35.93, 39.22, 44.87, 48.97],
        }]
    },

    options:{
      title: {
        display: true,
        text: "Household Debt/GDP - [CEIC]",
        fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
        fontStyle: "bold",
        fontSize: "20",
        fontColor: "#000",
        padding: 10,
      },
      legend: {
        display: false,
      },
      pan: {
        enabled: true,
        mode: "xy",
        speed: 10,
        threshold: 5,
      }
    },
  });

  // Housing Prices graph
  var ctx_two = document.getElementById('beijing-housing').getContext('2d');
  var chart_two = new Chart(ctx_two, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["2007","","","", "2008","","","", "2009","","","", "2010","","","", "2011","","","", "2012","","","", "2013","","","", "2014","","","", "2015","","","", "2016","","","", "2017","",""],
        datasets: [{
            label: "Real Residential Property Price: Beijing",
            backgroundColor: 'rgba(7,180,231, 0.2)',
            borderColor: 'rgb(4,125,161)',
            pointRadius: 3,
            data: [90.81,92.78,93.31,94.51,91.96,92.86,93.53,93.84,92.35,93.86,95.85,97.35,98.49,100.87,100.70,99.94,99.26,99.48,98.64,97.74,95.79,95.62,95.66,95.26,95.26,98.31,100.04,100.98,100.79,101.33,98.75,96.05,93.95,94.05,94.04,94.39,93.96,96.96,99.91,102.48,102.60,104.97,105.87],
        }]
    },

    options:{
      title: {
        display: true,
        text: "Residential Property Price Index - [FRED]",
        fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
        fontStyle: "bold",
        fontSize: "20",
        fontColor: "#000",
        padding: 10,
      },
      legend: {
        display: false,
      },
    },
  });

  // Consumer Credit Graph
  var ctx_three = document.getElementById('consumer-credit').getContext('2d');
  var chart_three = new Chart(ctx_three, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["2007","","","", "2008","","","", "2009","","","", "2010","","","", "2011","","","", "2012","","","", "2013","","","", "2014","","","", "2015","","","", "2016","","","", "2017","",""],
        datasets: [{
            label: "Credit (billions)",
            backgroundColor: 'rgba(7,180,231, 0.2)',
            borderColor: 'rgb(4,125,161)',
            pointRadius: 3,
            data: [4220.620,4572.296,4954.479,5074.747,5310.265,5530.086,5689.753,5713.694,6129.725,6768.434,7541.394,8161.159,9278.579,10096.024,10711.210,11209.436,11889.933,12584.904,13121.573,13521.436,14020.250,14643.920,15431.886,16019.384,16989.524,18078.531,19062.991,19686.363,20601.588,21543.230,22305.743,22921.556,23798.911,24856.196,25890.964,26732.590,27969.100,29651.430,31398.410,32954.370,34785.120,36700.920,38620.479],
        }]
    },

    options:{
      title: {
        display: true,
        text: "Credit to Households (bil. of ¥) - [FRED]",
        fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
        fontStyle: "bold",
        fontSize: "20",
        fontColor: "#000",
        padding: 10,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: true,
    },
  });

  // GDP Sectors
  var ctx_four = document.getElementById('gdp-sectors').getContext('2d');
  var chart_four = new Chart(ctx_four, {
    // The type of chart we want to create
    type: 'doughnut',
    data: {
      labels: ["Agriculture", "Industry", "Services"],
      datasets: [{
        data: [8.2,39.5,52.2],
        backgroundColor: [
          'rgba(7,180,231, 0.6)',
          'rgba(231,7,180,0.6)',
          'rgba(180,231,7,0.6)',
        ],
        label: "GDP by Sector",
      }],
    },
    options: {
      title: {
        display: true,
        text: "GDP by Sector (%) - [IndexMundi]",
        fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
        fontStyle: "bold",
        fontSize: "20",
        fontColor: "#000",
        padding: 10,
      },
    }
  });
</script>


