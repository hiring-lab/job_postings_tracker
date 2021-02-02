# Indeed Hiring Lab Data

The [Indeed Hiring Lab](http://hiringlab.org) is an international team of economists and researchers dedicated to delivering insights that help drive the global labor market conversation.

This GitHub repo is intended to serve as a space to host various regularly updated data series to help economists, journalists, and other interested parties better understand the labor market conditions in their countries.

The data here will be updated after the Hiring Lab posts their tracker for the given country. Our plan is to publish the trackers every other week.

Indeed has websites in over 60 markets and 28 languages.  The full list of markets is here: https://www.indeed.com/worldwide.  We have economists in Australia, Canada, France, Germany, UK/Ireland, and the US. If you are interested in data about other markets, please don't hesitate to contact us at hiringlabinfo@indeed.com.

For Frequently Asked Questions regarding Indeed's data, click [here](https://www.hiringlab.org/indeed-data-faq/).

# Methodology

All figures in this repository are the percentage change in seasonally-adjusted job postings since February 1, 2020, using a 7-day trailing average. February 1, 2020, is our pre-pandemic baseline. We seasonally adjust each series based on historical patterns in 2017, 2018, and 2019. Each series, including the national trend, occupational sectors, and sub-national geographies, is seasonally adjusted separately.

We switched to this new methodology in January 2021 and now report all historical data using this new methodology. Historical numbers have been revised and may differ significantly from originally reported values. The new methodology applies a detrended seasonal adjustment factor to the percentage change in job postings. In contrast, our previous methodology used the 2019 change between February 1 and the reported date as the adjustment factor, which implicitly included both a seasonality component and the underlying trend.

For nearly all series, job postings trended upward in 2019. The new methodology no longer subtracts out the underlying 2019 trend, so most historical figures are higher (i.e. less negative relative to the February 1, 2020 baseline) with the new methodology than originally reported.

# Data Schema

Each market covered by a Hiring Lab economist has a folder in this repo. Each folder contains the following files:

* **total_job_postings_{country_code}.csv**: This file contains the % change in seasonally-adjusted total job postings since February 1, 2020 for that market.

*Note: We will be adding more files to these folders in the weeks ahead*
