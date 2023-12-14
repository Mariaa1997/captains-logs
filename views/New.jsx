const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>New Fruit Page</h1>
        {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/logs" method="POST">
          Logs: <input type="text" name="title" />
          <br />
          Entry: <input type="textarea" name="entry" /> <br />
          Ship is Broken: <input type="checkbox" name="shipIsBroken" /> <br />
          <input type="submit" name="" value="submit" />
        </form>
      </div>
    );
  }
}

module.exports = New;