import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import scheduler from'@google-cloud/scheduler';

//const scheduler = require('@google-cloud/scheduler');

class App extends Component {

  state = {
    text: {
      recipient: '',
      textmessage: '',
      schedule:''
    }
  }

  async gcloud(){
  //G.cloud scheduler api code
   const projectId = "winter-campaign"
   const locationId = "us-central1" // see: https://cloud.google.com/about/locations/
   const url = "https://us-central1-winter-campaign-244020.cloudfunctions.net/sendText" // where should we say hello?
 
  // Create a client.
  let client = new scheduler.CloudSchedulerClient();
 
  // Construct the fully qualified location path.
//  const parent = client.locationPath(projectId, locationId);
 
  // Construct the request body.
  const job = {
    httpTarget: {
     uri: url,
     httpMethod: 'POST',
     body : { 
       to: this.state.text.recipient,      
       textmessage: this.state.text.textmessage,
    }
    },
    schedule: this.state.text.schedule,
    timeZone: 'America/Los_Angeles',
  };
 
  // const request = {
  //   parent: parent,
  //   job: job,
  // };

  // Use the client to send the job creation request.
 // const [response] = await client.createJob(request);
  // console.log(`Created job: ${response.name}`);

}
  sendText = _ => {
    const { text } = this.state;
  
    this.gcloud()
  }

  render() {
    const { text } = this.state;
    const spacer = {
      margin: 8
    }
    const textArea = {
      borderRadius: 4
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Gangplank</h1>
        </header>
        <div style={{ marginTop: 10 }} >
          <h2> Send Text Message </h2>
          <label> Your Phone Number </label>
          <br />
          <input value={text.recipient}
            onChange={e => this.setState({ text: { ...text, recipient: e.target.value } })} />
          <div style={spacer} />
          <label> Message </label>
          <br />
          <textarea rows={3} value={text.textmessage} style={textArea}
            onChange={e => this.setState({ text: { ...text, textmessage: e.target.value } })} />
          <div style={spacer} />
          <label> Scheduler </label>
          <br />
          <textarea rows={3} value={text.schedule} style={textArea}
            onChange={e => this.setState({ text: { ...text, schedule: e.target.value } })} />
          <div style={spacer} />



          <button onClick={this.sendText}> Send Text </button>
        </div>
      </div>
    );
  }
}

export default App;
