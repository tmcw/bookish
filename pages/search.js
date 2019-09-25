import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { safeDump } from "js-yaml";

export default class Search extends React.Component {
  static async getInitialProps({ query }) {
    const { id, type } = query;
    const host =
      process.env.NODE_ENV === "production"
        ? "https://api.bookish.tech"
        : "http://localhost:3111";
    const url = `${host}/search?type=${type}&id=${id}`;
    try {
      const res = await (await fetch(url)).json();
      if (!res) throw new Error();
      return {
        reqURL: url,
        results: res.results,
        messages: res.messages,
        permalinks: res.permalinks,
        id
      };
    } catch (e) {
      return { error: "Failed to request" };
    }
  }
  render() {
    const { reqURL, results, messages, permalinks, id, error } = this.props;
    if (error) {
      return (
        <div>
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
          <div className="mw6 ph4-ns sans-serif center ph3 ph0-ns">
            <div className="flex justify-between items-end">
              <h1 className="f3 mt4 mb0">Bookish</h1>
              <a href="/help">help</a>
            </div>
          </div>
          <div className="tc mt5 f4">
            Oh no. That request failed. The bookish.tech API (api.bookish.tech)
            is probably down.
          </div>
        </div>
      );
    }

    const yml = safeDump(
      Object.entries(results)
        .filter(([type, val]) => val.length)
        .reduce((memo, [type, val]) => {
          memo[type] = val[0];
          return memo;
        }, {})
    );

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
            <h1 className="f3 mt4 mb0">Bookish</h1>
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
          <div className="pv3">
            <div className="br2 pa2 bg-light-yellow flex justify-between">
              <span>Input: {id}</span>
            </div>
            <h3 className="mt4">Equivalents</h3>
            <table className="table w-100 collapse ba br2 b--black-10 pv2 ph3">
              <tbody>
                <tr className="striped--moon-gray">
                  <th className="pv2 ph3 tl f6 fw6 ttu">Code</th>
                  <th className="pv2 ph3 tl f6 fw6 ttu">Value</th>
                </tr>
                {Object.entries(results)
                  .filter(([key, value]) => value.length)
                  .map(([key, value]) => (
                    <tr key={key} className="striped--moon-gray">
                      <td className="pv2 ph3">{key}</td>
                      <td className="pv2 ph3">{value.join(", ")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h4 className="mt4">Frontmatter</h4>
            <pre>{`---\n${yml}---`}</pre>
            <h4 className="mt4">API Endpoint</h4>
            <p className="i">
              This is the URL of the backend API request used to create this
              page:
            </p>
            <ul className="list lh-copy pa0">
              <li>
                <a href={reqURL}>{reqURL}</a>
              </li>
            </ul>
            <h4 className="mt4">Permalinks</h4>
            <ul className="list lh-copy pa0">
              {permalinks.map((permalink, i) => (
                <li key={i}>
                  <a href={permalink}>{permalink}</a>
                </li>
              ))}
              {permalinks.length === 0 ? <li>No permalinks found</li> : null}
            </ul>

            <h4 className="mt4">Log</h4>
            <pre className="overflow-x-auto f7 lh-copy">
              {messages.join("\n")}
            </pre>
          </div>
        </div>
        <div className="tc sans-serif pb5">
          <a
            href="https://github.com/tmcw/bookish"
            className="blue hover-black"
          >
            This is open source: help make bookish better!
          </a>
        </div>
      </div>
    );
  }
}
