# Indeed Hiring Lab Data

The [Indeed Hiring Lab](http://hiringlab.org) is an international team of economists and researchers dedicated to delivering insights that help drive the global labor market conversation.

This GitHub repo is intended to serve as a space to host various regularly updated data series to help economists, journalists, and other interested parties better understand the labor market conditions in their countries.

The data here will be updated after the Hiring Lab posts their tracker for the given country. Typically, the tracker is posted every Tuesday for Canada and the United States, and every other Tuesday for Australia, France, Germany, Ireland and the United Kingdom.

Indeed has websites in over 60 markets and 28 languages.  The full list of markets is here: https://www.indeed.com/worldwide.  We have economists in Australia, Canada, France, Germany, UK/Ireland, and the US. If you are interested in data about other markets, please don't hesitate to contact us at hiringlabinfo@indeed.com.

For Frequently Asked Questions regarding Indeed's data, click [here](https://www.hiringlab.org/indeed-data-faq/).

# Data Schema

There are two main types of job posting metrics that we are publishing here.

The first is job posting levels indexed to Feburary 01. 

There are several types of data series published in this repo:

* **% change in postings trend (i.e. YoY_new_postings_trend_ratio_US.csv)**: To measure the trends in job postings, we calculated the 7-day moving average of the number of US job postings on Indeed. We index each day’s 7-day moving average to February 1 of that year(Feb 1, 2020 = 100 for 2020 data, and so on). We report how the trend in job postings this year differs from last year, in order to focus on the recent changes in labor market conditions due to COVID-19. For example: if job postings for a country increased 30% from February 1, 2019, to May 8, 2019, but only 20% from February 1, 2020, to May 8, 2020, then the index would have risen from 100 to 130 in 2019 and 100 to 120 in 2020. The year-to-date trend in job postings would therefore be down 7.7% on May 8 (120 is 7.7% below 130) in 2020 relative to 2019. 

* **% change in new postings trend (i.e. YoY_new_postings_trend_ratio_US.csv)**: For new postings, we calculate a similar metric but the underlying measure is the number of postings that have been on Indeed for seven days or less.

* **Feb 01 indexed trend (i.e. postings_category_index_US.csv)**: This is a series of the data before the year over year ratio from the above is calculated. It allows for a visualization that shows (instead of tells) the difference between 2020 and the previous years.

* **metro_pct_gap_in_trend.csv**: This is a series that replicates the % change in postings trend from above, but broken out by US metro area. The top 52 metro areas by population are included.

* **state_indexed.csv** Same as above, but for U.S. states.

