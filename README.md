# googleAppKits

## Motivation

> Learn how to create telegram bot
>
> Learn how to create LINE bot (NEW)
> 
> Automate daily report routine work
>
> Develop tools using GAS (Google App Script) and its suites.

### Learn how to create telegram bot

Telegram bot creation is easy. There are results in the google search
everywhere and it's free of charge for now. 

TODO: Investigate its pricing policy.


### Learn how to create LINE bot

Comparing to Telegram bot, it costs me a bit more time to dig into others blog
to find out how to retrieve target ID (e.g., room, group, user) to make sure my
message is sent to the right place. However, it has better web interface to
tweak the configuration for your bot.

TODO: Investigate its pricing policy.

### Automate daily report routine work

We need to do daily report for 每日一善 and we used to do that manually with tedious process through submission of filled google form, manipulation on google spreadsheet to gather datasets and post result to Telegram chat room at specific timeslot. Here, we try to leverage GAS combining with its studio suites and telegram bot to assist our work. There are two phases of works in the following:

#### Phase I
Hook up Telegram bot to report analytics data to specific chat room daily in a certain time.

Send out same report to specific LINE chat room.

Use GAS to do the math and gather needed data from google spreadsheet.

#### Phase II
Send message to Telegram bot so that it could fill up google form on behalf of
us based on our input to make our life easier.

### Develop tools using GAS (Google App Script) and its suites.

Currently, we use google form and spreadsheet to do our work. An additional GAS
to link with Telegram bot and create webhook.

## Future improvement

Some validation checks to consolidate the workflow.
> Make sure user input valid number into the field. (cause it will break the flow if it has non numeric value)
>

Hook up Dialogflow to make our bot smarter.
