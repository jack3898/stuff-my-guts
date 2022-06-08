# Meal Ideas

NOTE: Meal Ideas is currently a work in progress!

Meal Ideas is an app that intelligently plans your dinners for the next 7 days.

## How does it work

It will ask you to put in as many meals as possible, and will ask you questions about each one like:

-   How easy is it to cook on a scale of 1 to 5?
-   How quick is it to cook on a scale of 1 to 5?
-   Who likes/dislikes the meal?
-   When would be the best time to cook this meal? E.g. Sundays/Christmas for roasts, winter for a casserole.
-   Would you like to specify ingredients?
    -   This will help you prepare the right amount of ingredients for the next 7 days!

## Logging in

The app will not have its own login system and instead will rely on OAuth. This vastly increases the security of the users, as passwords will never be stored in our database (only the OAuth token).

OAuth will also have next to no permissions to your provider account, so if it is compromised your account will still be safe and you have the option to reject access to the app and generate a new token.

It's also less for me to get wrong with the login system!

## PWA only

The app will not be on the Play Store or Apple App Store but will instead be available by going to a website. The website will be PWA compliant which means that you can install it as an app via the web browser. This will, to the end user, be indistinguishable from an app from the app store, saves development time, and makes the app in the browser as powerful as the one installed on your phone. No need to pester the user into installing a bloody app! It also makes the app super cross-platform working on Linux phones (which I wish was more popular), Android, iOS, Windows, Mac, etc. with next to no extra development overhead.
