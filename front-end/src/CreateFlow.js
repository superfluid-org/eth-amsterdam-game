import React, { useState } from "react";
import { Button, Form, FormGroup, FormControl, Spinner, Toast, Row, Col } from "react-bootstrap";

import "./createFlow.css";

export const CreateFlow = () => {
//where the Superfluid logic takes place
async function createNewFlow(code, address) {

    console.log("Creating your stream...");
    const body = {code, address };
    const response = await fetch("https://cs3ssh7s6alf2z3kugcemh7ozi0rxfow.lambda-url.eu-west-2.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (response.status === 200 || response.status === 202) {
        console.log(`Congrats - you've just created a money stream!`);
        toggleShowSuccess();
        setTimeout(() => toggleShowSuccess(false), 1000);
    }
    else {
        console.log("Error, your stream was unable to be created. This is likely because you're using a code which is invalid or already used.");
        console.log(response)
        toggleShowFailure();
        setTimeout(() => toggleShowFailure(false), 1000);
    }
}

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [flowCode, setFlowCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const toggleShowSuccess = () => setShowSuccess(!showSuccess);
  const toggleShowFailure = () => setShowFailure(!showFailure);

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  const handleCodeChange = (e) => {
    setFlowCode(() => ([e.target.name] = e.target.value));
  };

  return (
    <div>
      <Row>
      <div className="title">
          <h2>GM, ETHAmsterdam! <span>🌞</span></h2>
        </div>
      </Row>
      <Row>
        <Col>
        <div className="successFailure">
        {
          showSuccess? 
          <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
            <Toast.Body>Your stream has been created! Check the Superfluid dashboard at  <a href="http://app.superfluid.finance">app.superfluid.finance</a></Toast.Body>
          </Toast>
          : ""
        }
        </div>
      <div className="successFailure">
        {
          showFailure?
          <Toast onClose={() => setShowFailure(false)} show={showFailure} delay={3000} autohide>
            <Toast.Body>Your stream failed to create - check the console!</Toast.Body>
          </Toast>
          : ""
        }
      </div>
      </Col>

      </Row>

      <div className="addressForm">
        <Form>
          <FormGroup className="mb-3">
            <FormControl
              name="recipient"
              value={recipient}
              onChange={handleRecipientChange}
              placeholder="Enter your Ethereum address"
            ></FormControl>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormControl
              name="flowRate"
              value={flowCode}
              onChange={handleCodeChange}
              placeholder="Enter your 6 digit code"
            ></FormControl>
          </FormGroup>
          <CreateButton
            onClick={() => {
              setIsButtonLoading(true);
              createNewFlow(flowCode, recipient);
              setTimeout(() => {
                setIsButtonLoading(false);
              }, 1000);
            }}
          >
            Click to Receive Your Superfluid Stream
          </CreateButton>
        </Form>
      </div>
      <div className="rules">
      <h3>What is the $FRENS Game?</h3>
      <p>
        One of our favourite things about in-person hackathons is the opportunity to make new friends!
      </p>
      <p>
        However, it can be intimidating to introduce yourself to strangers...
      </p>
      <p>
        That's why we decided to create the <b>$FRENS game</b>: a fun game to break the ice at hackathons, experience digital asset streaming firsthand, and win Superfluid swag <span>🌊</span>
      </p>
      <h3>How to Play</h3>
      <p>
        1) Enter your Ethereum address and your add your unique 6 digit code found on the Superfluid flyer in your swag pack to claim your Superfluid money stream and Kovan ETH (for gas fees). If you head to the <a href="http://app.superfluid.finance"> Superfluid dashboard</a>, you'll see that you're receiving a stream of $FRENS tokens on Kovan. NOTE: these are fake tokens - they're just for fun! <span>✅</span>
      </p>
      <p>

        2) Once you claim your stream, you’ll be able to head to the Superfluid
        Dashboard at <a href="http://app.superfluid.finance"> app.superfluid.finance</a> to
        see your incoming stream, and be able to send outgoing streams to other
        participants at ETHAmsterdam! <span>🥳</span>
      </p>
      <p>
        3) <b>
          Your goal is to send streams to as many other hackers at ETHAmsterdam
          as possible.
        </b> Each hacker at ETHAmsterdam received a special code which represents their participation
        in the game. Sending streams to non hackers will not help your score.
      </p>
      <p>4) <b>
          The Top 10 builders who send streams to the most other addresses at
          ETHAmsterdam will receive a Super Special™️ NFT and swag designed by
          the Superfluid team! <span>🎁</span>
        </b>
      </p>
      <p>
        5) If you have any questions, please come to the Superfluid booth or
        reach out in the #superfluid-support channel within the ETHGlobal
        discord server.
      </p>
      </div>
    </div>
  );
};
