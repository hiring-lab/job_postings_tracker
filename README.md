# Indeed Job Postings Index

This repository contains the data behind the *Indeed Hiring Lab's* Job Postings Index data product. The frequency of the data is daily and it is refreshed each week.

## Methodology

The data in this repository are the percentage change in seasonally-adjusted job postings since February 1, 2020, using a seven-day trailing average. February 1, 2020, is our pre-pandemic baseline. A reading of 101 signifies the overall level of job postings is 1% higher than the level on February 1, 2020.

We seasonally adjust each series daily using [methodology developed by the Deutsche Bundesbank for daily time series data](https://www.bundesbank.de/resource/blob/763892/f5cd282cc57e55aca1eb0d521d3aa0da/mL/2018-10-17-dkp-41-data.pdf). Projected seasonal factors for the latest calendar year are based on estimates taken from the preceding three years. Each series, including the national trend, occupational sectors, and sub-national geographies, is seasonally adjusted separately. We adopted this new methodology in November 2024. Historical numbers have been revised and may differ from previously reported values.

The occupational sectors in our data are an Indeed categorization based on normalized job titles. A list of those job sectors along with sample job titles is available in this repository (see `sector-job-title-examples.csv`).

Changes to the data can be followed under the "What's New" section of the Hiring Lab Data Portal: [data.indeed.com/whats-new](https://data.indeed.com/#/whats-new). For Frequently Asked Questions regarding Indeed's data, visit [hiringlab.org/indeed-data-faq](https://www.hiringlab.org/indeed-data-faq/).

## Data Schema

Each country covered by a Hiring Lab economist has a folder in this repo, containing some combination of country/sector/region-level data.

### Country-level

Filename: `aggregate_job_postings_{country_code}.csv`

Data dictionary:

| variable                      | definition                                                                          |
|-------------------------------|-------------------------------------------------------------------------------------|
| date                          | Date of observation                                                                 |
| jobcountry                    | Two-character [ISO 3166-1 alpha-2 country code](https://www.iban.com/country-codes) |
| indeed_job_postings_index_SA  | % change in seasonally-adjusted postings since February 1, 2020                     |
| indeed_job_postings_index_NSA | % change in non-seasonally adjusted postings since February 1, 2020                 |
| variable                      | Total or new (on Indeed for 7 days or fewer) job postings                           |

### Sector-level

Filename: `job_postings_by_sector_{country_code}.csv`

Data dictionary:

| variable                  | definition                                                                          |
|---------------------------|-------------------------------------------------------------------------------------|
| date                      | Date of observation                                                                 |
| jobcountry                | Two-character [ISO 3166-1 alpha-2 country code](https://www.iban.com/country-codes) |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020                     |
| variable                  | total or new (on Indeed for 7 days or fewer) job postings                           |
| display_name              | Occupational sector label                                                           |

N.B. we do not share sectoral data for Ireland.

### Region-level

For certain markets, we also share sub-national job postings trends:

| country       | geography                                                          | filename                    |
|---------------|--------------------------------------------------------------------|-----------------------------|
| United States | US metropolitan areas with a population of at least 500,000 people | `metro_job_postings_us.csv` |
| United States | US states and the District of Columbia | `state_job_postings_us.csv` |
| Canada | Canadian provinces | `provincial_postings_ca.csv` |
| United Kingdom | UK region | `regional_postings_gb.csv` |
| United Kingdom | UK city | `city_postings_gb.csv` |

#### US metro areas

| variable                  | definition                                                      |
|---------------------------|-----------------------------------------------------------------|
| date                      | Date of observation                                             |
| CBSA Title                | Core-based statistical area (CBSA) label                        |
| cbsa_code                 | Core-based statistical area (CBSA) code                         |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020 |

#### US states

| variable                  | definition                                                      |
|---------------------------|-----------------------------------------------------------------|
| date                      | Date of observation                                             |
| state                     | Two character US state abbreviation                             |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020 |

#### CA provinces

| variable                  | definition                                                      |
|---------------------------|-----------------------------------------------------------------|
| date                      | Date of observation                                             |
| province                  | Two character CA province abbreviation                          |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020 |

#### UK regions

| variable                  | definition                                                      |
|---------------------------|-----------------------------------------------------------------|
| date                      | Date of observation                                             |
| region                    | Region label                                                    |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020 |

#### UK cities

| variable                  | definition                                                      |
|---------------------------|-----------------------------------------------------------------|
| date                      | Date of observation                                             |
| cities                    | City label                                                      |
| indeed_job_postings_index | % change in seasonally-adjusted postings since February 1, 2020 |

## Licence

The data generated by *Indeed Hiring Lab* are available under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

The data and files that we have generated are freely available for public use, as long as *Indeed Hiring Lab* is cited as a source.

## Disclaimer

Hiring Lab constantly strives to deliver real-time, high-quality data on global labor markets.  As part of this effort, we periodically reevaluate the methodology behind our various data products in response to changes to Indeed products, strategy, data platforms, data sources and/or internal quality control procedures. Methodologies may also change in part to ensure reliability, replicability and/or representativeness in the underlying data behind our data products. Our aim is always to be as transparent as possible regarding the timing and scope of any changes.

The number of job postings on Indeed.com, whether related to paid or unpaid job solicitations, is not indicative of potential revenue or earnings of Indeed, which comprises a significant percentage of the HR Technology segment of its parent company, Recruit Holdings Co., Ltd. Job posting numbers are provided for information purposes only and should not be viewed as an indicator of performance of Indeed or Recruit. Please refer to the Recruit Holdings investor relations website and regulatory filings in Japan for more detailed information on revenue generation by Recruit’s HR Technology segment.

## About Hiring Lab

[Indeed Hiring Lab](https://hiringlab.org) creates innovative data insights on the global labor market that inspire new conversations about the state of work. As the economic research arm of [Indeed](https://www.indeed.com/), the world's number one job site, Hiring Lab is driven by a team of leading economists and data scientists who provide real-time thought leadership on global labor market conditions, including hiring trends, salary information, popular skills, and employer benefits. Hiring Lab analyzes millions of data points across time collected from Indeed's proprietary job postings, resumes, and job seeker behaviors to reveal emerging trends in the United States and across the world.

The unique insights generated by Hiring Lab inform talent management, employment, and labor policy decisions for businesses, researchers, academics, and job seekers alike. Hiring Lab partners with a range of policy-making organizations and NGOs including the International Monetary Fund, the European Central Bank, and the Bank of Canada to produce timely, incisive research. Hiring Lab data is also regularly cited in prominent business publications such as The Wall Street Journal, CNN, Reuters, The Globe and Mail, Der Spiegel, and The Financial Times. Hiring Lab economists regularly speak about labor market trends at leading industry, policy, and academic conferences.

Indeed has websites in over 60 markets and 28 languages. Our economists have a deep knowledge of the factors that affect global markets and are based across the world in the United States, Canada, the United Kingdom, Ireland, Germany, France, Japan, and Australia.

If you are interested in data about other markets, please contact us at <hiringlabinfo@indeed.com>.
