# Pokemon Test

A few general notes on the solution I’ve provided:

-	The tests I’ve written should be called against mocked data, not the live service!
-	There should be error handling at each step of the chain of requests in case a response should fail.
-	I’m not doing much in the way of validating the input. I don’t know if there are any Pokémon with spaces or numbers in their names and if so, the service should handle that gracefully.
-	The data we’re looking for only requires the `evolution_chain` ID so there may be a shortcut if we can first look up the name by species rather than the detail endpoint.

## Expanding the example

Being first and foremost an interface developer I would create a responsive user interface for the API which could display the chain in a way that would be easy to comprehend, especially with the ability to use other details from the API such as images of the Pokémon and associated interesting attributes. It would only need a single `input` to take in the pokemon name.

Coming off the back of a project and loving it, I would build the application using NextJS. That would handle both the user interface and the endpoint via ExpressJS.

## Testing

For the 'backend', the tests I've included are integration tests and don't test specific business logic. I would first create unit tests for the two functions `responseItem()`and `formatEvolutionChain()` that are responsible for format of the output that's required.

For the user interface, I could create unit tests for any components that feature business logic (which in this example possibly wouldn't be necessary) but would probably focus on functional testing using Cypress across a range of modern desktop and mobile browsers if possible.

I'm a massive advocate for accessibility in web interfaces and would test during development in the browser, manually using only keyboard controls, using browser plugins such as axe DevTools and with static analysis of the markup and with Pa11y in the CI pipeline.

If importing a third-party component such as the GOV.UK design system I would use a visual regression testing tool (I've used BackstopJS) to ensure that custom styling wasn't interfering with an imported component library.

## Deploying and releasing

A small service like this would be a good candidate for being hosted as a serverless function as there’s no state to persist between requests. The responses could also be cached at the CDN level as I presume the range of Pokémon doesn't change frequently. Using NextJS would allow the endpoint to be deployed in a serverless way, which I believe is straightforward when using Vercel for the application hosting.

A CI/CD pipeline would allow for tests to be run before being merged into the branch used for deployment, and for any merges into the deployment branch to be made available at the production location automatically.

## Managing the API

The API could be versioned by using a query parameter e.g. `pokemon/charmander?api=v1` or adding a URL segment `v1/pokemon/charmander`. API keys could be used to rate-limit and/or authenticate users/other applications as necessary.

## Non-functional requirements
Non-functional requirements for a service like this would cover areas such as:
- Establishing a performance baseline to monitor responsiveness as the API changes over time.
- Detailing how the service would scale to manage increased demand or cost-effectiveness during expected dormant periods.
- Ensure that code matched a house style if appropriate (my preference would be to enforce Prettier in the CI pipeline).