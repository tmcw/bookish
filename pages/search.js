import React from "react";
import fetch from "isomorphic-unfetch";

export default class Search extends React.Component {
  static async getInitialProps({ query }) {
    const { id, type } = query;
    const host =
      process.env.NODE_ENV === "production"
        ? "https://api.bookish.tech"
        : "http://localhost:3111";
    const url = `${host}/search?type=${type}&id=${id}`;
    const res = await (await fetch(url)).json();
    console.log(res.results, res.permalinks);
    return {
      reqURL: url,
      results: res.results,
      messages: res.messages,
      permalinks: res.permalinks,
      id
    };
  }
  render() {
    const { reqURL, results, messages, permalinks, id } = this.props;
    return (
      <div>
        <head>
          <title>bookish.tech</title>
          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
          />
        </head>
        <div className="mw6 ph4-ns sans-serif center">
          <div className="flex justify-between items-end">
            <h1 className="f3 mt4 mb0">Booky</h1>
            <a href="/help">help</a>
          </div>

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
                {Object.entries(results).map(([key, value]) => (
                  <tr key={key} className="striped--moon-gray">
                    <td className="pv2 ph3">{key}</td>
                    <td className="pv2 ph3">{value.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="mt4">Frontmatter</h4>
            <pre>
              ---
              {Object.entries(results)
                .map(([key, value]) => `${key}: "${value[0]}"`)
                .join("\n")}
              ---
            </pre>
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
      </div>
    );
  }
}
