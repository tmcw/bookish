# bookish

Bookish is a semi-universal book identifier translator. It does this by paging out to multiple APIs, and sites that don't quite support APIs. I use it to power my [reading log](https://macwright.org/reading) - I get the ISBN from the inside cover or somewhere else, and then use bookish's YAML output to copy into my Jekyll site.

This uses [Zeit](https://zeit.co/) to deploy. The [backend](https://github.com/tmcw/bookish-api) is built with micro, and this repo - the frontend - uses Next.js, a layer on top of React.
