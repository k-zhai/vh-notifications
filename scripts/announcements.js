import * as React from "react";
import * as ReactDOM from "react-dom";
import Timeago from "react-timeago";

const HOST = window.location.origin.replace(/^https/, 'wss');
const ws = new WebSocket(HOST);
const container = document.getElementById('announcements-col');
console.log('Loading announcements');

class Announcements extends React.Component {
  render() {
    console.log('Loading announcements');
    const elements = this.props.messages.map(({time, msg}, index) => {
      const date = new Date(time);
      return (
        <div class="card">
          <li key={index} className="message">
            <span><Timeago date={this.props.time} /></span>
            <span>{msg}</span>
          </li>
        </div>
      );
    })
    elements.reverse();
    return <>{elements}</>;
  }
}

ws.onmessage = event => {
  console.log(`event.data=${event.data}`);
  if (event.data === 'reload') {
    console.log('Message sent, reload page');
    window.location.reload();
  } else {
    const messages = JSON.parse(event.data);
    ReactDOM.render(<Announcements messages={messages}/>, container);
  }
};
