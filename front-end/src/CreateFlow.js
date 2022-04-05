import React, { useState } from "react";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";

import "./createFlow.css";

//where the Superfluid logic takes place
async function createNewFlow(code, address) {

    console.log("Creating your stream...");
    const body = {code, address };
    const response = await fetch("http://localhost:5000/create-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (response.status == 200) {
        console.log(`Congrats - you've just created a money stream!`);
    }
    else {
        console.log("Error, your stream was unable to be created. This is likely because you're using a code which is invalid or already used.")
    }
}

export const CreateFlow = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [flowCode, setFlowCode] = useState("");

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
      <h2>GM</h2>
      <p>
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
      </p>
      <p>
        1) Enter your Ethereum address and your unique code to claim a
        Superfluid money stream and Kovan ETH (for gas fees). If you head to the dashboard, you'll see that you're receiving a stream of $FRENS tokens on Kovan. NOTE: these are fake tokens - they're just for fun!
      </p>
      <p>

        2) Once you claim your stream, you’ll be able to head to the Superfluid
        Dashboard at
        <a href="http://app.superfluid.finance"> app.superfluid.finance</a> to
        see your incoming stream, and be able to send outgoing streams to other
        participants at ETH Amsterdam!
      </p>
      <p>
        3)
        <b>
          Your goal is to send streams to as many other hackers at ETH Amsterdam
          as possible.
        </b>
        Each hacker received a special code which represents their participation
        in the game. Sending streams to non hackers will not help your score.
      </p>
      <p>
        4)
        <b>
          The Top 10 builders who send streams to the most other addresses at
          ETH Amsterdam will receive a Super Special™️ NFT and swag designed by
          the Superfluid team!
        </b>
      </p>
      <p>
        5) If you have any questions, please come to the Superfluid booth or
        reach out in the #superfluid-support channel within the ETHGlobal
        discord server.
      </p>
    </div>
  );
};
