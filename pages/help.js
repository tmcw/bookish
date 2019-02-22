import Head from "next/head";

export default function Help() {
  return (
    <div className="mw7 ph4 pv5 center sans-serif">
      <Head>
        <title>bookish.tech</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
        />
      </Head>
      <div className="lh-copy measure">
        <a href="/">Home</a>
        <p>
          Book identifiers are complicated. You might have an ISBN handy, but
          not an ISBN-13 - or one of many other identifers, like those specific
          to goodreads, WorldCat, Amazon, or some other organization.
        </p>
        <p>
          Bookish simply connects IDs to each other. Give it one kind of ID, it
          tries to find all the others.
        </p>
        <h3>Who made this and why?</h3>
        <p>
          Hello, that’s me, Tom MacWright. I'm an avid reader and I keep track
          of my reading habits on my website. I wanted to switch off of
          goodreads and was frustrated by its reliance on proprietary
          identifiers, and the lack of a universal converter. So I built one.
        </p>
        <p>The software is composed of two parts: a frontend and a backend.</p>
        <ul className="list">
          <li>
            <a href="https://github.com/tmcw/bookish">
              github.com/tmcw/bookish
            </a>
          </li>
          <li>
            <a href="https://github.com/tmcw/bookish-api">
              github.com/tmcw/bookish-api
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
