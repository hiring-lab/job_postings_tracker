# Indeed Job Postings Index data

*Effective Sept. 17, a New York pay transparency law requires employers to disclose certain salary information in job postings for roles that will be performed in the state. On Indeed's site, job postings in New York that do not include employer-provided pay information will not be visible until pay information is added or employers indicate the job is exempt. Indeed Job Postings Index data published Sept. 22, 2023, is the first to cover this period, and users may notice that the level of job postings in New York state has fallen sharply compared to prior versions. In the past, similar declines have been observed in states that have implemented comparable salary transparency regulations. In order for our real-time data to accurately reflect changes in job postings activity related to the newly enacted law, we are intentionally not adjusting the New York series. Hiring Lab will continue to monitor the impact of pay transparency laws on the labor market and publish the Job Postings Index as scheduled.*

As of 12/9/2022, Hiring Lab is re-releasing the Job Postings Tracker as the Indeed Job Postings Index.  The level is set to 100 on Feb 1, 2020. More detail is available here: [Introducing the Indeed Job Postings Index](https://www.hiringlab.org/2022/12/15/introducing-the-indeed-job-postings-index/) 

The [Indeed Hiring Lab](http://hiringlab.org) is an international team of economists and researchers dedicated to delivering insights that help drive the global labor market conversation.

This GitHub repo is intended to serve as a space to host various regularly-updated data series to help economists, journalists, and other interested parties better understand the labor market conditions in their countries.

Indeed has websites in over 60 markets and 28 languages.  The full list of markets is here: https://www.indeed.com/worldwide.  We have economists in Australia, Canada, France, Germany, UK/Ireland, and the US. If you are interested in data about other markets, please contact us at hiringlabinfo@indeed.com.

The occupational sectors in our data are an Indeed categorization based on normalized job titles. A list of those job sectors along with sample job titles is available in this repository.

The job postings data will be updated weekly, with the exact timing during the week depending upon Hiring Lab’s publication schedule. Our plan is to publish the trackers in all markets every other week, though that is subject to change.

For Frequently Asked Questions regarding Indeed's data, click [here](https://www.hiringlab.org/indeed-data-faq/).

## Job Postings
### Methodology

The data in this repository are the percentage change in seasonally-adjusted job postings since February 1, 2020, using a seven-day trailing average. February 1, 2020, is our pre-pandemic baseline. We seasonally adjust each series based on historical patterns in 2017, 2018, and 2019. Each series, including the national trend, occupational sectors, and sub-national geographies, is seasonally adjusted separately. We adopted this new methodology in January 2021. Historical numbers have been revised and may differ from originally reported values. Non-seasonally adjusted data is included for total postings.

The number of job postings on Indeed.com, whether related to paid or unpaid job solicitations, is not indicative of potential revenue or earnings of Indeed, which comprises a significant percentage of the HR Technology segment of its parent company, Recruit Holdings Co., Ltd. Job posting numbers are provided for information purposes only and should not be viewed as an indicator of performance of Indeed or Recruit. Please refer to the Recruit Holdings investor relations website and regulatory filings in Japan for more detailed information on revenue generation by Recruit’s HR Technology segment.

### Data Schema

Each market covered by a Hiring Lab economist has a folder in this repo. Each folder contains the following files:

* **aggregate_job_postings_{country_code}.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings and new jobs postings (on Indeed for 7 days or fewer) for that market, as well as non-seasonally adjusted postings since February 1, 2020 for total job postings.

* **job_postings_by_sector_{country_code}.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for occupational sectors for that market. We do not share sectoral data for Ireland.

For certain markets, we also share subnational job postings trends. In the United States, we provide:

* **metro_job_postings_us.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings in US metropolitan areas with a population of at least 500,000 people.

* **state_job_postings_us.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings in the US states and the District of Columbia.

In Canada, we provide:

* **provincial_postings_ca.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings in each Canadian provinces.

In the United Kingdom, we provide:

* **regional_postings_gb.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings in each region in the UK. 

* **city_postings_gb.csv**
This file contains the % change in seasonally-adjusted postings since February 1, 2020 for total job postings in each city in the UK. 

## Licence

The data generated by *Indeed Hiring Lab* are available under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

The data and files that we have generated are freely available for public use, as long as Hiring Lab is cited as a source.
