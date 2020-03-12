import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>bookish.tech</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="mw6 ph4-ns sans-serif center ph3 ph0-ns">
        <div className="flex justify-between items-end">
          <h1 className="f3 mt4 mb0">bookish.tech</h1>
          <a href="/help">help</a>
        </div>
        <form className="flex pv3" action="/search">
          <input
            name="id"
            type="text"
            className="f5 pa2 code flex-auto mr1 ba b--black-50 br2"
          />
          <select name="type" className="f5 ba b--black-50 mr1">
            <option value="isbn">ISBN</option>
            <option value="olid">OLID</option>
            <option value="oclc">OCLC</option>
            <option value="lccn">LCCN</option>
            <option value="goodreads">GoodReads</option>
          </select>
          <input
            className="ba b--black-50 bg-light-yellow br2"
            type="submit"
            value="Search"
          />
        </form>
      </div>
    </div>
  );
}
