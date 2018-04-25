---
title: Cloudflare vs Google DNS
date: '2018-04-24'
tags:
  - DNS
  - networking
  - statistics
author: Felix Jen
require:
  - chartjs
  - latex
draft: false
type: post
---

On March 31st, 2018, Cloudflare pulled the ultimate April Fool's prank. Cloudflare, the world's largest and leading content delivery network, partnered with APNIC (Asia-Pacific Network Information Centre) to create two new public DNS resolvers, on 1.1.1.1 and 1.0.0.1. Only thing is, this wasn't an April Fool's prank. This was real. Cloudflare pulled this stunt to the everyone's shock and is now in the leagues of Google DNS, OpenDNS, and other DNS providers. Cloudflare claims that their DNS service will speed up your internet, but let's put that claim to the test.

## What is DNS?

For the uninitiated, DNS, or Domain Name Service, is the service that translates your typical web URL (like google.com) into an IP address, that your web browser can actually use to find the website. When you want to access a website via the URL that your computer does not know already, it has to asks its DNS server what the IP address is, before it can actually do anything. This typically takes around 20-50ms depending on your DNS server and internet speed. Thus, theoretically, if your DNS server was faster, your internet would be somewhat faster as well. 

The reason consumers don't see DNS frequently however, is that most of them are already set to either your ISP's DNS (typical) or an existing public DNS server, like those offered by Google (8.8.8.8). Now with Cloudflare on the scene, we'll look at whether it may be actually beneficial to change your existing DNS server over.

## By the Numbers

To test Cloudflare's claims, I used the power of the power of [RIPE Atlas](https://atlas.ripe.net), a distributed network of over ten thousand "probes" around the globe, each capable of running their own independent internet benchmarks, from real-world networks. Many of these probes are placed in residential networks, in people's houses. There are also very many in data centers around the globe. To gather data, I enlisted 1000 random RIPE Atlas probes across the United States (sorry international folks!) to run their built-in DNS measurement against two DNS servers, 1.1.1.1 (Cloudflare) and 8.8.8.8 (Google). Each of these probes returned a RTT (round-trip-time) for the DNS request, essentially the amount of time a typical DNS request would take.

### Random Sample

Given the way RIPE Atlas structure's their network of probes, the amount of probes is weighted by population in each geographical location. This means that the sample used will have more probes in places like Los Angeles and New York, than somewhere like Kansas. RIPE Atlas simple has more probes in more densely populated areas, and therefore, a random sample within the United States will reflect that. As well, each probe may be hooked to a different type of network (data center vs. residential, cable vs. fiber, etc...). Unfortunately, this can not be realistically controlled for and still receive enough data for statistical analysis. This, however, is offset by the sheer number of data points gathered. As well, this will allow for a more holistic analysis, as opposed to merely looking at a single market segment. 

## Results

We can compare the results of these 1,000 probes below. Note that the totals do not add up to 1,000 as some probes failed to respond to the instructions given, and were therefore excluded from the data set. Displayed below is a frequency distribution of RTT's for each DNS server, in intervals of 10ms. As well, major outliers (those with RTT > 200) were eliminated for comparability. Both data sets (Google )

<div class="canvas-div"><canvas id="frequency-dist"></canvas></div>
<div class="frequency-buttons">
    <p id="cf-button" class="current-button-fqd" onclick="cf_freq()">Cloudflare</p>
    <p id="google-button" onclick="google_freq()">Google</p>
</div>

<br>

The frequency distribution is broken down below in tabular form. 

<table id="frequency-table">
<tr>
    <th>Lower Bound</th>
    <th>Upper Bound</th>
    <th>Cloudflare</th>
    <th>Google</th>
</tr>
<tr>
    <td>0</td>
    <td>10</td>
    <td>227</td>
    <td>241</td>
</tr>
<tr>
    <td>10</td>
    <td>20</td>
    <td>346</td>
    <td>326</td>
</tr>
<tr>
    <td>20</td>
    <td>30</td>
    <td>142</td>
    <td>180</td>
</tr>
<tr>
    <td>30</td>
    <td>40</td>
    <td>66</td>
    <td>74</td>
</tr>
<tr>
    <td>40</td>
    <td>50</td>
    <td>16</td>
    <td>25</td>
</tr>
<tr>
    <td>50</td>
    <td>60</td>
    <td>24</td>
    <td>25</td>
</tr>
<tr>
    <td>60</td>
    <td>70</td>
    <td>39</td>
    <td>32</td>
</tr>
<tr>
    <td>70</td>
    <td>80</td>
    <td>17</td>
    <td>20</td>
</tr>
<tr>
    <td>80</td>
    <td>90</td>
    <td>7</td>
    <td>15</td>
</tr>
<tr>
    <td>90</td>
    <td>100</td>
    <td>5</td>
    <td>9</td>
</tr>
<tr>
    <td>100</td>
    <td>110</td>
    <td>2</td>
    <td>2</td>
</tr>
<tr>
    <td>110</td>
    <td>120</td>
    <td>1</td>
    <td>1</td>
</tr>
<tr>
    <td>120</td>
    <td>130</td>
    <td>4</td>
    <td>1</td>
</tr>
<tr>
    <td>130</td>
    <td>140</td>
    <td>3</td>
    <td>1</td>
</tr>
<tr>
    <td>140</td>
    <td>150</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>150</td>
    <td>160</td>
    <td>1</td>
    <td>3</td>
</tr>
<tr>
    <td>160</td>
    <td>170</td>
    <td>1</td>
    <td>1</td>
</tr>
<tr>
    <td>170</td>
    <td>180</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>180</td>
    <td>190</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>190</td>
    <td>200</td>
    <td>2</td>
    <td>1</td>
</tr>
</table>

## Further Breakdown

Looking at the data, we can see there are two "discrete" distributions at play, from range, 0 to 30, and from 40 to 90. These distributions act somewhat independently and can be broken down further into their own frequency distributions. Specifically, we will focus on the lower end of the distribution, with RTT's less than 40ms, as that appears to be the bulk of our data. **Note that the number of observations for Cloudflare is 781, where for Google, it is 821.**

<div class="canvas-div"><canvas id="frequency-dist-fourty"></canvas></div>
<div class="frequency-buttons">
    <p id="cf-button-fourty" class="current-button-fqd" onclick="cf_freq_fourty()">Cloudflare</p>
    <p id="google-button-fourty" onclick="google_freq_fourty()">Google</p>
</div>

<br>

Let's equate the sample sizes of Cloudflare and Google, using the number of observations from Cloudflare as the baseline. Essentially, we are taking the first 781 observations.

<div class="canvas-div"><canvas id="frequency-dist-fourty-2"></canvas></div>
<div class="frequency-buttons">
    <p id="cf-button-fourty-2" class="current-button-fqd" onclick="cf_freq_fourty_2()">Cloudflare</p>
    <p id="google-button-fourty-2" onclick="google_freq_fourty_2()">Google</p>
</div>

<br>

## Initial Insights

Looking at the initial 1,000 samples, there does not appear to be a clear difference between Google and Cloudflare, as their overall performance is roughly the same. The initial sample has frequency buckets of 20ms, and it was pretty unlikely that the performance difference between the two DNS servers exceeded 20ms. However, when we broke the data down further, looking only at the interval from 0ms to 40ms, we see a very different story. From the number of observations alone, we see that Google had more observations below 40ms (approximately 4%). This already suggests that Google's performs somewhat more consistently. Normalizing both data sets to 781 observations (the number of Cloudflare observations below 40ms), we finally get some great insight. Clearly, Google's DNS had many more observations in the 18ms to 32ms range. This essentially is compressing Cloudflare's data set and shows that Google's may have much less spread in variability. However, Cloudflare did have more samples in the under 18ms range, so it may still be faster overall.

## Descriptive Statistics

Now that we have laid out the initial frequencies of the results, we can dive deeper into the descriptive statistics. Looking first at the overall data set, we arrive at the following data.

<table>
<tr>
    <th>Statistic</th>
    <th>Cloudflare</th>
    <th>Google</th>
</tr>
<tr>
    <td>Observations</td>
    <td>963</td>
    <td>963</td>
</tr>
<tr>
    <td>Mean</td>
    <td>23.073</td>
    <td>23.540</td>
</tr>
<tr>
    <td>Standard Dev.</td>
    <td>23.772</td>
    <td>23.104</td>
</tr>
<tr>
    <td>Minimum</td>
    <td>0.629</td>
    <td>0.627</td>
</tr>
<tr>
    <td>1st. Quartile</td>
    <td>9.925</td>
    <td>9.922</td>
</tr>
<tr>
    <td>Median</td>
    <td>15.694</td>
    <td>16.578</td>
</tr>
<tr>
    <td>3rd. Quartile</td>
    <td>26.444</td>
    <td>27.477</td>
</tr>
<tr>
    <td>Maximum</td>
    <td>199.535</td>
    <td>198.336</td>
</tr>
<tr>
    <td>Skewness (Fisher)</td>
    <td>2.839</td>
    <td>2.558</td>
</tr>
<tr>
    <td>Kurtosis (Fisher)</td>
    <td>11.557</td>
    <td>9.444</td>
</tr>
</table> 

<br>

Next, looking at the results with a RTT <40ms, we have the following summary, which is much more useful.

<table>
<tr>
    <th>Statistic</th>
    <th>Cloudflare</th>
    <th>Google</th>
    <th>Google Norm</th>
</tr>
<tr>
    <td>Observations</td>
    <td>781</td>
    <td>821</td>
    <td>781</td>
</tr>
<tr>
    <td>Mean</td>
    <td>15.349</td>
    <td>15.790</td>
    <td>14.717</td>
</tr>
<tr>
    <td>Standard Dev.</td>
    <td>9.146</td>
    <td>9.338</td>
    <td>8.236</td>
</tr>
<tr>
    <td>Minimum</td>
    <td>0.629</td>
    <td>0.627</td>
    <td>0.627</td>
</tr>
<tr>
    <td>1st. Quartile</td>
    <td>8.594</td>
    <td>8.977</td>
    <td>8.653</td>
</tr>
<tr>
    <td>Median</td>
    <td>14.201</td>
    <td>14.437</td>
    <td>13.912</td>
</tr>
<tr>
    <td>3rd. Quartile</td>
    <td>20.926</td>
    <td>21.965</td>
    <td>20.639</td>
</tr>
<tr>
    <td>Maximum</td>
    <td>39.790</td>
    <td>39.913</td>
    <td>33.011</td>
</tr>
<tr>
    <td>Skewness (Fisher)</td>
    <td>0.556</td>
    <td>0.481</td>
    <td>0.264</td>
</tr>
<tr>
    <td>Kurtosis (Fisher)</td>
    <td>-0.296</td>
    <td>-0.433</td>
    <td>-0.759</td>
</tr>
</table>

<br>

Comparing Cloudflare and Google normalized, we see that Google's has much less variability and overall being faster than Cloudflare. 

## Inferential Statistics

While descriptive statistics may be fun, the real value from this data set comes from interential statistics. We'll be skipping inferential statistics on the overall data set, as I promise you, it is absolutely useless and gives no additional value. You are free to run it yourself if you wish. We will be focusing on the first 781 observations on both Google and Cloudflare instead. 

To compare these two data sets, we'll run the alternative hypothesis that Cloudflare is faster than Google, $\mu\_\{cf\} < \mu\_\{g\}$ versus the null hypothesis that Cloudflare is **not** faster than Google, $\mu\_\{cf\} \not< \mu\_{g}$. Performing this 2-sample t-test on the data sets, we obtain the following results.

<table>
<tr>
    <th></th>
    <th>Value</th>
</tr>
<tr>
    <td>Difference</td>
    <td>0.631</td>
</tr>
<tr>
    <td>t (Observed)</td>
    <td>1.434</td>
</tr>
<tr>
    <td>t (Critical)</td>
    <td>-1.646</td>
</tr>
<tr>
    <td>D.o.F.</td>
    <td>1560</td>
</tr>
<tr>
    <td>p-value (one-way)</td>
    <td>0.924</td>
</tr>
</table>

<br>

Initially, the ridiculously high p-value jumps out, suggesting that we have actually inverted this test. We can clearly conclude that we can not reject the null, $\mu\_\{cf\} \not< \mu\_{g}$. However, for insight, we ran the opposite test, that Google was faster than Cloudflare, $\mu\_\{cf\} > \mu\_\{g\}$, against the same null. Results are displayed below.

<table>
<tr>
    <th></th>
    <th>Value</th>
</tr>
<tr>
    <td>Difference</td>
    <td>0.631</td>
</tr>
<tr>
    <td>t (Observed)</td>
    <td>1.434</td>
</tr>
<tr>
    <td>t (Critical)</td>
    <td>1.646</td>
</tr>
<tr>
    <td>D.o.F.</td>
    <td>1560</td>
</tr>
<tr>
    <td>p-value (one-way)</td>
    <td>0.076</td>
</tr>
</table>

<br>

To anyone versed in statistics, this result should surprise no one. The p-value for this alternative hypothesis is merely $1 - p\_{previous}$. We can see that the p-value **is** significant at $\alpha = 10\%$. This is a surprising result, given that Cloudflare claims to be faster. However, just looking at the data we have here, it appears that **Google is actually doing better**. Whether we attribute this to a fluke of the data or Google actually being slightly faster is left as an exercise to the reader.

## Conclusions

From all the examination of the data we did, we really arrive at an anti-climatic conclusion of sorts. In the frequency distributions, we saw both DNS resolvers performning similarly if looking at the entire spectrum. However, broken down, it appears that Google's resolvers fair better and are more consistent on the lower end of the spectrum. Our 2-sample t-tests do confirm this belief that Google is actually faster on the lowest 781 observations. **However, our results are tempered by the fact that Google's resolvers are only 0.6ms faster on average.** This is an extremely neglible difference and is basically invisble to the user in the grand scheme of things.

### Benefits of Cloudflare's DNS

Now that we ultimately concluded that both resolvers are *practically* equally fast from the data, we can example the more quantitative aspects of each. Cloudflare's DNS offers a few key "advantages" over Google's DNS in that it:

* Keeps records for only 24 hours of queries run
* Offers DNS-over-TLS
* Offers DNS-over-HTTPS
* More resistant to DDOS attacks

While most of these benefits sound nice, most of them don't really impact much anyways. For those who are privacy conscious, the log rotation is nice. But, if you are truly privacy conscious, you should be using a VPN anyways. Some even offer their own DNS resolvers to increase privacy of their users. Cloudflare's offerings of DNS-over-*something* is also nice to have. However, most, if not all, implementations of either of the two standards offered is poor or nonexistant on the popular operating systems. Currently, Windows and Mac both require third party software to take advantage of those protocols, and even then, suport is rather poor. Finally, while Google has been victim to DDOS attacks in the past, those are few and far in the between. As well, users typically do not only have a single DNS server listed, so DDOS's on one would not matter too much. 

## Cloudflare, why?

One thing we haven't touched on yet is Cloudflare's unique choice of IP address for one of their primary resolvers, 1.1.1.1. Previously, 1.1.1.1 was owned by APNIC (and still is, actually). However, nothing ran on 1.1.1.1, since the inception of the World Wide Web, and assuming the trend would continue, many systems and network adminstrators assumed the IP as "unroutable." This is in violation of the actual IP standard though, which did not actually preclude 1.1.1.1 from being routable. 

This presents itself with an interesting debacle. Currently, there is large amounts of junk traffic being directed at 1.1.1.1 as admins all over use it for scripts or whatnot. Now that Cloudflare actually is using 1.1.1.1, some admins, and even equipment manufacturers, are scrambling to change their configurations. While the admins have *technically* violated the existing IP standard by asssuming the address would never be used, should Cloudflare really have chosen that IP to work with? While the technical standard is there and set in stone, the *effective* and *widely-believed* standard is that the address *is* unusuable. Cloudflare just came and upturned this entire convention. Cloudflare could have chosen any other IP it wanted, but they opted to choose the one which would cause the most headache. Cloudflare, why?

<script>
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;

    // Frequency Distribution
    var ctx_one = document.getElementById('frequency-dist').getContext('2d');
    var chart_one = new Chart(ctx_one, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190],
            datasets: [{
                label: "Frequency",
                backgroundColor: 'rgba(7,180,231, 0.6)',
                borderColor: 'rgb(4,125,161)',
                pointRadius: 5,
                data: [227,346,142,66,16,24,39,17,7,5,2,1,4,3,0,1,1,0,0,2],
            }]
        },

        options:{
            title: {
                display: true,
                text: "RTT Time (Cloudflare)",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: false
            },
    });

    // Frequency Distribution <40
    var ctx_two = document.getElementById('frequency-dist-fourty').getContext('2d');
    var chart_two = new Chart(ctx_two, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38],
            datasets: [{
                label: "Frequency",
                backgroundColor: 'rgba(7,180,231, 0.6)',
                borderColor: 'rgb(4,125,161)',
                pointRadius: 5,
                data: [31,53,54,46,43,70,86,75,69,46,34,34,33,20,21,13,16,19,13,5],
            }]
        },

        options:{
            title: {
                display: true,
                text: "RTT Time <40 (Cloudflare)",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
        },
    });

        // Frequency Distribution <40
    var ctx_three = document.getElementById('frequency-dist-fourty-2').getContext('2d');
    var chart_three = new Chart(ctx_three, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38],
            datasets: [{
                label: "Frequency",
                backgroundColor: 'rgba(7,180,231, 0.6)',
                borderColor: 'rgb(4,125,161)',
                pointRadius: 5,
                data: [31,53,54,46,43,70,86,75,69,46,34,34,33,20,21,13,16,19,13,5],
            }]
        },

        options:{
            title: {
                display: true,
                text: "RTT Time <40 (Cloudflare)",
                fontFamily: "'Lato','Helvetica Neue',Helvetica,sans-serif",
                fontStyle: "bold",
                fontSize: "20",
                fontColor: "#000",
                padding: 10,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
        },
    });

    function replaceData(chart, replacement, title) {
        chart.data.datasets[0].data = replacement;
        chart.options.title.text = title;
        chart.update();
    }
    function google_freq() {
        var replacement_data = [241,326,180,74,25,25,32,20,15,9,2,1,1,1,0,3,1,0,0,1];
        replaceData(chart_one, replacement_data, "RTT Time (Google)");
        document.getElementById("cf-button").classList.remove("current-button-fqd");
        document.getElementById("google-button").classList.add("current-button-fqd");
    }
    function cf_freq() {
        var replacement_data = [227,346,142,66,16,24,39,17,7,5,2,1,4,3,0,1,1,0,0,2];
        replaceData(chart_one, replacement_data, "RTT Time (Cloudflare)");
        document.getElementById("cf-button").classList.add("current-button-fqd");
        document.getElementById("google-button").classList.remove("current-button-fqd");
    }

    function google_freq_fourty() {
        var replacement_data = [46,35,58,45,57,68,85,69,50,54,50,39,38,28,25,20,17,14,12,11];
        replaceData(chart_two, replacement_data, "RTT Time <40 (Google)");
        document.getElementById("cf-button-fourty").classList.remove("current-button-fqd");
        document.getElementById("google-button-fourty").classList.add("current-button-fqd");
    }
    function cf_freq_fourty() {
        var replacement_data = [31,53,54,46,43,70,86,75,69,46,34,34,33,20,21,13,16,19,13,5];
        replaceData(chart_two, replacement_data, "RTT Time <40 (Cloudflare)");
        document.getElementById("cf-button-fourty").classList.add("current-button-fqd");
        document.getElementById("google-button-fourty").classList.remove("current-button-fqd");
    }

    function google_freq_fourty_2() {
        var replacement_data = [46,35,58,45,57,68,85,69,50,54,50,39,38,28,25,20,14,0,0,0];
        replaceData(chart_three, replacement_data, "RTT Time <40 (Google) [Norm]");
        document.getElementById("cf-button-fourty-2").classList.remove("current-button-fqd");
        document.getElementById("google-button-fourty-2").classList.add("current-button-fqd");
    }
    function cf_freq_fourty_2() {
        var replacement_data = [31,53,54,46,43,70,86,75,69,46,34,34,33,20,21,13,16,19,13,5];
        replaceData(chart_three, replacement_data, "RTT Time <40 (Cloudflare)");
        document.getElementById("cf-button-fourty-2").classList.add("current-button-fqd");
        document.getElementById("google-button-fourty-2").classList.remove("current-button-fqd");
    }
</script>

<style>
.frequency-buttons {
    width: 100%;
    height: 50px;
}

.frequency-buttons p {
    display: inline-block;
    width: 49%;
    text-align: center;
    font-weight: bold;
    padding: 8px 0px;
    border: 2px solid rgba(4,125,161, 0.6);
    border-radius: 5px;
    cursor: pointer;
}

.current-button-fqd {
    background-color: rgb(4,125,161) !important;
    color: white;
    transition: 1s;
    -webkit-transition: 0.5s;
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